const $=selector=>document.querySelector(selector);const lang=(new URLSearchParams(location.search).get('lang')||localStorage.getItem('freeutil-language')||navigator.language||'en').toLowerCase(),ko=lang.startsWith('ko'),ja=lang.startsWith('ja'),zh=lang.startsWith('zh');
const copy=ko?{title:'마우스 기능 테스트',tagline:'마우스 버튼과 휠의 작동 여부를 확인합니다.',waiting:'마우스를 조작해 보세요.',hint:'테스트 영역 내에서 조작해 주세요.',last:'최근 입력',double:'더블 클릭',none:'-',detected:'감지됨',notDetected:'미감지',btn0:'왼쪽 클릭',btn1:'휠 클릭',btn2:'오른쪽 클릭',btn3:'뒤로 가기',btn4:'앞으로 가기',wheel:'휠 스크롤',infoUsage:'사용법',infoDetail:'상세 안내',usage1:'마우스의 각 버튼을 클릭하거나 휠을 돌리면 화면의 마우스 이미지와 하단 카운터가 반응합니다.',usage2:'오른쪽 클릭 테스트를 위해 테스트 영역 내에서는 브라우저 기본 메뉴가 나타나지 않도록 설정되어 있습니다.',detail1:'이 도구는 브라우저의 MouseEvent API를 사용하여 입력을 감지합니다.',detail2:'사이드 버튼(뒤로 가기/앞으로 가기)은 마우스 하드웨어 및 드라이버 설정에 따라 인식되지 않을 수 있습니다.',langLabel:'언어'}:ja?{title:'マウス機能テスト',tagline:'マウスボタンとホイールの動作を確認します。',waiting:'マウスを操作してみてください。',hint:'テストエリア内で操作してください。',last:'最近の入力',double:'ダブルクリック',none:'-',detected:'検出済み',notDetected:'未検出',btn0:'左クリック',btn1:'ホイールクリック',btn2:'右クリック',btn3:'戻る',btn4:'進む',wheel:'ホイールスクロール',infoUsage:'使用法',infoDetail:'詳細案内',usage1:'マウスの各ボタンをクリックしたりホイールを回したりすると、画面上のマウス画像と下のカウンターが反応します。',usage2:'右クリックテストのため, 테스트エリア内ではブラウザのデフォルトメニューが表示されないように設定されています。',detail1:'このツールはブラウザの MouseEvent API を使用して入力を検出します。',detail2:'サイドボタン（戻る・進む）は、マウスのハードウェアやドライバーの設定によって認識されない場合があります。',langLabel:'言語'}:zh?{title:'鼠标功能测试',tagline:'测试鼠标按钮和滚轮的功能。',waiting:'请操作鼠标。',hint:'请在测试区域内操作。',last:'最近输入',double:'双击',none:'-',detected:'已检测',notDetected:'未检测',btn0:'左键点击',btn1:'中键点击',btn2:'右键点击',btn3:'后退',btn4:'前进',wheel:'滚轮滚动',infoUsage:'使用方法',infoDetail:'详细说明',usage1:'点击鼠标的各个按钮或滚动滚轮，屏幕上的鼠标图像和下方计数器将做出反应。',usage2:'为了测试右键点击，在测试区域内已禁用浏览器的默认菜单。',detail1:'本工具使用浏览器的 MouseEvent API 来检测输入。',detail2:'侧边按钮（后退/前进）可能因鼠标硬件或驱动设置而无法识别。',langLabel:'语言'}:{title:'Mouse Function Test',tagline:'Check the functionality of mouse buttons and the scroll wheel.',waiting:'Try operating your mouse.',hint:'Please place the mouse cursor within the test area.',last:'최근 입력',double:'Double click',none:'-',detected:'Detected',notDetected:'Not detected',btn0:'Left Click',btn1:'Middle Click',btn2:'Right Click',btn3:'Back',btn4:'Forward',wheel:'Scroll Wheel',infoUsage:'How to use',infoDetail:'Details',usage1:'Click each mouse button or roll the wheel to see the visual mouse and counters react.',usage2:'The default browser context menu is disabled in the test area to allow right-click testing.',detail1:'This tool uses the browser\'s MouseEvent API to detect inputs.',detail2:'Side buttons (Back/Forward) may not be detected depending on your mouse hardware and driver settings.',langLabel:'Language'};
document.documentElement.lang=ko?'ko':ja?'ja':zh?'zh':'en';document.title=`Free Util · ${copy.title}`;$('#title').textContent=copy.title;$('#tagline').textContent=copy.tagline;$('#statusText').textContent=copy.waiting;$('#hintText').textContent=copy.hint;$('#lbl-btn0').textContent=copy.btn0;$('#lbl-btn1').textContent=copy.btn1;$('#lbl-btn2').textContent=copy.btn2;$('#lbl-btn3').textContent=copy.btn3;$('#lbl-btn4').textContent=copy.btn4;$('#lbl-wheel').textContent=copy.wheel;$('#info-usage').textContent=copy.infoUsage;$('#info-detail').textContent=copy.infoDetail;$('#langLabel').textContent=copy.langLabel;$('#langSelect').value=lang;
const usageContent=document.querySelector('#info-usage + .info-content');if(usageContent){usageContent.innerHTML=`<p>${copy.usage1}</p><p>${copy.usage2}</p>`}
const detailContent=document.querySelector('#info-detail + .info-content');if(detailContent){detailContent.innerHTML=`<p>${copy.detail1}</p><p>${copy.detail2}</p>`}

