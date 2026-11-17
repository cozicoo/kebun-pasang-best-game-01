import { LEVELS, endpointPosition } from './levels.js';
import { createRuntime } from './runtime.js';
const $ = id => document.getElementById(id);
const board = $('board');
const cells = new Map();
let opened = false;
const sideNames = { U:'atas', R:'kanan', D:'bawah', L:'kiri' };
const points = { U:'50 0', R:'100 50', D:'50 100', L:'0 50' };
// Local procedural botanical drawing. Both forms share a stem and paired leaves;
// the existing bloom class switches silhouettes without changing game state.
const flowerDrawing = `<svg class="plant" viewBox="0 0 40 48" aria-hidden="true">
  <ellipse class="plant-soil" cx="20" cy="44" rx="11" ry="3"/>
  <path class="stem" d="M20 44 Q23 32 20 20"/>
  <path class="leaf" d="M21 37 Q9 38 8 29 Q18 28 21 37 Z M22 32 Q32 32 34 24 Q24 24 22 32 Z"/>
  <g class="bud"><path d="M20 6 C8 13 12 24 20 24 C28 24 32 13 20 6 Z"/><path class="bud-seam" d="M20 9 Q23 17 20 22"/></g>
  <g class="petals">${Array.from({ length:6 }, (_,i) => `<ellipse cx="20" cy="8" rx="5" ry="8" transform="rotate(${i*60} 20 17)"/>`).join('')}<circle class="pollen" cx="20" cy="17" r="5"/></g>
</svg>`;
const phases = { planning:'Perencanaan', flowing:'Mengalir', lost:'Gagal', won:'Semua mekar' };
const reasons = { inlet:'Celah masuk tidak tersambung.', stone:'Air menabrak batu.', boundary:'Air keluar dari tepi yang salah.', loop:'Air kembali ke saluran lama.', flowers:'Masih ada bunga yang belum dilewati.' };
const runtime = createRuntime(LEVELS, render);
function buildBoard() {
  board.replaceChildren(); cells.clear();
  const state = runtime.getState();
  const level=LEVELS[runtime.getIndex()];
  const garden=board.parentElement;
  garden.style.setProperty('--columns',level.width);
  garden.style.setProperty('--rows',level.height);
  garden.style.setProperty('--bank-top',[level.inlet.side,level.outlet.side].includes('U')?'var(--bank-size)':'0px');
  garden.style.setProperty('--bank-bottom',[level.inlet.side,level.outlet.side].includes('D')?'var(--bank-size)':'0px');
  board.setAttribute('aria-label',`Papan ${level.width} kali ${level.height}; koordinat kolom, baris`);
  for(const [kind,endpoint] of [['inlet',level.inlet],['outlet',level.outlet]]) {
    const node=garden.querySelector(`.${kind}`), position=endpointPosition(level,endpoint);
    node.style.gridColumn=position.column; node.style.gridRow=position.row;
    node.classList.toggle('vertical',position.vertical);
    node.style.setProperty('--bank-rotation',`${position.rotation}deg`);
    // Correct track-center offsets for board border/padding and inter-tile gaps.
    const f=position.fraction;
    const offset=`calc(${1-2*f} * var(--rim) + ${f-.5} * var(--gap))`;
    node.style.translate=position.vertical?`${offset} 0`:`0 ${offset}`;
    const arrow=(kind==='inlet'?{L:'→',R:'←',U:'↓',D:'↑'}:{L:'←',R:'→',U:'↑',D:'↓'})[endpoint.side];
    node.querySelector('span').textContent=`${kind==='inlet'?'Masuk':'Muara'} ${arrow}`;
    node.setAttribute('aria-label',`${kind==='inlet'?'Masuk':'Muara'} (${endpoint.cell}), sisi ${sideNames[endpoint.side]}`);
  }
  for (let row=1; row<=level.height; row++) for (let col=1; col<=level.width; col++) {
    const key = `${col},${row}`;
    const tile = Boolean(state.tiles[key]);
    const node = document.createElement(tile ? 'button' : 'div');
    node.className = tile ? 'tile' : 'rock';
    if (tile) {
      node.type = 'button'; node.dataset.key = key;
      node.addEventListener('click', () => runtime.rotate(key));
    } else { node.setAttribute('role', 'img'); node.setAttribute('aria-label', `Batu (${key})`); }
    cells.set(key,node); board.append(node);
  }
}
function render(state, level, index) {
  $('level-title').textContent = level.name;
  $('level-number').textContent = `${level.kind==='challenge'?'Tantangan':'Tutorial'} · Kebun ${index+1} / ${LEVELS.length}`;
  $('moves').textContent = `Jatah putar: ${state.remaining} / ${level.budget}`;
  $('flowers').textContent = `Bunga: ${state.bloomed.length} / ${level.flowers.length}`;
  $('phase').textContent = phases[state.phase];
  $('hint').textContent = level.hint;
  $('endpoints').textContent=`Masuk (${level.inlet.cell}) dari ${sideNames[level.inlet.side]}; muara (${level.outlet.cell}) ke ${sideNames[level.outlet.side]}.`;
  $('undo').disabled = state.phase !== 'planning' || !state.history.length;
  $('flow').disabled = state.phase !== 'planning';
  $('next').hidden = state.phase !== 'won';
  $('next').textContent = index === LEVELS.length-1 ? 'Main lagi dari awal' : 'Kebun berikutnya';
  $('status').textContent = state.phase === 'won' ? 'Kebun mekar! Air sampai di muara. Lanjutkan atau ulangi.'
    : state.phase === 'lost' ? `${reasons[state.reason]} Ulangi untuk mencoba lagi.`
    : state.phase === 'flowing' ? `Air mengalir. ${state.visited.length} petak telah dilewati.`
    : state.remaining === 0 ? 'Jatah habis. Alirkan, urungkan, atau ulangi tetap tersedia.'
    : 'Rencanakan jalur dari masuk ke muara. Klik saluran untuk memutar.';
  for (const [key,node] of cells) {
    const openings = state.tiles[key];
    node.classList.toggle('fault', state.fault === key);
    if (!openings) continue;
    const wet = state.visited.includes(key), bloom = state.bloomed.includes(key);
    const flower = level.flowers.includes(key);
    node.classList.toggle('wet', wet); node.classList.toggle('bloom', bloom);
    node.setAttribute('aria-disabled', String(state.phase !== 'planning' || state.remaining === 0));
    node.setAttribute('aria-label', `Saluran (${key}), ${[...openings].map(s=>sideNames[s]).join(' dan ')}${flower ? bloom ? ', bunga mekar' : ', bunga kuncup' : ''}${wet ? ', dilalui air' : ''}`);
    // All interpolated values come from local fixed level data / integer coordinates.
    const path = `M ${points[openings[0]]} L 50 50 L ${points[openings[1]]}`;
    node.innerHTML = `<svg class="pipe" viewBox="0 0 100 100" aria-hidden="true"><path class="channel" d="${path}"/><path class="waterway" d="${path}"/></svg><span class="coord" aria-hidden="true">${key}</span>${flower ? flowerDrawing : ''}`;
  }
}
function refresh() { render(runtime.getState(), LEVELS[runtime.getIndex()], runtime.getIndex()); }
function restart() { runtime.restart(); }
$('start').addEventListener('click', () => {
  opened = true; $('intro').hidden = true; $('play').hidden = false;
  buildBoard(); refresh(); cells.get(LEVELS[runtime.getIndex()].inlet.cell).focus();
});
$('restart').addEventListener('click', restart);
$('undo').addEventListener('click', () => runtime.undo());
$('flow').addEventListener('click', () => runtime.flow());
$('next').addEventListener('click', () => {
  runtime.next(); buildBoard(); refresh(); cells.get(LEVELS[runtime.getIndex()].inlet.cell).focus();
});
document.addEventListener('keydown', event => {
  if (!opened || event.ctrlKey || event.altKey || event.metaKey || event.repeat) return;
  if (event.key.toLowerCase() === 'r') { event.preventDefault(); restart(); return; }
  // Enter on a control retains its native button action; elsewhere it starts flow.
  if (event.key === 'Enter' && (!event.target.closest('button,summary') || event.target.dataset.key)) {
    event.preventDefault(); runtime.flow(); return;
  }
  const direction = { ArrowUp:[0,-1], ArrowRight:[1,0], ArrowDown:[0,1], ArrowLeft:[-1,0] }[event.key];
  const key = event.target.dataset.key;
  if (!direction || !key) return;
  event.preventDefault();
  let [x,y] = key.split(',').map(Number);
  const level=LEVELS[runtime.getIndex()];
  for (let i=0;i<Math.max(level.width,level.height);i++) {
    x += direction[0]; y += direction[1];
    if (x<1 || x>level.width || y<1 || y>level.height) break;
    const target = cells.get(`${x},${y}`);
    if (target.dataset.key) { target.focus(); break; }
  }
});
