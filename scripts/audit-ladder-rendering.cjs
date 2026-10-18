const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('playwright');

(async () => {
  const root = process.cwd(), browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    for (const [width, dpr] of [[320, 3], [360, 3], [390, 2], [1280, 1]]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: dpr });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.route('**/*', async route => {
        const url = new URL(route.request().url());
        if (url.hostname !== 'freeutil.test') return route.abort();
        let file = path.resolve(root, '.' + url.pathname);
        if (!file.startsWith(root + path.sep)) return route.abort();
        if (url.pathname.endsWith('/')) file = path.join(file, 'index.html');
        const contentType = ({ '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' })[path.extname(file)];
        await route.fulfill({ body: await fs.readFile(file), contentType });
      });
      await page.addInitScript(() => {
        window.testFrames = [];
        window.requestAnimationFrame = callback => { window.testFrames.push(callback); return window.testFrames.length; };
      });
      await page.goto('http://freeutil.test/ladderGame/?lang=en');
      const sizes = await page.evaluate(() => [4, 6, 8, 12].map(count => {
        players = count; ladderBoard.hidden = false; numberPreview.hidden = false; renderNumbers(); renderLabels(true);
        drawLadder();
        const stage = document.querySelector('.ladder-stage').getBoundingClientRect(), canvas = document.querySelector('.ladder-canvas-wrap').getBoundingClientRect(), matrix = ladderSvg.getScreenCTM();
        return { count, width: stage.width, height: canvas.height, preview: numberPreview.getBoundingClientRect().width, scaleX: matrix.a, scaleY: matrix.d, stable: !syncLadderCoordinates() };
      }));
      if (width === 1280) {
        assert.equal(sizes[0].width, 420); assert.equal(sizes[1].width, 420);
        assert.equal(sizes[2].width, 560); assert.equal(sizes[3].width, 840);
        sizes.forEach(size => { assert.equal(size.height, 360); assert.ok(Math.abs(size.preview - size.width) < 1); });
      } else sizes.forEach(size => assert.equal(size.height, 300));
      sizes.forEach(size => { assert.ok(Math.abs(size.scaleX - size.scaleY) < .001); assert.equal(size.stable, true); });
      assert.ok(Math.abs(sizes[0].scaleX - sizes[3].scaleX) < .001, 'Adding players must not stretch graphics');
      if (width === 1280) {
        await page.evaluate(() => { playerCount.value = players; numberPreview.hidden = true; });
        await page.screenshot({ path: '/tmp/ladder-desktop-spacing.png', fullPage: true });
      }
      const geometry = await page.evaluate(() => {
        let samples = 0, maximumError = 0;
        for (let count = 2; count <= 12; count++) {
          players = count;
          for (let trial = 0; trial < 6; trial++) {
            makeRungs();
            const route = buildOrthogonalPath(trial % players), geometry = createProgressGeometry(route.vertices);
            const reference = element('path', { d: route.d }); ladderSvg.append(reference);
            for (let step = 0; step <= 40; step++) {
              const ratio = step / 40, current = progressGeometryAt(geometry, geometry.length * ratio);
              const expected = reference.getPointAtLength(reference.getTotalLength() * ratio);
              maximumError = Math.max(maximumError, Math.hypot(expected.x - current.point.x, expected.y - current.point.y));
              samples++;
            }
            reference.remove();
          }
        }
        return { samples, maximumError };
      });
      assert.ok(geometry.maximumError < .02, JSON.stringify(geometry));
      for (const hz of [60, 120]) {
        const result = await page.evaluate(hz => {
          players = 6; makeRungs(); targetBottom = 2;
          ladderBoard.hidden = false; numberPreview.hidden = true; renderLabels(true); drawLadder();
          testFrames.length = 0;
          let calls = 0, winner = null;
          const expectedWinner = buildOrthogonalPath(targetBottom).winner;
          animatePath(targetBottom, value => { calls++; winner = value; });
          const layers = [...document.querySelectorAll('.ladder-progress path')];
          let coherent = true, earlyFinish = false;
          for (let frame = 0; frame <= hz * 8; frame++) {
            const next = testFrames.shift();
            if (!next) { earlyFinish = true; break; }
            next(frame * 1000 / hz);
            coherent &&= layers.every(layer => layer.getAttribute('d') === layers[0].getAttribute('d'));
            if (frame < hz * 8 && calls) earlyFinish = true;
          }
          return {
            calls, winner, expectedWinner, coherent, earlyFinish,
            filters: layers.map(layer => getComputedStyle(layer).filter),
            dashes: layers.map(layer => getComputedStyle(layer).strokeDasharray),
            end: layers[0].getAttribute('d'),
            bombRemoved: !document.querySelector('.fuse-bomb'),
            color: getComputedStyle(document.querySelector('.ladder-progress')).color
          };
        }, hz);
        assert.equal(result.calls, 1); assert.equal(result.winner, result.expectedWinner);
        assert.equal(result.coherent, true); assert.equal(result.earlyFinish, false);
        assert.ok(result.filters.every(value => value === 'none'));
        assert.ok(result.dashes.every(value => value === 'none'));
        assert.equal(result.bombRemoved, true);
        assert.equal(result.color, 'rgb(233, 87, 87)');
      }
      await page.evaluate(() => {
        drawLadder(); testFrames.length = 0; animatePath(2, () => {});
        testFrames.shift()(0); testFrames.shift()(5000);
      });
      if (width === 360) await page.screenshot({ path: '/tmp/ladder-compatible-mobile.png', fullPage: true });
      if (width === 320 || width === 1280) {
        for (const lang of ['ko', 'en', 'ja', 'zh']) {
          await page.goto(`http://freeutil.test/ladderGame/?lang=${lang}`);
          assert.equal(await page.locator('#useNames').isChecked(), false);
          await page.locator('#useNames').check();
          const names = ['<img src=x>', '', '독박', '아주긴참가자이름입니다모바일에서도확인'];
          for (let index = 0; index < names.length; index++) await page.locator(`#nameInputs input[data-index="${index}"]`).fill(names[index]);
          await page.locator('#playerCount').fill('2');
          assert.equal(await page.locator('#nameInputs input').count(), 2);
          await page.locator('#playerCount').fill('4');
          assert.equal(await page.locator('#nameInputs input[data-index="2"]').inputValue(), '독박');
          await page.evaluate(() => { runCountdown = callback => callback(); });
          await page.locator('#startButton').click();
          assert.equal(await page.locator('#nameSettings').isVisible(), false);
          const outcome = await page.evaluate(() => {
            testFrames.shift()(0); // Start the countdown/animation.
            const expected = buildOrthogonalPath(targetBottom).winner;
            const entries = [...topLabels.children];
            const centerError = Math.max(...entries.map((entry, index) => {
              const circle = entry.querySelector('.participant').getBoundingClientRect(), stage = ladderSvg.getBoundingClientRect();
              return Math.abs(circle.x + circle.width / 2 - stage.x - stage.width * (index + .5) / players);
            }));
            testFrames.shift()(0); testFrames.shift()(8000);
            return { expected: participantName(expected), actual: winnerNumber.textContent, centerError, captions: entries.map(n => n.querySelector('.participant-name')?.textContent || ''), injected: topLabels.querySelectorAll('img').length, overflow: document.documentElement.scrollWidth > innerWidth, selected: topLabels.querySelectorAll('.winner-participant').length };
          });
          await page.waitForTimeout(20); // Let translation mutation observers run.
          assert.equal(await page.locator('#winnerNumber').textContent(), outcome.expected);
          assert.equal(outcome.actual, outcome.expected); assert.ok(outcome.centerError < 1);
          assert.deepEqual(outcome.captions, [names[0], '', names[2], names[3]]);
          assert.equal(outcome.injected, 0); assert.equal(outcome.overflow, false); assert.equal(outcome.selected, 1);
          assert.equal(await page.locator('#nameSettings').isVisible(), true);
          await page.locator('#useNames').uncheck();
          assert.equal(await page.locator('#nameInputs').isVisible(), false);
          assert.equal(await page.evaluate(() => participantName(2)), '3');
          if (width === 320 && lang === 'ko') await page.screenshot({ path: '/tmp/ladder-names-mobile.png', fullPage: true });
        }
      }
      assert.deepEqual(errors, []);
      console.log(`${width}px DPR ${dpr}: ${geometry.samples} geometry samples, 60/120 Hz timing and layered rendering passed`);
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
