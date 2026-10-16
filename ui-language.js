(function(){
  const raw=new URLSearchParams(location.search).get('lang')||localStorage.getItem('freeutil-language')||navigator.language||'en';
  const locale=raw.toLowerCase().startsWith('ko')?'ko':raw.toLowerCase().startsWith('ja')?'ja':raw.toLowerCase().startsWith('zh')?'zh':'en';
  document.documentElement.lang=locale;
  try{localStorage.setItem('freeutil-language',locale)}catch(error){}
  const description=document.querySelector('meta[name="description"]'),tagline=document.querySelector('.hero p');
  if(description&&tagline&&locale!=='ko')description.content=tagline.textContent;
  const topbar=document.querySelector('.topbar');
  if(topbar&&!topbar.querySelector('.utility-language-picker')){
    const labels={ko:'언어',en:'Language',ja:'言語',zh:'语言'},picker=document.createElement('label'),select=document.createElement('select');
    picker.className='utility-language-picker';picker.append(`${labels[locale]} `,select);
    [['ko','한국어'],['en','English'],['ja','日本語'],['zh','中文']].forEach(([value,label])=>{const option=new Option(label,value);option.selected=value===locale;select.add(option)});
    select.setAttribute('aria-label',labels[locale]);
    select.addEventListener('change',event=>{try{localStorage.setItem('freeutil-language',event.target.value)}catch(error){}const next=new URL(location.href);next.searchParams.set('lang',event.target.value);location.href=next.href});
    topbar.append(picker);
  }
  if(locale==='ko')return;
  const map={
    '게임패드 테스트':['Gamepad test','ゲームパッドテスト','手柄测试'],'게임패드 선택':['Select gamepad','ゲームパッドを選択','选择手柄'],'방향키':['D-pad','方向キー','方向键'],'입력값 상세 정보':['Input details','入力値の詳細','输入值详情'],
    '이미지 자르기 영역':['Image crop area','画像の切り抜き領域','图片裁剪区域'],'키보드 테스트':['Keyboard test','キーボードテスト','键盘测试'],'가상 키보드':['Virtual keyboard','仮想キーボード','虚拟键盘'],
    '참여 번호가 연결된 사다리':['Ladder connecting participant numbers','参加番号をつなぐはしご','连接参与编号的梯子'],
    '보조 키 설명':['Modifier key guide','修飾キーの説明','修饰键说明'],'단축키 카테고리':['Shortcut categories','ショートカットの分類','快捷键分类'],
    'Vim 모드 설명':['Vim mode guide','Vimモードの説明','Vim 模式说明'],'Vim 단축키 카테고리':['Vim command categories','Vimコマンドの分類','Vim 命令分类'],
    '실행 취소':['Undo','元に戻す','撤销'],'다시 실행':['Redo','やり直す','重做'],'그림 도구':['Drawing tools','描画ツール','绘图工具'],'색상 팔레트':['Colour palette','カラーパレット','调色板'],
    '검정':['Black','黒','黑色'],'흰색':['White','白','白色'],'빨강':['Red','赤','红色'],'노랑':['Yellow','黄','黄色'],'파랑':['Blue','青','蓝色'],'초록':['Green','緑','绿色'],'보라':['Purple','紫','紫色'],'주황':['Orange','オレンジ','橙色'],
    '그림판 캔버스':['Drawing canvas','描画キャンバス','绘图画布'],'계산 모드':['Calculation mode','計算モード','计算模式'],'현재가를 입력하세요':['Enter the current price','現在の株価を入力','输入当前股价'],
    '세':['years','歳','岁'],'원':['KRW','ウォン','韩元'],'주':['shares','株','股'],'색상':['Colour','色','颜色'],
    '단축키 검색':['Search shortcuts','ショートカット検索','搜索快捷键'],'검색 결과가 없습니다.':['No results found.','検索結果がありません。','没有搜索结果。'],
    ':e 파일명':[':e filename',':e ファイル名',':e 文件名'],'/검색어':['/query','/検索語','/搜索词'],
    '1부터 45까지 중복 없는 번호 6개를 자동으로 생성합니다.':['Generate six unique numbers from 1 to 45.','1から45までの重複しない6個の番号を生成します。','从1至45生成六个不重复号码。'],
    '행운은 준비된 마음에 찾아옵니다.':['Good luck comes to a prepared mind.','幸運は準備した心に訪れます。','好运属于有准备的人。'],
    '번호를 복사했어요.':['Numbers copied.','番号をコピーしました。','已复制号码。'],
    '일반':['Standard','通常','普通'],'공학용':['Scientific','関数','科学'],'일반 계산':['Standard calculation','通常計算','普通计算'],'공학용 계산':['Scientific calculation','関数計算','科学计算'],
    '계산기 모드':['Calculator mode','電卓モード','计算器模式'],'계산식':['Expression','計算式','算式'],'결과':['Result','結果','结果'],'계산':['Calculate','計算','计算'],'초기화':['Clear','クリア','清除'],'확인':['Apply','適用','应用'],
    '성별':['Sex','性別','性别'],'남성':['Male','男性','男'],'여성':['Female','女性','女'],'나이':['Age','年齢','年龄'],'키':['Height','身長','身高'],'체중':['Weight','体重','体重'],'활동량':['Activity','活動量','活动量'],'목표':['Goal','目標','目标'],
    '거의 움직이지 않음':['Sedentary','ほぼ運動なし','几乎不运动'],'가벼운 활동':['Light activity','軽い活動','轻度活动'],'보통 활동':['Moderate activity','通常の活動','中等活动'],'많이 활동함':['High activity','多い活動','高强度活动'],'매우 많이 활동함':['Very high activity','非常に多い活動','非常高强度活动'],'현재 체중 유지':['Maintain weight','体重維持','维持体重'],'천천히 감량':['Lose weight slowly','ゆっくり減量','缓慢减重'],'천천히 증량':['Gain weight slowly','ゆっくり増量','缓慢增重'],
    '권장량 계산':['Calculate target','目安量を計算','计算建议量'],'하루 권장량':['Daily target','1日の目安','每日建议量'],'기초대사량':['Basal metabolic rate','基礎代謝量','基础代谢'],'먹은 음식':['Food eaten','食べた食品','已吃食物'],'음식':['Food','食品','食物'],'먹은 양':['Portion','食べた量','食用量'],'추가':['Add','追加','添加'],'먹은 음식을 추가하면 여기에 표시됩니다.':['Added foods will appear here.','追加した食品がここに表示されます。','添加的食物会显示在这里。'],'섭취 칼로리':['Calories eaten','摂取カロリー','已摄入热量'],'남은 칼로리':['Calories left','残りカロリー','剩余热量'],'권장량을 먼저 계산하세요':['Calculate your target first','先に目安量を計算してください','请先计算建议量'],
    '입력':['Input','入力','输入'],'결과 복사':['Copy result','結果をコピー','复制结果'],'전체 복사':['Copy all','すべてコピー','复制全部'],'전체 지우기':['Clear all','すべて削除','全部清除'],'지우기':['Clear','削除','清除'],'예제 불러오기':['Load example','例を読み込む','加载示例'],'분석하기':['Analyze','分析','分析'],'보기 좋게':['Format','整形','格式化'],'압축하기':['Minify','圧縮','压缩'],'데이터를 여기에 붙여넣으세요':['Paste data here','ここにデータを貼り付けてください','请将数据粘贴到这里'],
    '텍스트 입력':['Text input','テキスト入力','文本输入'],'텍스트를 입력하거나 붙여넣으세요':['Type or paste text','テキストを入力または貼り付けてください','请输入或粘贴文本'],'공백 포함':['With spaces','空白を含む','含空格'],'공백 제외':['Without spaces','空白を除く','不含空格'],'바이트':['Bytes','バイト','字节'],'복사했습니다':['Copied','コピーしました','已复制'],'검색 결과가 없습니다':['No results found','検索結果がありません','没有搜索结果'],
    '이미지 선택':['Choose image','画像を選択','选择图片'],'이미지를 선택하세요':['Choose an image','画像を選択してください','请选择图片'],'원본 이미지':['Original image','元画像','原图'],'선택 영역':['Selection','選択範囲','选择区域'],'이 영역 자르기':['Crop this area','この範囲を切り抜く','裁剪此区域'],'자른 이미지 다운로드':['Download cropped image','切り抜いた画像をダウンロード','下载裁剪后的图片'],'결과 미리보기':['Result preview','結果プレビュー','结果预览'],'원본으로':['Reset','元に戻す','重置'],
    '열기':['Open','開く','打开'],'저장':['Save','保存','保存'],'새로 만들기':['New','新規作成','新建'],'연필':['Pencil','鉛筆','铅笔'],'지우개':['Eraser','消しゴム','橡皮擦'],'스포이드':['Eyedropper','スポイト','取色器'],'사각형':['Rectangle','長方形','矩形'],'채우기':['Fill','塗りつぶし','填充'],'굵기':['Size','太さ','粗细'],'얇게':['Thin','細い','细'],
    '컨트롤러를 연결하고 버튼을 눌러보세요.':['Connect a controller and press a button.','コントローラーを接続してボタンを押してください。','连接控制器并按下按键。'],'컨트롤러가 연결되었습니다.':['Controller connected.','コントローラーが接続されています。','控制器已连接。'],'다시 검색':['Scan again','再検索','重新搜索'],'진동 테스트':['Test vibration','振動テスト','测试震动'],'입력 상세':['Input details','入力詳細','输入详情'],'표준 매핑':['Standard mapping','標準マッピング','标准映射'],'게임패드 테스트 안내':['About gamepad testing','ゲームパッドテストについて','游戏手柄测试说明'],'Xbox 스타일':['Xbox style','Xboxスタイル','Xbox 风格'],'PS5 스타일':['PS5 style','PS5スタイル','PS5 风格'],'Switch Pro 스타일':['Switch Pro style','Switch Proスタイル','Switch Pro 风格'],
    '키보드를 눌러보세요':['Press a key','キーを押してください','请按下按键'],'최근 입력':['Recent input','最近の入力','最近输入'],'현재 입력':['Current input','現在の入力','当前输入'],'확인한 키':['Tested keys','確認したキー','已测试按键'],'확인 표시 지우기':['Clear tested keys','確認表示を消去','清除测试标记'],'운영체제':['Operating system','オペレーティングシステム','操作系统'],'모바일에서는 지원하지 않습니다':['Not supported on mobile','モバイルには対応していません','移动设备不支持'],
    '게임 방법':['How to use','使い方','使用方法'],'사다리의 원리':['How the ladder works','はしごの仕組み','梯子的原理'],'공정하게 즐기기':['Play fairly','公平に楽しむ','公平游玩'],'모바일·역사 이야기':['Mobile and history','モバイルと歴史','移动设备与历史'],'독박':['Penalty','罰ゲーム','惩罚对象'],'면제':['Safe','免除','安全'],'시작':['Start','開始','开始'],'다시 뽑기':['Draw again','もう一度引く','重新抽取'],
    '번호 생성':['Generate numbers','番号を生成','生成号码'],'번호 생성기':['Number generator','番号ジェネレーター','号码生成器'],'복사':['Copy','コピー','复制'],'로또 번호 생성':['Generate lotto numbers','ロト番号を生成','生成乐透号码'],'1인분':['1 serving','1人前','1份'],'0.5인분':['0.5 serving','0.5人前','0.5份'],
    '동작 또는 키 검색':['Search actions or keys','操作またはキーを検索','搜索操作或按键'],'표시된 단축키 복사':['Copy shown shortcut','表示中のショートカットをコピー','复制显示的快捷键'],'전체':['All','すべて','全部'],'기본':['Basics','基本','基础'],'시스템':['System','システム','系统'],'창·앱':['Windows and apps','ウィンドウとアプリ','窗口与应用'],'텍스트':['Text','テキスト','文本'],'동작':['Action','操作','操作'],'단축키':['Shortcut','ショートカット','快捷键'],'명령':['Command','コマンド','命令'],'모드':['Mode','モード','模式']
  };
  const value=key=>map[key]?.[locale==='en'?0:locale==='ja'?1:2];
  const translateText=node=>{if(node.parentElement?.closest('script,style,textarea,#output,[data-reading-key]'))return;const key=node.nodeValue.trim();if(!key)return;const translated=value(key);if(translated)node.nodeValue=node.nodeValue.replace(key,translated)};
  const translateAttributes=element=>{for(const attr of ['placeholder','title','aria-label']){const text=element.getAttribute(attr),translated=text&&value(text);if(translated)element.setAttribute(attr,translated)}};
  const scan=()=>{const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(translateText);document.querySelectorAll('[placeholder],[title],[aria-label]').forEach(translateAttributes)};
  scan();
  document.querySelectorAll('#setCount option').forEach(option=>{option.textContent=`${option.value} ${{en:'sets',ja:'セット',zh:'组'}[locale]}`});
  // Only new Korean control text triggers writes; translated text is left untouched.
  new MutationObserver(records=>{
    records.forEach(record=>{
      if(record.type==='characterData')translateText(record.target);
      record.addedNodes.forEach(node=>{
        if(node.nodeType===Node.TEXT_NODE){translateText(node);return}
        if(node.nodeType!==Node.ELEMENT_NODE)return;
        const walker=document.createTreeWalker(node,NodeFilter.SHOW_TEXT);
        while(walker.nextNode())translateText(walker.currentNode);
      });
    });
  }).observe(document.body,{subtree:true,childList:true,characterData:true});
})();
