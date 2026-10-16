const adsenseScript=document.createElement('script');adsenseScript.async=true;adsenseScript.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4401870717103583';adsenseScript.crossOrigin='anonymous';document.head.append(adsenseScript);
if(location.protocol==='file:'){const brand=document.querySelector('.brand');brand.href+='index.html'}
const numberSets = document.querySelector('#numberSets');
const setCount = document.querySelector('#setCount');
const toast = document.querySelector('#toast');
const generateButton = document.querySelector('#generateButton');
const lottoLanguage=(new URLSearchParams(location.search).get('lang')||localStorage.getItem('freeutil-language')||navigator.language||'en').toLowerCase();
const lottoUi=lottoLanguage.startsWith('ja')?{again:'もう一度引く',copy:'コピー',copied:'コピーしました'}:lottoLanguage.startsWith('zh')?{again:'重新生成',copy:'复制',copied:'已复制'}:!lottoLanguage.startsWith('ko')?{again:'Draw again',copy:'Copy',copied:'Copied'}:{again:'다시 뽑기',copy:'복사',copied:'복사했어요'};
let hasGenerated = false;
const colors = [{ max:10, className:'yellow' }, { max:20, className:'blue' }, { max:30, className:'red' }, { max:40, className:'gray' }, { max:45, className:'green' }];

function colorFor(number) { return colors.find(color => number <= color.max).className; }
function makeNumbers() { return [...Array(45)].map((_, i) => i + 1).sort(() => Math.random() - .5).slice(0, 6).sort((a,b) => a-b); }
function render() {
  numberSets.innerHTML = '';
  const count = Math.min(5, Math.max(1, parseInt(setCount.value, 10) || 1));
  for (let i = 0; i < count; i += 1) {
    const numbers = makeNumbers();
    const row = document.createElement('div'); row.className = 'number-set'; row.style.animationDelay = `${i * 70}ms`;
    row.innerHTML = `<span class="set-label">${String(i + 1).padStart(2, '0')}</span><div class="balls">${numbers.map(number => `<span class="ball ${colorFor(number)}">${number}</span>`).join('')}</div><button class="copy-button" type="button" aria-label="${numbers.join(', ')} ${lottoUi.copy}">${lottoUi.copy}</button>`;
    row.querySelector('.copy-button').addEventListener('click', () => copyNumbers(numbers)); numberSets.appendChild(row);
  }
}
async function copyNumbers(numbers) { const text = numbers.join(', '); try { await navigator.clipboard.writeText(text); } catch { const area = document.createElement('textarea'); area.value = text; document.body.append(area); area.select(); document.execCommand('copy'); area.remove(); } showToast(`${text} · ${lottoUi.copied}`); }
function showToast(message) { toast.textContent = message; toast.classList.add('show'); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200); }
generateButton.addEventListener('click', () => {
  render();
  hasGenerated = true;
  generateButton.querySelector('span').textContent = lottoUi.again;
});
setCount.addEventListener('change', () => {
  render();
  hasGenerated = true;
  generateButton.querySelector('span').textContent = lottoUi.again;
});
