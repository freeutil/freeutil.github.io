const $=selector=>document.querySelector(selector);
const playerCount=$('#playerCount'),numberPreview=$('#numberPreview'),startButton=$('#startButton'),ladderBoard=$('#ladderBoard'),topLabels=$('#topLabels'),bottomLabels=$('#bottomLabels'),ladderSvg=$('#ladderSvg'),winnerPanel=$('#winnerPanel'),winnerNumber=$('#winnerNumber'),gameStatus=$('#gameStatus');
const svgNS='http://www.w3.org/2000/svg';let players=4,rungs=[],targetBottom=0,animationFrame=null;
function clampPlayers(){players=Math.max(2,Math.min(20,Math.round(Number(playerCount.value)||4)));playerCount.value=players}
function renderNumbers(){numberPreview.innerHTML=Array.from({length:players},(_,index)=>`<span>${index+1}</span>`).join('');numberPreview.setAttribute('aria-label',`${players}명 번호 미리보기`)}
function renderLabels(){const topHtml=Array.from({length:players},(_,index)=>`<span>${index+1}</span>`).join('');const bottomHtml=Array.from({length:players},(_,index)=>`<span class="${index===targetBottom?'target':''}">${index===targetBottom?'독박':'면제'}</span>`).join('');topLabels.innerHTML=topHtml;bottomLabels.innerHTML=bottomHtml;topLabels.style.setProperty('--players',players);bottomLabels.style.setProperty('--players',players)}
function makeRungs(){
  const rows=Math.max(12,Math.min(22,players+9));
  rungs=[];
  for(let row=0;row<rows;row++){
    const line=[];
    const maxRungs=Math.max(1,Math.floor(players/2));
    const desired=Math.min(maxRungs,1+(Math.random()<.62?1:0)+(players>=8&&Math.random()<.35?1:0));
    const candidates=Array.from({length:players-1},(_,index)=>index).sort(()=>Math.random()-.5);
    for(const col of candidates){
      if(line.every(existing=>Math.abs(existing-col)>1))line.push(col);
      if(line.length>=desired)break;
    }
    line.sort((a,b)=>a-b);
    rungs.push(line);
  }
}
function xFor(column){return(column+.5)*100/players}
function yFor(row){return(row+.5)*100/rungs.length}
function element(name,attrs){const node=document.createElementNS(svgNS,name);Object.entries(attrs).forEach(([key,value])=>node.setAttribute(key,value));return node}
function trace(start){const points=[{x:start,y:0}],rowHeight=100/rungs.length;let current=start;rungs.forEach((line,row)=>{if(line.includes(current)){points.push({x:current+1,y:(row+.5)*rowHeight});current++}else if(line.includes(current-1)){points.push({x:current-1,y:(row+.5)*rowHeight});current--}points.push({x:current,y:(row+1)*rowHeight})});return{points,winner:current}}
function findStartForTarget(){for(let start=0;start<players;start++)if(trace(start).winner===targetBottom)return start;return 0}
function drawLadder(){ladderSvg.innerHTML='';for(let col=0;col<players;col++)ladderSvg.append(element('line',{x1:xFor(col),y1:0,x2:xFor(col),y2:100,class:'ladder-vertical'}));rungs.forEach((line,row)=>line.forEach(col=>ladderSvg.append(element('line',{x1:xFor(col),y1:yFor(row),x2:xFor(col+1),y2:yFor(row),class:'ladder-horizontal'}))));}
function buildOrthogonalPath(start){let current=start;const parts=[`M ${xFor(start)} 0`];rungs.forEach((line,row)=>{parts.push(`V ${yFor(row)}`);if(line.includes(current)){current++;parts.push(`H ${xFor(current)}`)}else if(line.includes(current-1)){current--;parts.push(`H ${xFor(current)}`)}parts.push(`V ${(row+1)*100/rungs.length}`)});return{d:parts.join(' '),winner:current}}
function animatePath(start,callback){const route=buildOrthogonalPath(start),glow=element('path',{class:'ladder-path-glow',d:route.d}),path=element('path',{class:'ladder-path',d:route.d});ladderSvg.append(glow,path);const length=path.getTotalLength();[glow,path].forEach(item=>{item.style.strokeDasharray=length;item.style.strokeDashoffset=length});let progress=0;function frame(){progress+=.0015;const offset=Math.max(0,length*(1-progress));glow.style.strokeDashoffset=offset;path.style.strokeDashoffset=offset;if(progress<1)animationFrame=requestAnimationFrame(frame);else callback(route.winner)}animationFrame=requestAnimationFrame(frame)}
function confetti(){document.querySelectorAll('.confetti').forEach(item=>item.remove());const colors=['#8b5cf6','#f0b429','#ef6688','#4bb7a7','#5b8def','#ffcf4d'];for(let index=0;index<72;index++){const piece=document.createElement('i');piece.className='confetti';piece.style.left=`${Math.random()*100}vw`;piece.style.width=`${6+Math.random()*6}px`;piece.style.height=`${10+Math.random()*10}px`;piece.style.setProperty('--color',colors[index%colors.length]);piece.style.setProperty('--drift',`${(Math.random()-.5)*280}px`);piece.style.setProperty('--rotate',`${Math.random()*180}deg`);piece.style.animationDelay=`${Math.random()*.45}s`;piece.style.animationDuration=`${1.7+Math.random()*.8}s`;document.body.append(piece);setTimeout(()=>piece.remove(),3000)}}
function startGame(){clampPlayers();if(animationFrame)cancelAnimationFrame(animationFrame);winnerPanel.hidden=true;numberPreview.hidden=true;ladderBoard.hidden=false;makeRungs();targetBottom=Math.floor(Math.random()*players);renderLabels();drawLadder();const winner=findStartForTarget();startButton.disabled=true;startButton.textContent='추첨 중...';gameStatus.textContent='사다리를 따라 독박을 찾는 중입니다.';requestAnimationFrame(()=>animatePath(winner,()=>{winnerNumber.textContent=winner+1;winnerPanel.hidden=false;startButton.disabled=false;startButton.textContent='다시 뽑기';gameStatus.textContent='결과가 나왔습니다.';confetti()}))}
playerCount.addEventListener('input',()=>{clampPlayers();renderNumbers()});startButton.addEventListener('click',startGame);startButton.addEventListener('click',()=>{playerCount.disabled=true});winnerPanel.addEventListener('animationend',()=>{playerCount.disabled=false});renderNumbers();
