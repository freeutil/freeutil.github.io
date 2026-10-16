const fs = require('node:fs');
const http = require('node:http');
const nodePath = require('node:path');
const { chromium } = require('playwright');

(async () => {
  const root = process.cwd();
  const server = http.createServer((req, res) => {
    let file = nodePath.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
    if (!file.startsWith(root + nodePath.sep) && file !== root) { res.writeHead(403); res.end(); return; }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = nodePath.join(file, 'index.html');
    fs.readFile(file, (error, data) => {
      if (error) { res.writeHead(404); res.end(); return; }
      res.setHeader('Content-Type', ({ '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' })[nodePath.extname(file)] || 'application/octet-stream');
      res.end(data);
    });
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = process.env.AUDIT_BASE_URL || `http://127.0.0.1:${server.address().port}`;
  const paths = process.env.AUDIT_PATHS?.split(',') || fs.readdirSync('.').filter(d => fs.existsSync(`${d}/index.html`));
  const widths = (process.env.AUDIT_WIDTHS || '320,390').split(',').map(Number);
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const failures = [];
  try {
    for (const width of widths) {
      for (const path of paths) {
        await Promise.all(['ko', 'en', 'ja', 'zh'].map(async lang => {
          const page = await browser.newPage({ viewport: { width, height: 900 } });
          const loadErrors = [];
          page.on('pageerror', error => loadErrors.push(error.message));
          page.on('requestfailed', request => { if (request.url().startsWith(base)) loadErrors.push(request.url()); });
          await page.route('**/*', route => {
            const url = route.request().url();
            const font = process.env.AUDIT_WEB_FONTS === '1' && /^https:\/\/fonts\.(googleapis|gstatic)\.com\//.test(url);
            return url.startsWith(base) || font ? route.continue() : route.abort();
          });
          await page.goto(`${base}/${path}/?lang=${lang}`, { waitUntil: 'domcontentloaded' });
          await page.waitForTimeout(200);
          await page.evaluate(() => document.fonts.ready);
          const inspect = () => page.evaluate(() => {
            const issues = [];
            if (document.documentElement.scrollWidth > innerWidth + 1) issues.push({ kind: 'page overflow' });
            for (const el of document.querySelectorAll('button,select,.input-wrap,.mode-switch label')) {
              if (!el.checkVisibility() || !el.clientWidth) continue;
              const r = el.getBoundingClientRect();
              const shell = el.closest('.controller-shell');
              if (shell) {
                const bounds = shell.getBoundingClientRect();
                if (r.left < bounds.left || r.right > bounds.right || r.top < bounds.top || r.bottom > bounds.bottom) issues.push({ kind: 'clipped controller button', text: el.textContent });
              }
              if (el.scrollWidth > el.clientWidth + 2 || el.scrollHeight > el.clientHeight + 2) {
                issues.push({ kind: 'control overflow', selector: el.id || el.className, text: el.textContent.trim().slice(0, 65), size: [r.width, r.height] });
                continue;
              }
              if (el.tagName === 'SELECT') {
                const style = getComputedStyle(el), context = document.createElement('canvas').getContext('2d');
                context.font = style.font;
                const text = el.selectedOptions[0]?.textContent.trim() || '';
                if (context.measureText(text).width > el.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight) + 1) issues.push({ kind: 'clipped select text', selector: el.id, text });
                continue;
              }
              const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
              let node;
              while ((node = walker.nextNode())) {
                if (!node.textContent.trim() || !node.parentElement.checkVisibility()) continue;
                if (parseFloat(getComputedStyle(node.parentElement).fontSize) === 0) continue;
                const range = document.createRange(); range.selectNodeContents(node);
                if ([...range.getClientRects()].some(b => b.left < r.left - 1 || b.right > r.right + 1 || b.top < r.top - 1 || b.bottom > r.bottom + 1)) {
                  issues.push({ kind: 'text outside control', selector: el.id || el.className, text: el.textContent.trim().slice(0, 65), size: [r.width, r.height] });
                  break;
                }
              }
            }
            for (const grid of document.querySelectorAll('.field-grid')) {
              const fields = [...grid.querySelectorAll(':scope > label')].filter(n => n.checkVisibility()).map(label => ({ label: label.getBoundingClientRect(), control: label.querySelector('.input-wrap,input,select')?.getBoundingClientRect() }));
              for (let i = 0; i < fields.length; i++) for (let j = i + 1; j < fields.length; j++) {
                const a = fields[i], b = fields[j];
                if (a.control && b.control && Math.abs(a.label.top - b.label.top) < 1 && Math.abs(a.control.top - b.control.top) > 2) issues.push({ kind: 'misaligned input row' });
              }
            }
            return issues;
          });
          const issues = await inspect();
          if (['memeAge', 'imageCrop'].includes(path)) {
            const data = await page.evaluate(() => { const c = document.createElement('canvas'); c.width = 64; c.height = 48; return c.toDataURL().split(',')[1]; });
            await page.locator('#fileInput').setInputFiles({ name: 'test.png', mimeType: 'image/png', buffer: Buffer.from(data, 'base64') });
            await page.waitForTimeout(300);
          }
          if (path === 'stockAverage') await page.locator('#targetMode').click();
          if (path === 'calculator') await page.locator('#scientificMode').click();
          if (path === 'calorieGuide') {
            await page.locator('#foodSearch').fill('pizza');
            await page.locator('#foodSuggestions button').first().click();
            await page.locator('#addFoodButton').click();
          }
          if (path === 'jsonParser') await page.locator('#exampleButton').click();
          if (path === 'keyboardTester') await page.locator('#osSelect').selectOption('mac');
          if (path === 'gamepadTester') {
            for (const layout of ['playstation', 'switch']) {
              await page.locator(`.layout-button[data-layout=${layout}]`).click();
              issues.push(...(await inspect()).map(issue => ({ ...issue, state: layout })));
            }
          }
          issues.push(...(await inspect()).map(issue => ({ ...issue, state: 'after interaction' })));
          issues.push(...loadErrors.map(text => ({ kind: 'load error', text })));
          if (issues.length) failures.push({ path, width, lang, issues });
          await page.close();
        }));
      }
    }
    console.log(JSON.stringify(failures, null, 2));
    console.log(`Checked ${paths.length * widths.length * 4} page/width/language combinations; failures: ${failures.length}`);
    if (failures.length) process.exitCode = 1;
  } finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
})().catch(error => { console.error(error); process.exitCode = 1; });
