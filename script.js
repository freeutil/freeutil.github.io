const adsenseScript=document.createElement('script');adsenseScript.async=true;adsenseScript.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4401870717103583';adsenseScript.crossOrigin='anonymous';document.head.append(adsenseScript);
const lang=(navigator.language||'en').toLowerCase();
const ko=lang.startsWith('ko'),ja=lang.startsWith('ja'),zh=lang.startsWith('zh');
const copy=ko?{lotto:'로또 번호 생성기',json:'JSON 파서',meme:'Meme Age'}:ja?{lotto:'ロト番号ジェネレーター',json:'JSON パーサー',meme:'Meme Age'}:zh?{lotto:'乐透号码生成器',json:'JSON 解析器',meme:'Meme Age'}:{lotto:'Lotto Number Generator',json:'JSON Parser',meme:'Meme Age'};
document.documentElement.lang=ko?'ko':ja?'ja':zh?'zh':'en';
if(location.protocol==='file:')document.querySelectorAll('.tool-card,.brand').forEach(link=>link.href+=link.href.endsWith('/')?'index.html':'/index.html');
for(const [id,value] of Object.entries({lottoTitle:copy.lotto,jsonTitle:copy.json,memeTitle:copy.meme}))document.querySelector('#'+id).textContent=value;
document.title='Free Util · Tools';
