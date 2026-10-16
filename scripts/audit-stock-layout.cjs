const assert = require('node:assert/strict');
const { chromium } = require('playwright');

(async () => {
  const base = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:8792';
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    for (const width of [320, 390, 480, 481, 520, 768, 1280]) {
      for (const lang of ['ko', 'en', 'ja', 'zh']) {
        const page = await browser.newPage({ viewport: { width, height: 900 } });
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.goto(`${base}/stockAverage/?lang=${lang}`, { waitUntil: 'domcontentloaded' });
        await page.evaluate(() => document.fonts.ready);
        for (const mode of ['average', 'target']) {
          await page.locator(`#${mode}Mode`).click();
          const values = mode === 'average'
            ? { currentAverage: '50000', currentShares: '1000000', buyPrice: '35000', buyShares: '1000000', marketPrice: '40000' }
            : { targetCurrentAverage: '50000', targetCurrentShares: '1000000', targetAverage: '42500', targetBuyPrice: '35000' };
          for (const [id, value] of Object.entries(values)) await page.locator(`#${id}`).fill(value);
          await page.locator(`#${mode}Button`).click();
          assert.equal(await page.locator('#error').textContent(), '');
          const issues = await page.evaluate(() => {
            const issues = [];
            const visible = selector => [...document.querySelectorAll(selector)].filter(n => n.checkVisibility());
            if (document.documentElement.scrollWidth > innerWidth) issues.push('page overflow');
            for (const node of visible('.input-wrap,.mode,.result-card')) {
              if (node.scrollWidth > node.clientWidth + 1) issues.push(`overflow: ${node.innerText}`);
            }
            const fields = visible('.field-grid label').map(label => {
              const input = label.querySelector('.input-wrap').getBoundingClientRect();
              const unit = label.querySelector('em');
              const range = document.createRange();
              range.selectNodeContents(unit);
              if (range.getClientRects().length !== 1) issues.push(`wrapped unit: ${unit.textContent}`);
              if (Math.abs(input.height - 44) > 1) issues.push('input height changed');
              const unitBox = unit.getBoundingClientRect();
              if (unitBox.right > input.right || unitBox.left < input.left) issues.push('unit outside input');
              return { top: label.getBoundingClientRect().top, inputTop: input.top };
            });
            for (const a of fields) for (const b of fields) {
              if (Math.abs(a.top - b.top) < 1 && Math.abs(a.inputTop - b.inputTop) > 1) issues.push('misaligned input row');
            }
            return issues;
          });
          assert.deepEqual(issues, [], `${width}px ${lang} ${mode}`);
          const result = await page.locator(mode === 'average' ? '#newAverage' : '#actualAverage').textContent();
          assert.match(result, /42[,.\s]?500/);
        }
        assert.deepEqual(errors, []);
        if (width === 390 && lang === 'en') await page.screenshot({ path: '/tmp/stock-layout-mobile.png', fullPage: true });
        console.log(`${width}px ${lang}: both modes passed`);
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
