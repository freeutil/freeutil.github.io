const assert = require('node:assert/strict');
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({channel:'chrome',headless:true});
  try {
    for(const lang of ['ko','en','ja','zh']){
      const context=await browser.newContext({viewport:{width:390,height:844}});
      await context.route('**/*',route=>route.request().url().startsWith('http://127.0.0.1:8792/')?route.continue():route.abort());
      const page=await context.newPage(),errors=[];
      page.on('pageerror',error=>errors.push(error.message));
      await page.goto(`http://127.0.0.1:8792/calorieGuide/?lang=${lang}`,{waitUntil:'domcontentloaded'});
      const result=await page.evaluate(()=>{
        const input=document.querySelector('#foodSearch'),suggestions=document.querySelector('#foodSuggestions');
        const search=value=>{input.value=value;input.dispatchEvent(new Event('input'));return [...suggestions.querySelectorAll('button')].map(b=>Number(b.dataset.index))};
        const missing=foods.flatMap((food,index)=>search(food[0]).includes(index)?[]:[food[0]]);
        const aliases=[['후무스','houmous','חומוס','HUMMUS'],['크렘브륄레','크림브륄레','Crème brûlée','creme brulee'],['오코노미야키','오코노미야끼','okonomi yaki','お好み焼'],['소고기쌀국수','pho bo','phở bò'],['되네르케밥','doner kebab','döner'],['팔락파니르','पालक पनीर','spinach paneer']];
        const aliasFailures=[];
        aliases.forEach(([ko,...terms])=>{const display=foodLang==='ko'?ko:window.FreeUtilFoods[ko][{en:0,ja:1,zh:2}[foodLang]],index=foods.findIndex(food=>food[0]===display);terms.forEach(term=>{if(!search(term).includes(index))aliasFailures.push(term)})});
        const countryFailures=['태국','भारत','India','メキシコ','墨西哥','Ελλάδα','Greek','越南'].filter(term=>!search(term).length);
        search('hummus');const hummus=foods[Number(suggestions.querySelector('button').dataset.index)];suggestions.querySelector('button').click();document.querySelector('#foodPortion').value='0.5';document.querySelector('#addFoodButton').click();
        const total=Number(document.querySelector('#eatenCalories').textContent.replace(/[^\d]/g,''));
        const nativeExact='houmous';input.value=nativeExact;input.dispatchEvent(new Event('input'));document.querySelector('#addFoodButton').click();
        const secondTotal=Number(document.querySelector('#eatenCalories').textContent.replace(/[^\d]/g,''));
        const sameName='いなり寿司';search(sameName);const before=document.querySelectorAll('.food-item').length;document.querySelector('#addFoodButton').click();const ambiguousAdded=document.querySelectorAll('.food-item').length>before;
        return {size:foods.length,missing,aliasFailures,countryFailures,total,expected:Math.round(hummus[2]*.5),secondTotal,expectedSecond:Math.round(hummus[2]*1.5),ambiguousAdded,overflow:document.documentElement.scrollWidth>innerWidth};
      });
      assert.equal(result.size,723);assert.deepEqual(result.missing,[]);assert.deepEqual(result.aliasFailures,[]);assert.deepEqual(result.countryFailures,[]);assert.equal(result.total,result.expected);assert.equal(result.secondTotal,result.expectedSecond);assert.equal(result.ambiguousAdded,false);assert.equal(result.overflow,false);assert.deepEqual(errors,[]);
      console.log(JSON.stringify({lang,...result}));await context.close();
    }
  } finally {await browser.close()}
})();
