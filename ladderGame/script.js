const $=selector=>document.querySelector(selector);
const playerCount=$('#playerCount'),numberPreview=$('#numberPreview'),startButton=$('#startButton'),ladderBoard=$('#ladderBoard'),topLabels=$('#topLabels'),bottomLabels=$('#bottomLabels'),ladderSvg=$('#ladderSvg'),ladderCountdown=$('#ladderCountdown'),winnerPanel=$('#winnerPanel'),winnerNumber=$('#winnerNumber'),gameStatus=$('#gameStatus');
const useNames=$('#useNames'),nameInputs=$('#nameInputs'),nameSettings=$('#nameSettings'),participantNames=Array(12).fill('');
const nameLanguage=(new URLSearchParams(location.search).get('lang')||localStorage.getItem('freeutil-language')||navigator.language||'en').toLowerCase();
const nameLocale=['ko','ja','zh'].find(code=>nameLanguage.startsWith(code))||'en';
const nameCopy={ko:{toggle:'이름 직접 입력',group:'참가자 이름',person:'참가자',namedResult:'독박으로 선택되었습니다.',numberResult:'번이 당첨되었습니다'},en:{toggle:'Enter names',group:'Participant names',person:'Player',namedResult:'Selected for the penalty.',numberResult:'is the selected number'},ja:{toggle:'名前を入力',group:'参加者の名前',person:'参加者',namedResult:'罰ゲームに選ばれました。',numberResult:'番が選ばれました'},zh:{toggle:'手动输入姓名',group:'参与者姓名',person:'参与者',namedResult:'被选中接受惩罚。',numberResult:'号被选中了'}}[nameLocale];
$('#useNamesLabel').textContent=nameCopy.toggle;nameInputs.setAttribute('aria-label',nameCopy.group);winnerNumber.dataset.userContent='';
function participantName(index){return useNames.checked?participantNames[index]?.trim()||String(index+1):String(index+1)}
function updateBoardWidth(){const card=ladderBoard.parentElement;card.style.setProperty('--ladder-width',`${Math.max(420,players*70)}px`);card.closest('.shell').style.setProperty('--game-shell-width',`${Math.max(800,players*70+80)}px`)}
function renderNameInputs(){
 nameInputs.replaceChildren();nameInputs.hidden=!useNames.checked;
 for(let index=0;index<players;index++){
  const label=document.createElement('label'),number=document.createElement('span'),input=document.createElement('input');
  number.textContent=index+1;input.type='text';input.maxLength=24;input.value=participantNames[index];input.placeholder=String(index+1);
  input.setAttribute('aria-label',`${nameCopy.person} ${index+1}`);input.autocomplete='off';input.dataset.index=index;
  label.append(number,input);nameInputs.append(label);
 }
}
nameInputs.addEventListener('input',event=>{const input=event.target;if(!input.matches('input[data-index]'))return;participantNames[Number(input.dataset.index)]=input.value;renderNumbers(false)});
useNames.addEventListener('change',()=>{renderNameInputs();renderNumbers(false)});
const svgNS='http://www.w3.org/2000/svg';const participantPalette=[['#dce9ff','#9dbdf5','#3f6fbe'],['#d8f3ee','#91d4c5','#2d8174'],['#ffe0e7','#f0a5b7','#b34f6d'],['#fff0c8','#e9c86d','#9b7415'],['#eadfff','#bda3ed','#7042b6'],['#dff0f5','#9dcbd9','#367b91'],['#e6f0cf','#b5d68b','#628d31'],['#ffe5d2','#efb08a','#a96032'],['#e0e7ff','#a9b9ed','#5368a9'],['#f5e0f1','#d7a7ca','#96547f'],['#d9f0e8','#9bcdbb','#397e65'],['#ffedcf','#ebc184','#a06f24']];let players=4,rungs=[],rungShapes=[],targetBottom=0,animationFrame=null,countdownTimer=null,generationAttempts=0;
function previewPlayerLimit(){const width=numberPreview.clientWidth||420,gap=parseFloat(getComputedStyle(numberPreview).gap)||6,circle=numberPreview.querySelector('span')?.getBoundingClientRect().width||(window.matchMedia('(max-width: 560px)').matches?25:28);return Math.max(2,Math.min(12,Math.floor((width+gap)/(circle+gap))))}
function clampPlayers(){const limit=previewPlayerLimit(),value=Number(playerCount.value);playerCount.max=limit;players=Math.max(2,Math.min(limit,Number.isFinite(value)&&value>=2?Math.round(value):players));playerCount.value=players;startButton.disabled=false}
function syncPlayerInput(){const limit=previewPlayerLimit(),raw=playerCount.value.trim(),value=Number(raw),valid=raw!==''&&Number.isInteger(value)&&value>=2&&value<=limit;playerCount.max=limit;startButton.disabled=!valid;if(valid&&value!==players){players=value;renderNumbers()}}
function renderNumbers(updateEditor=true){updateBoardWidth();numberPreview.innerHTML=Array.from({length:players},(_,index)=>`<span>${index+1}</span>`).join('');const language=(new URLSearchParams(location.search).get('lang')||localStorage.getItem('freeutil-language')||navigator.language||'en').toLowerCase();if(updateEditor)renderNameInputs();numberPreview.querySelectorAll('span').forEach((node,index)=>{node.dataset.userContent='';node.title=participantName(index)});numberPreview.setAttribute('aria-label',language.startsWith('ko')?`${players}명 번호 미리보기`:language.startsWith('ja')?`${players}人の参加番号プレビュー`:language.startsWith('zh')?`${players}人参与编号预览`:`Participant number preview: ${players}`)}
function renderLabels(reveal=false){
 updateBoardWidth();
 const language=(new URLSearchParams(location.search).get('lang')||localStorage.getItem('freeutil-language')||navigator.language||'en').toLowerCase();
 const locale=['ko','ja','zh'].find(code=>language.startsWith(code))||'en';
 const labels={ko:['독박','면제'],en:['Pen<br>alty','Safe'],ja:['罰ゲーム','免除'],zh:['惩罚<br>对象','安全']}[locale];
 const topHtml=Array.from({length:players},(_,index)=>{const palette=participantPalette[index%participantPalette.length];return`<span class="participant participant-${index%participantPalette.length}" style="background:${palette[0]};border-color:${palette[1]};color:${palette[2]}">${index+1}</span>`}).join('');
 const bottomHtml=Array.from({length:players},(_,index)=>{const isTarget=index===targetBottom;return`<span class="${reveal?(isTarget?'target':'safe'):''}">${reveal?labels[isTarget?0:1]:'?'}</span>`}).join('');
 topLabels.innerHTML=topHtml;bottomLabels.innerHTML=bottomHtml;bottomLabels.dataset.locale=locale;topLabels.style.setProperty('--players',players);bottomLabels.style.setProperty('--players',players);
 topLabels.removeAttribute('aria-hidden');
 Array.from(topLabels.children).forEach((circle,index)=>{
  const entry=document.createElement('div');entry.className='participant-entry';entry.dataset.userContent='';entry.title=participantName(index);
  const name=useNames.checked?participantNames[index]?.trim():'';
  circle.replaceWith(entry);
  if(name){const caption=document.createElement('small');caption.className='participant-name';caption.textContent=name;entry.append(caption)}
  entry.append(circle);
 });
}
function makeRungs(){
  const rows=Math.max(12,Math.min(22,players+9));
  rungs=[];
  const columnUse=Array(players-1).fill(0);
  const rowSpan=100/rows;
  const previousEndpointYs=(row,vertical)=>{const ys=[];for(let previous=0;previous<row;previous++){const base=(previous+.5)*rowSpan;for(const col of rungs[previous]){const shape=rungShapes[previous][col];if(col===vertical)ys.push(base+shape.tilt*rowSpan);if(col+1===vertical)ys.push(base-shape.tilt*rowSpan)}}return ys};
  const endpointsAreClear=(row,col,tilt)=>{const base=(row+.5)*rowSpan,minGap=rowSpan*.24;return [base+tilt*rowSpan,base-tilt*rowSpan].every((y,index)=>previousEndpointYs(row,col+index).every(other=>Math.abs(y-other)>minGap))};
  const crossesPrevious=(row,col,tilt)=>{const base=(row+.5)*rowSpan,y1=base+tilt*rowSpan,y2=base-tilt*rowSpan,minGap=rowSpan*.24;for(let previous=0;previous<row;previous++)if(rungs[previous].includes(col)){const previousBase=(previous+.5)*rowSpan,previousTilt=rungShapes[previous][col].tilt,previousY1=previousBase+previousTilt*rowSpan,previousY2=previousBase-previousTilt*rowSpan;if((y1-previousY1)*(y2-previousY2)<0||Math.min(Math.abs(y1-previousY1),Math.abs(y2-previousY2))<=minGap)return true}return false};
  let previousSlopedColumns=new Set();
  for(let row=0;row<rows;row++){
    const line=[];
    const maxRungs=Math.max(1,Math.floor(players/2));
    const minimumRungs=Math.max(1,Math.ceil(players/4));
    const desired=Math.min(maxRungs,minimumRungs+(Math.random()<.58?1:0)+(players>=10&&Math.random()<.2?1:0));
    const candidates=Array.from({length:players-1},(_,index)=>index).sort((a,b)=>columnUse[a]-columnUse[b]||Math.random()-.5);
    for(const col of candidates){
      if(line.every(existing=>Math.abs(existing-col)>1)){line.push(col);columnUse[col]++}
      if(line.length>=desired)break;
    }
    line.sort((a,b)=>a-b);
    for(let index=line.length-1;index>=0;index--)if(crossesPrevious(row,line[index],0))line.splice(index,1);
    rungShapes[row]={};
    const currentSlopedColumns=new Set();
    line.forEach(col=>{const touchesPrevious=previousSlopedColumns.has(col)||previousSlopedColumns.has(col+1),leftHasAbove=row>0&&rungs[row-1].some(rung=>rung===col||rung===col-1),rightHasAbove=row>0&&rungs[row-1].some(rung=>rung===col+1||rung===col),canRise=leftHasAbove||rightHasAbove,tiltMagnitude=1.18+Math.random()*.12,edgeRoom=Math.min(row+.5,rows-row-.5)-.1,tiltDirection=rightHasAbove&&(!leftHasAbove||Math.random()<.5)?1:-1,sloped=!touchesPrevious&&canRise&&edgeRoom>=tiltMagnitude&&endpointsAreClear(row,col,tiltDirection*tiltMagnitude)&&!crossesPrevious(row,col,tiltDirection*tiltMagnitude)&&Math.random()<.34,tilt=sloped?tiltDirection*tiltMagnitude:0;rungShapes[row][col]={tilt};if(sloped){currentSlopedColumns.add(col);currentSlopedColumns.add(col+1)}});
    previousSlopedColumns=currentSlopedColumns;
    rungs.push(line);
  }
  const endpointYsOnVertical=(row,vertical,excludeCol)=>{const ys=[];for(let otherRow=0;otherRow<rows;otherRow++)for(const otherCol of rungs[otherRow]||[]){if(otherRow===row&&otherCol===excludeCol)continue;const shape=rungShapes[otherRow][otherCol],base=(otherRow+.5)*rowSpan;if(otherCol===vertical)ys.push(base+shape.tilt*rowSpan);if(otherCol+1===vertical)ys.push(base-shape.tilt*rowSpan)}return ys.sort((a,b)=>a-b)};
  for(let pass=0;pass<3;pass++)for(let row=0;row<rows;row++)for(const col of rungs[row]){const shape=rungShapes[row][col];if(!shape.tilt)continue;const base=(row+.5)*rowSpan,vertical=shape.tilt>0?col+1:col,reference=base-Math.abs(shape.tilt)*rowSpan,otherYs=endpointYsOnVertical(row,vertical,col),above=otherYs.filter(y=>y<reference).pop(),below=otherYs.find(y=>y>reference);if(above===undefined||below===undefined)continue;const midpoint=(above+below)/2;if(midpoint>=base)continue;shape.tilt=shape.tilt>0?(base-midpoint)/rowSpan:(midpoint-base)/rowSpan}
  if(!isSafeLayout()&&generationAttempts<40){generationAttempts++;makeRungs();return}generationAttempts=0;
}
function isSafeLayout(){const rowSpan=100/rungs.length,minGap=rowSpan*.24,endpoint=(row,col)=>{const shape=rungShapes[row][col],base=(row+.5)*rowSpan;return[base+shape.tilt*rowSpan,base-shape.tilt*rowSpan]};for(let row=0;row<rungs.length;row++)for(const col of rungs[row]){const current=endpoint(row,col);if(current.some(y=>y<=0||y>=100))return false;for(let otherRow=row+1;otherRow<rungs.length;otherRow++)for(const otherCol of rungs[otherRow]){const other=endpoint(otherRow,otherCol);if(col===otherCol){if((current[0]-other[0])*(current[1]-other[1])<0||Math.min(Math.abs(current[0]-other[0]),Math.abs(current[1]-other[1]))<=minGap)return false}else if(col+1===otherCol&&Math.abs(current[1]-other[0])<=minGap)return false;else if(col===otherCol+1&&Math.abs(current[0]-other[1])<=minGap)return false}}return true}
let boardWidthUnits=100,gameRunning=false;
function xFor(column){return(column+.5)*boardWidthUnits/players}
function syncLadderCoordinates(){
 const bounds=ladderSvg.getBoundingClientRect();if(!bounds.width||!bounds.height)return false;
 const width=bounds.width/bounds.height*100;
 if(Math.abs(width-boardWidthUnits)<.00001&&Math.abs(ladderSvg.viewBox.baseVal.width-boardWidthUnits)<.0001)return false;
 boardWidthUnits=width;ladderSvg.setAttribute('viewBox',`0 0 ${width} 100`);
 ladderSvg.querySelectorAll('.ladder-vertical').forEach((line,index)=>{line.setAttribute('x1',xFor(index));line.setAttribute('x2',xFor(index))});
 ladderSvg.querySelectorAll('.ladder-horizontal').forEach(line=>{const row=Number(line.dataset.row),col=Number(line.dataset.col),shape=rungGeometry(row,col);line.setAttribute('d',`M ${shape.x1} ${shape.y1} ${rungPath(row,col)}`)});
 return true;
}
function yFor(row){return(row+.5)*100/rungs.length}
function rungGeometry(row,col){const shape=rungShapes[row]?.[col]||{tilt:0},span=100/rungs.length,base=yFor(row),x1=xFor(col),x2=xFor(col+1),y1=base+shape.tilt*span,y2=base-shape.tilt*span;return{x1,x2,y1,y2}}
function rungPath(row,col,reverse=false){const shape=rungGeometry(row,col);return reverse?`L ${shape.x1} ${shape.y1}`:`L ${shape.x2} ${shape.y2}`}
function element(name,attrs){const node=document.createElementNS(svgNS,name);Object.entries(attrs).forEach(([key,value])=>node.setAttribute(key,value));return node}
function walkLadder(start){const points=[{x:start,y:0}],commands=[`M ${xFor(start)} 0`],visited=new Set();let current=start,currentY=0;for(let step=0;step<rungs.length*players;step++){const candidates=[];rungs.forEach((line,row)=>line.forEach(col=>{const key=`${row}:${col}`;if(visited.has(key))return;if(col===current){const shape=rungGeometry(row,col);if(shape.y1>currentY+.0001)candidates.push({row,col,y:shape.y1})}else if(col+1===current){const shape=rungGeometry(row,col);if(shape.y2>currentY+.0001)candidates.push({row,col,y:shape.y2})}}));if(!candidates.length)break;candidates.sort((a,b)=>a.y-b.y);const next=candidates[0],shape=rungGeometry(next.row,next.col);visited.add(`${next.row}:${next.col}`);commands.push(`V ${next.y}`);if(current===next.col){commands.push(rungPath(next.row,next.col));current=next.col+1;currentY=shape.y2}else{commands.push(rungPath(next.row,next.col,true));current=next.col;currentY=shape.y1}points.push({x:current,y:currentY})}commands.push('V 100');return{points,winner:current,d:commands.join(' ')}}
function walkLadderUp(start){const points=[{x:start,y:100}],commands=[`M ${xFor(start)} 100`],vertices=[{x:xFor(start),y:100}],visited=new Set();let current=start,currentY=100;for(let step=0;step<rungs.length*players;step++){const candidates=[];rungs.forEach((line,row)=>line.forEach(col=>{const key=`${row}:${col}`;if(visited.has(key))return;if(col===current){const shape=rungGeometry(row,col);if(shape.y1<currentY-.0001)candidates.push({row,col,y:shape.y1})}else if(col+1===current){const shape=rungGeometry(row,col);if(shape.y2<currentY-.0001)candidates.push({row,col,y:shape.y2})}}));if(!candidates.length)break;candidates.sort((a,b)=>b.y-a.y);const next=candidates[0],shape=rungGeometry(next.row,next.col);visited.add(`${next.row}:${next.col}`);commands.push(`V ${next.y}`);vertices.push({x:xFor(current),y:next.y});if(current===next.col){commands.push(rungPath(next.row,next.col));current=next.col+1;currentY=shape.y2}else{commands.push(rungPath(next.row,next.col,true));current=next.col;currentY=shape.y1}points.push({x:current,y:currentY});vertices.push({x:xFor(current),y:currentY})}commands.push('V 0');vertices.push({x:xFor(current),y:0});return{points,vertices,winner:current,d:commands.join(' ')} }
function drawLadder(){ladderSvg.innerHTML='';syncLadderCoordinates();let lineIndex=0;const ladderColor='#9288bd';for(let col=0;col<players;col++){const vertical=element('line',{x1:xFor(col),y1:0,x2:xFor(col),y2:100,class:'ladder-vertical'});vertical.style.setProperty('--line-index',lineIndex++);vertical.style.stroke=ladderColor;ladderSvg.append(vertical)}rungs.forEach((line,row)=>line.forEach(col=>{const shape=rungGeometry(row,col),horizontal=element('path',{d:`M ${shape.x1} ${shape.y1} ${rungPath(row,col)}`,class:'ladder-horizontal','data-row':row,'data-col':col});horizontal.style.setProperty('--line-index',lineIndex++);horizontal.style.stroke=ladderColor;ladderSvg.append(horizontal)}));}
function buildOrthogonalPath(start){return walkLadderUp(start)}
function createParticipantExplosion(point){const explosion=element('g',{class:'participant-explosion',transform:`translate(${point.x} ${point.y})`}),burst=element('g',{class:'participant-burst'});burst.append(element('circle',{class:'participant-ring',cx:0,cy:0,r:3}),element('circle',{class:'participant-core',cx:0,cy:0,r:1.8}));for(let index=0;index<8;index++)burst.append(element('line',{class:'participant-fragment',x1:0,y1:-3,x2:0,y2:-9,transform:`rotate(${index*45})`}));explosion.append(burst);ladderSvg.append(explosion);setTimeout(()=>explosion.remove(),900)}
// Draw only the travelled geometry: no animated dash masks or GPU blur surfaces.
function createProgressGeometry(vertices){
 const segments=[];let length=0,prefix=`M ${vertices[0].x} ${vertices[0].y}`;
 for(let index=1;index<vertices.length;index++){
  const from=vertices[index-1],to=vertices[index],size=Math.hypot(to.x-from.x,to.y-from.y);
  if(size===0)continue;
  segments.push({from,to,size,start:length,prefix});length+=size;
  prefix+=` L ${to.x} ${to.y}`;
 }
 return{segments,length,d:prefix,start:vertices[0],end:vertices[vertices.length-1]};
}
function progressGeometryAt(geometry,distance){
 const travelled=Math.max(0,Math.min(geometry.length,distance));
 if(travelled===0)return{d:`M ${geometry.start.x} ${geometry.start.y}`,point:geometry.start};
 if(travelled>=geometry.length)return{d:geometry.d,point:geometry.end};
 const segment=geometry.segments.find(item=>travelled<=item.start+item.size);
 const ratio=(travelled-segment.start)/segment.size;
 const point={x:segment.from.x+(segment.to.x-segment.from.x)*ratio,y:segment.from.y+(segment.to.y-segment.from.y)*ratio};
 return{d:`${segment.prefix} L ${point.x} ${point.y}`,point};
}
function animatePath(start,callback){
 const route=buildOrthogonalPath(start);let geometry=createProgressGeometry(route.vertices);
 const initial=progressGeometryAt(geometry,0),group=element('g',{class:'ladder-progress'});
 const layers=['ladder-path-glow glow-outer','ladder-path-glow glow-middle','ladder-path-glow glow-inner','ladder-path','ladder-path-core'].map(className=>element('path',{class:className,d:initial.d}));
 group.append(...layers);
 const bomb=element('g',{class:'fuse-bomb'});
 bomb.append(element('circle',{cx:0,cy:0,r:2.5}),element('path',{d:'M -1.2 -2.1 Q 0 -3.8 1.3 -2.2'}),element('circle',{cx:1.6,cy:-3.2,r:.55,class:'fuse-spark'}));
 bomb.setAttribute('transform',`translate(${initial.point.x} ${initial.point.y})`);
 ladderSvg.append(group,bomb);
 const duration=8000;let startTime=null;
 function frame(time){
  if(syncLadderCoordinates())geometry=createProgressGeometry(buildOrthogonalPath(start).vertices);
  if(startTime===null)startTime=time;
  const progress=Math.min(1,(time-startTime)/duration),current=progressGeometryAt(geometry,geometry.length*progress);
  const intensity=Math.max(0,(progress-.55)/.45),red=Math.round(245-12*intensity),green=Math.round(184-97*intensity),blue=Math.round(46+41*intensity);
  layers.forEach(layer=>layer.setAttribute('d',current.d));
  group.style.color=`rgb(${red}, ${green}, ${blue})`;
  ladderBoard.style.setProperty('--goal-intensity',intensity.toFixed(2));
  ladderBoard.classList.toggle('near-goal',progress>.55);
  bomb.setAttribute('transform',`translate(${current.point.x} ${current.point.y}) rotate(${Math.sin(progress*50)*5}) scale(${(1+intensity*.28).toFixed(2)})`);
  if(progress<1)animationFrame=requestAnimationFrame(frame);
  else{bomb.remove();createParticipantExplosion(geometry.end);callback(route.winner)}
 }
 animationFrame=requestAnimationFrame(frame);
}
function splitRelatedInfo(){const source=document.querySelector('.related-info');if(!source)return;const paragraphs=[...source.querySelectorAll('p')],extraTexts=['사다리의 결과는 가로 연결선의 배치와 출발 위치가 함께 결정합니다. 모든 경로는 같은 규칙으로 계산되므로 특정 번호가 겉보기 위치만으로 유리하거나 불리해지는 구조는 아닙니다. 다만 결과를 미리 확인하지 않도록 시작 전에 참가자 번호를 정해 두면 게임의 긴장감을 더 오래 유지할 수 있습니다.','인원이 적을 때는 경로가 단순해 보이고, 인원이 많아질수록 가능한 이동 조합이 늘어나 사다리가 복잡해집니다. 화면이 좁은 기기에서는 번호를 무리하게 늘리기보다 한 번에 선을 따라갈 수 있는 인원으로 정하는 편이 좋습니다.','사다리 게임은 조선시대의 제비뽑기나 서양의 제비 추첨처럼 여러 선택지 중 하나를 정하는 놀이와 닮았습니다. 현대의 사다리 타기는 종이에 세로선을 그리고 가로선을 무작위로 연결하는 방식으로 널리 알려졌으며, 결과를 따라가는 과정 자체가 추첨의 재미가 되었습니다.','이 게임은 식사 순서, 간식 담당, 청소 당번처럼 가벼운 결정을 재미있게 정할 때 적합합니다. 금전 손실이 크거나 중요한 의사결정에는 사용하지 말고, 참여자 모두가 규칙과 결과를 받아들일 수 있는 상황에서 이용하세요.'];extraTexts.forEach((text,index)=>{const paragraph=document.createElement('p');paragraph.textContent=text;paragraph.dataset.readingKey=5+index;paragraphs.push(paragraph)});const labels=['게임 방법','사다리의 원리','공정하게 즐기기','모바일·역사 이야기'],groups=[[0,4],[1,5],[2,7],[3,6]],fragment=document.createDocumentFragment();groups.forEach((indexes,index)=>{const detail=document.createElement('details');detail.className='related-info';detail.open=index===0;const summary=document.createElement('summary');summary.textContent=labels[index];const content=document.createElement('div');indexes.forEach(paragraphIndex=>{if(paragraphs[paragraphIndex])content.append(paragraphs[paragraphIndex].cloneNode(true))});detail.append(summary,content);fragment.append(detail)});source.replaceWith(fragment)}
function confetti(){document.querySelectorAll('.confetti').forEach(item=>item.remove());const colors=['#8b5cf6','#f0b429','#ef6688','#4bb7a7','#5b8def','#ffcf4d'];for(let index=0;index<72;index++){const piece=document.createElement('i');piece.className='confetti';piece.style.left=`${Math.random()*100}vw`;piece.style.width=`${6+Math.random()*6}px`;piece.style.height=`${10+Math.random()*10}px`;piece.style.setProperty('--color',colors[index%colors.length]);piece.style.setProperty('--drift',`${(Math.random()-.5)*280}px`);piece.style.setProperty('--rotate',`${Math.random()*180}deg`);piece.style.animationDelay=`${Math.random()*.45}s`;piece.style.animationDuration=`${1.7+Math.random()*.8}s`;document.body.append(piece);setTimeout(()=>piece.remove(),3000)}}
function runCountdown(callback){let count=3;const tick=()=>{if(count===0){ladderBoard.classList.remove('building');ladderCountdown.textContent='START!';ladderCountdown.hidden=false;ladderCountdown.classList.remove('countdown-pop');void ladderCountdown.offsetWidth;ladderCountdown.classList.add('countdown-pop');callback();countdownTimer=setTimeout(()=>{ladderCountdown.hidden=true},450);return}ladderCountdown.textContent=count;ladderCountdown.hidden=false;ladderCountdown.classList.remove('countdown-pop');void ladderCountdown.offsetWidth;ladderCountdown.classList.add('countdown-pop');countdownTimer=setTimeout(tick,700);count--};tick()}
function startGame(){clampPlayers();gameRunning=true;nameSettings.hidden=true;if(animationFrame)cancelAnimationFrame(animationFrame);if(countdownTimer)clearTimeout(countdownTimer);winnerPanel.hidden=true;ladderCountdown.hidden=true;ladderBoard.classList.remove('building','near-goal');ladderBoard.style.removeProperty('--goal-intensity');numberPreview.hidden=true;ladderBoard.hidden=false;makeRungs();targetBottom=Math.floor(Math.random()*players);renderLabels(true);drawLadder();ladderBoard.classList.add('building');startButton.disabled=true;startButton.textContent='준비 중...';gameStatus.textContent='사다리를 만들고 있습니다.';requestAnimationFrame(()=>runCountdown(()=>{startButton.textContent='추첨 중...';gameStatus.textContent='독박이 참가자를 찾아 올라가는 중입니다.';animatePath(targetBottom,winner=>{gameRunning=false;topLabels.children[winner]?.querySelector('.participant')?.classList.add('winner-participant');const hasName=useNames.checked&&Boolean(participantNames[winner]?.trim());winnerNumber.textContent=participantName(winner);winnerPanel.classList.toggle('named-winner',hasName);winnerPanel.querySelector('small').textContent=hasName?nameCopy.namedResult:nameCopy.numberResult;nameSettings.hidden=false;winnerPanel.hidden=false;startButton.disabled=false;startButton.textContent='다시 뽑기';gameStatus.textContent='결과가 나왔습니다.';confetti()})}))}
playerCount.addEventListener('input',syncPlayerInput);playerCount.addEventListener('blur',()=>{clampPlayers();renderNumbers()});window.addEventListener('resize',()=>{if(gameRunning)return;const before=players;syncPlayerInput();if(before!==players){renderNumbers();ladderBoard.hidden=true;numberPreview.hidden=false}else syncLadderCoordinates()});startButton.addEventListener('click',startGame);startButton.addEventListener('click',()=>{playerCount.disabled=true});winnerPanel.addEventListener('animationend',()=>{playerCount.disabled=false});clampPlayers();renderNumbers();splitRelatedInfo();
