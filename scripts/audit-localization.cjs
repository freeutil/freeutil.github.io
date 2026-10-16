const { chromium } = require('playwright');
const fs = require('fs');
const tools=fs.readdirSync('.').filter(d => fs.existsSync(`${d}/index.html`));
const pages = ['index.html', 'about.html', 'privacy.html', 'contact.html', ...tools.flatMap(d => [`${d}/`,`${d}/index.html`])];
(async () => {
  const browser = await chromium.launch({channel:'chrome', headless:true});
  let failed=0,checked=0;const shapes=new Map();
  for (const lang of ['ko','en','ja','zh','fr']) {
    const context = await browser.newContext();
    await context.route('**/*', route => route.request().url().startsWith('http://127.0.0.1:8792/') ? route.continue() : route.abort());
    for (const path of pages) {
      const page = await context.newPage(), errors=[];
      await page.addInitScript(()=>Object.defineProperty(navigator,'clipboard',{value:{writeText:async value=>{window.auditCopied=value}}}));
      page.on('pageerror', e => errors.push(e.message));
      page.on('console', m => {if(m.type()==='error'&&m.text().startsWith('Missing reading'))errors.push(m.text())});
      await page.goto(`http://127.0.0.1:8792/${path}?lang=${lang}`, {waitUntil:'domcontentloaded'});
      await page.waitForTimeout(60);
      if(path.endsWith('/')&&lang!=='ko'&&lang!=='fr'){
        await page.evaluate(async () => {
          const click=selector=>document.querySelector(selector)?.click();
          if(location.pathname.includes('/lottoNumGen/')){document.querySelector('#setCount').value='5';click('#generateButton');click('#generateButton')}
          if(location.pathname.includes('/textCount/')){const input=document.querySelector('#textInput');input.value='Hello 👋';input.dispatchEvent(new Event('input'));click('#clearButton')}
          if(location.pathname.includes('/calculator/')){click('#scientificMode')}
          if(location.pathname.includes('/stockAverage/')){click('#targetMode');click('#targetButton')}
          if(/\/(macShortcuts|windowsShortcuts|vimShortcuts)\//.test(location.pathname)){click('.category[data-category="basic"],.category[data-category="motion"]');document.querySelector('.category[data-category="all"]').click();click('.copy-button');await Promise.resolve();if(/[가-힣]/.test(window.auditCopied||''))throw Error('Copied shortcut is still Korean')}
          if(location.pathname.includes('/calorieGuide/')){const input=document.querySelector('#foodSearch');input.value='';input.dispatchEvent(new Event('input'));document.querySelector('.food-suggestion')?.click();document.querySelector('#foodPortion').value='0.5';click('#addFoodButton');input.value='';input.dispatchEvent(new Event('input'))}
          if(location.pathname.includes('/ladderGame/')){const count=document.querySelector('#playerCount');count.value='5';count.dispatchEvent(new Event('input'));click('#startButton')}
        });
        await page.waitForTimeout(50);
        if(path==='ladderGame/'&&lang==='en')await page.locator('#winnerPanel').waitFor({state:'visible',timeout:15000});
      }
      const result=await page.evaluate(() => {
        const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),korean=[];
        while(walker.nextNode()) {const n=walker.currentNode,p=n.parentElement;if(p.closest('script,style,textarea,.utility-language-picker,.language-picker'))continue;if(/[가-힣]/.test(n.textContent))korean.push(n.textContent.trim().slice(0,160))}
        document.querySelectorAll('[aria-label],[title],[placeholder]').forEach(el=>{for(const attr of ['aria-label','title','placeholder']){const v=el.getAttribute(attr);if(v&&/[가-힣]/.test(v))korean.push(attr+': '+v)}});
        const shape=[...document.querySelectorAll('.info-content,.fun-facts,.related-info')].map(el=>[el.tagName,el.querySelectorAll('p').length,el.querySelectorAll('li').length]);
        const mismatches=[];const lang=document.documentElement.lang,parts=location.pathname.split('/').filter(Boolean),tool=parts.at(-1)==='index.html'?parts.at(-2):parts.at(-1),entries=window.FreeUtilReading?.[tool];
        if(lang!=='ko')document.querySelectorAll('[data-reading-key]').forEach(el=>{const key=Number(el.dataset.readingKey),expected=Array.isArray(entries)?entries[key]?.[{en:0,ja:1,zh:2}[lang]]:entries?.[lang]?.[key],template=document.createElement('template');template.innerHTML=expected||'';if(el.textContent!==template.content.textContent)mismatches.push(key)});
        return {language:lang,reading:document.querySelectorAll('[data-reading-key]').length,shape,korean:[...new Set(korean)],mismatches};
      });
      if(lang==='ko')shapes.set(path,JSON.stringify(result.shape));
      else if(shapes.get(path)!==JSON.stringify(result.shape))errors.push('Reading structure differs from Korean');
      const expected=lang==='fr'?'en':lang;
      if(result.language!==expected)errors.push('Wrong document language: '+result.language);
      if(lang!=='ko'&&result.korean.length)errors.push('Untranslated Korean');
      if(result.mismatches.length)errors.push('Translation overwritten after rendering');
      checked++;if(errors.length){failed++;console.log(JSON.stringify({lang,path,...result,errors}));}
      await page.close();
    }
    await context.close();
  }
  const navigation=await browser.newContext();
  await navigation.route('**/*',route=>route.request().url().startsWith('http://127.0.0.1:8792/')?route.continue():route.abort());
  const page=await navigation.newPage();
  await page.goto('http://127.0.0.1:8792/?lang=en');
  await page.selectOption('#languageSelect','ja');await page.waitForURL('**/?lang=ja');
  await page.locator('.tool-card').first().click();await page.waitForLoadState('domcontentloaded');
  if(await page.locator('html').getAttribute('lang')!=='ja')throw Error('Root language not passed to tool');
  await page.selectOption('.utility-language-picker select','zh');await page.waitForURL('**/*lang=zh');
  await page.locator('.brand').click();await page.waitForLoadState('domcontentloaded');
  if(await page.locator('html').getAttribute('lang')!=='zh')throw Error('Tool language not passed back to root');
  await navigation.close();
  await browser.close();
  console.log(JSON.stringify({checked,failed}));process.exitCode=failed?1:0;
})();
