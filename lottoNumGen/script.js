const adsenseScript=document.createElement('script');adsenseScript.async=true;adsenseScript.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4401870717103583';adsenseScript.crossOrigin='anonymous';document.head.append(adsenseScript);
if(location.protocol==='file:'){const brand=document.querySelector('.brand');brand.href+='index.html'}
const numberSets = document.querySelector('#numberSets');
const setCount = document.querySelector('#setCount');
const toast = document.querySelector('#toast');
const generateButton = document.querySelector('#generateButton');
const lottoLanguage=(new URLSearchParams(location.search).get('lang')||localStorage.getItem('freeutil-language')||navigator.language||'en').toLowerCase();
const lottoUi=lottoLanguage.startsWith('ja')?{again:'もう一度引く',copy:'コピー',copied:'コピーしました'}:lottoLanguage.startsWith('zh')?{again:'重新生成',copy:'复制',copied:'已复制'}:!lottoLanguage.startsWith('ko')?{again:'Draw again',copy:'Copy',copied:'Copied'}:{again:'다시 뽑기',copy:'복사',copied:'복사했어요'};
let hasGenerated = false;
let drawFrame = null;
const colors = [{ max:10, className:'yellow' }, { max:20, className:'blue' }, { max:30, className:'red' }, { max:40, className:'gray' }, { max:45, className:'green' }];

function colorFor(number) { return colors.find(color => number <= color.max).className; }
function makeNumbers() { return [...Array(45)].map((_, i) => i + 1).sort(() => Math.random() - .5).slice(0, 6).sort((a,b) => a-b); }
function render() {
  if (drawFrame !== null) cancelAnimationFrame(drawFrame);
  drawFrame = null;
  numberSets.innerHTML = '';
  numberSets.setAttribute('aria-busy', 'true');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const draws = [];
  const count = Math.min(5, Math.max(1, parseInt(setCount.value, 10) || 1));
  for (let i = 0; i < count; i += 1) {
    const numbers = makeNumbers();
    const row = document.createElement('div'); row.className = 'number-set'; row.style.animationDelay = `${i * 70}ms`;
    row.innerHTML = `<span class="set-label">${String(i + 1).padStart(2, '0')}</span><div class="balls" aria-hidden="true">${numbers.map(number => `<span class="ball ${colorFor(number)} is-waiting"><span class="ball-value">·</span></span>`).join('')}</div><button class="copy-button" type="button" disabled aria-label="${numbers.join(', ')} ${lottoUi.copy}">${lottoUi.copy}</button>`;
    row.querySelector('.copy-button').addEventListener('click', () => copyNumbers(numbers)); numberSets.appendChild(row);
    draws.push({ row, numbers, balls: [...row.querySelectorAll('.ball')], revealed: 0 });
  }
  let startTime = null;
  function frame(time) {
    if (startTime === null) startTime = time;
    const elapsed = time - startTime;
    let finished = true;
    draws.forEach((draw, rowIndex) => {
      draw.balls.forEach((ball, index) => {
        if (ball.classList.contains('is-revealed')) return;
        const localTime = elapsed - rowIndex * 120 - index * 160;
        if (reducedMotion || localTime >= 370) {
          ball.classList.remove('is-waiting', 'is-rolling');
          colors.forEach(color => ball.classList.remove(color.className));
          ball.classList.add(colorFor(draw.numbers[index]));
          ball.classList.add('is-revealed');
          ball.querySelector('.ball-value').textContent = draw.numbers[index];
          draw.revealed++;
        } else {
          finished = false;
          if (localTime >= 0) {
            ball.classList.remove('is-waiting');
            ball.classList.add('is-rolling');
            const tick = Math.floor(localTime / 65);
            if (ball.dataset.tick !== String(tick)) {
              ball.dataset.tick = tick;
              const rollingNumber = 1 + Math.floor(Math.random() * 45);
              colors.forEach(color => ball.classList.remove(color.className));
              ball.classList.add(colorFor(rollingNumber));
              ball.querySelector('.ball-value').textContent = rollingNumber;
            }
          }
        }
      });
      if (draw.revealed === 6 && !draw.row.classList.contains('draw-complete')) {
        draw.row.classList.add('draw-complete');
        draw.row.querySelector('.balls').removeAttribute('aria-hidden');
        draw.row.querySelector('.copy-button').disabled = false;
      }
    });
    if (finished) {
      numberSets.setAttribute('aria-busy', 'false');
      drawFrame = null;
    } else drawFrame = requestAnimationFrame(frame);
  }
  if (reducedMotion) frame(0); else drawFrame = requestAnimationFrame(frame);
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