const counts={0:0,1:0,2:0,3:0,4:0,wheel:0},btnElements=document.querySelectorAll('.btn'),counterCards=document.querySelectorAll('.counter-card'),wheelEl=$('#mouseWheel');let lastClickTime=0,doubleClickTimeout=null;

function updateCount(btn){counts[btn]++;$('#count-'+btn).textContent=counts[btn]}
function setVisualState(btn,isActive){const el=document.querySelector(`.btn[data-button="${btn}"]`);if(el)el.classList.toggle('active',isActive);const card=document.querySelector(`.counter-card[data-button="${btn}"]`);if(card)card.classList.toggle('active',isActive)}

const testArea=$('#testArea');
testArea.addEventListener('mousedown',event=>{
  const btn=event.button;
  if(btn>=0&&btn<=4){
    $('#statusDot').classList.add('active');
    testArea.classList.add('active');
    $('#statusText').textContent=`${copy[`btn${btn}`]}`;
    setVisualState(btn,true);
    updateCount(btn);
    $('#lastInput').textContent=`${copy[`btn${btn}`]}`;

    const now=Date.now();
    if(now-lastClickTime<300){
      $('#doubleClickStatus').textContent=copy.detected;
      $('#doubleClickStatus').style.color='var(--accent-dark)';
      if(doubleClickTimeout)clearTimeout(doubleClickTimeout);
      doubleClickTimeout=setTimeout(()=>{$('#doubleClickStatus').textContent=copy.none;$('#doubleClickTimeout').textContent=copy.none;},1000);
    }
    lastClickTime=now;
  }
},true);

testArea.addEventListener('mouseup',event=>{
  const btn=event.button;
  if(btn>=0&&btn<=4){
    setVisualState(btn,false);
  }
},true);

testArea.addEventListener('mouseleave',()=>{$('#statusDot').classList.remove('active');testArea.classList.remove('active');});

testArea.addEventListener('wheel',event=>{
  event.preventDefault();
  $('#statusDot').classList.add('active');
  testArea.classList.add('active');
  $('#statusText').textContent=copy.wheel;
  updateCount('wheel');
  $('#lastInput').textContent=copy.wheel;

  const dir=event.deltaY>0?'down':'up';
  wheelEl.classList.remove('scroll-up','scroll-down');
  wheelEl.classList.add(dir==='up'?'scroll-up':'scroll-down');
  setTimeout(()=>{wheelEl.classList.remove('scroll-up','scroll-down'),$('#statusDot').classList.remove('active'),testArea.classList.remove('active')},200);
},{passive:false});

testArea.addEventListener('contextmenu',event=>event.preventDefault());

$('#langSelect').addEventListener('change',e=>{
  const selectedLang=e.target.value;
  localStorage.setItem('freeutil-language',selectedLang);
  location.href=`${location.pathname}?lang=${selectedLang}`;
});
