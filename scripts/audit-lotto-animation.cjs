const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    for (const width of [320, 390, 1280]) for (const lang of ['ko', 'en', 'ja', 'zh']) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.route('**/*', async route => {
        const url = new URL(route.request().url());
        if (url.hostname !== 'freeutil.test') return route.abort();
        let file = path.resolve(process.cwd(), '.' + url.pathname);
        if (!file.startsWith(process.cwd() + path.sep)) return route.abort();
        if (url.pathname.endsWith('/')) file = path.join(file, 'index.html');
        await route.fulfill({ body: await fs.readFile(file), contentType: ({ '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' })[path.extname(file)] });
      });
      await page.addInitScript(() => {
        let id = 0;
        const frames = new Map();
        window.requestAnimationFrame = callback => { frames.set(++id, callback); return id; };
        window.cancelAnimationFrame = id => frames.delete(id);
        window.advanceDraw = time => { const callbacks = [...frames.values()]; frames.clear(); callbacks.forEach(callback => callback(time)); };
        Object.defineProperty(navigator, 'clipboard', { value: { writeText: async text => { window.copiedNumbers = text; } } });
      });
      await page.goto(`https://freeutil.test/lottoNumGen/?lang=${lang}`);
      await page.locator('#generateButton').click();
      assert.equal(await page.locator('.copy-button:disabled').count(), 1);
      await page.evaluate(() => { advanceDraw(0); advanceDraw(600); });
      assert.ok(await page.locator('.is-revealed').count() > 0);
      assert.ok(await page.locator('.is-rolling').count() > 0);
      assert.equal(await page.locator('.is-rolling').evaluateAll(nodes => nodes.every(ball => {
        const number = Number(ball.textContent), color = number <= 10 ? 'yellow' : number <= 20 ? 'blue' : number <= 30 ? 'red' : number <= 40 ? 'gray' : 'green';
        return ball.classList.contains(color);
      })), true);
      if (width === 390 && lang === 'ko') await page.screenshot({ path: '/tmp/lotto-draw-mobile.png', fullPage: true });
      await page.locator('#generateButton').click(); // Cancel a partially completed draw.
      await page.locator('#setCount').selectOption('5'); // Cancel again and create five rows.
      await page.evaluate(() => { advanceDraw(1000); advanceDraw(2200); });
      assert.equal(await page.locator('.number-set').count(), 5);
      assert.equal(await page.locator('.copy-button:not(:disabled)').count(), 1);
      await page.evaluate(() => advanceDraw(4000));
      assert.equal(await page.locator('#numberSets').getAttribute('aria-busy'), 'false');
      assert.equal(await page.locator('.is-revealed').count(), 30);
      assert.equal(await page.locator('.is-rolling,.is-waiting').count(), 0);
      const rows = await page.locator('.number-set').evaluateAll(nodes => nodes.map(row => [...row.querySelectorAll('.ball')].map(ball => ({ number: Number(ball.textContent), color: ['yellow', 'blue', 'red', 'gray', 'green'].find(color => ball.classList.contains(color)) }))));
      for (const row of rows) {
        const numbers = row.map(ball => ball.number);
        assert.equal(new Set(numbers).size, 6);
        assert.deepEqual(numbers, [...numbers].sort((a, b) => a - b));
        row.forEach(ball => { assert.ok(ball.number >= 1 && ball.number <= 45); assert.equal(ball.color, ball.number <= 10 ? 'yellow' : ball.number <= 20 ? 'blue' : ball.number <= 30 ? 'red' : ball.number <= 40 ? 'gray' : 'green'); });
      }
      await page.locator('.copy-button').first().click();
      assert.equal(await page.evaluate(() => copiedNumbers), rows[0].map(ball => ball.number).join(', '));
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.locator('#setCount').selectOption('1');
      assert.equal(await page.locator('.is-revealed').count(), 6);
      assert.equal(await page.locator('#numberSets').getAttribute('aria-busy'), 'false');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      assert.deepEqual(errors, []);
      console.log(`${width}px ${lang}: stagger, replay/cancellation, 1–5 rows, copy, reduced motion passed`);
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
