// Pure transitions: no DOM, clock, randomness, I/O, or mutation of input state.
const CLOCKWISE = { U: 'R', R: 'D', D: 'L', L: 'U' };
const OPPOSITE = { U: 'D', R: 'L', D: 'U', L: 'R' };
const DELTA = { U: [0, -1], R: [1, 0], D: [0, 1], L: [-1, 0] };
export const rotateOpenings = openings => [...openings].map(side => CLOCKWISE[side]).join('');
export function validateLevel(level) {
  if(!Number.isInteger(level.width) || !Number.isInteger(level.height) || level.width<1 || level.height<1)
    throw new Error('Invalid board dimensions');
  if(!Number.isSafeInteger(level.budget) || level.budget<0) throw new Error('Invalid rotation budget');
  const inside = key => {
    if(typeof key!=='string' || !/^[1-9]\d*,[1-9]\d*$/.test(key)) return false;
    const [x,y]=key.split(',').map(Number);
    return x<=level.width && y<=level.height;
  };
  for(const [key,openings] of Object.entries(level.tiles)) {
    if(!inside(key) || typeof openings!=='string' || !/^[URDL]{2}$/.test(openings)
      || openings[0]===openings[1]) throw new Error('Invalid tile');
  }
  for(const endpoint of [level.inlet,level.outlet]) {
    if(!endpoint || !inside(endpoint.cell) || !DELTA[endpoint.side] || !level.tiles[endpoint.cell])
      throw new Error('Invalid endpoint');
    const [x,y]=endpoint.cell.split(',').map(Number), [dx,dy]=DELTA[endpoint.side];
    if(x+dx>=1 && x+dx<=level.width && y+dy>=1 && y+dy<=level.height)
      throw new Error('Endpoint must face boundary');
  }
  if(!Array.isArray(level.flowers) || new Set(level.flowers).size!==level.flowers.length
    || level.flowers.some(key=>!inside(key) || !level.tiles[key])) throw new Error('Invalid flowers');
}
export function createState(level) {
  validateLevel(level);
  return {
    phase: 'planning', tiles: { ...level.tiles }, remaining: level.budget,
    history: [], visited: [], bloomed: [], cursor: level.inlet.cell, inlet: level.inlet.side, reason: '', fault: null,
  };
}
export function rotate(state, key) {
  if (state.phase !== 'planning' || state.remaining <= 0 || !Object.hasOwn(state.tiles,key)) return state;
  return { ...state, tiles: { ...state.tiles, [key]: rotateOpenings(state.tiles[key]) },
    remaining: state.remaining - 1, history: [...state.history, { key, openings: state.tiles[key] }] };
}
export function undo(state) {
  if (state.phase !== 'planning' || !state.history.length) return state;
  const last = state.history.at(-1);
  return { ...state, tiles: { ...state.tiles, [last.key]: last.openings },
    remaining: state.remaining + 1, history: state.history.slice(0, -1) };
}
export function startFlow(state) {
  return state.phase === 'planning' ? { ...state, phase: 'flowing' } : state;
}
const lose = (state, reason, fault = state.cursor) => ({ ...state, phase: 'lost', reason, fault });
export function stepFlow(state, level) {
  if (state.phase !== 'flowing') return state;
  const key = state.cursor;
  const [x, y] = key.split(',').map(Number);
  if (!Number.isInteger(x) || !Number.isInteger(y) || x < 1 || x > level.width || y < 1 || y > level.height) return lose(state, 'boundary');
  if (state.visited.includes(key)) return lose(state, 'loop');
  const openings = state.tiles[key];
  if (!openings) return lose(state, 'stone');
  if (!openings.includes(state.inlet)) return lose(state, 'inlet');
  const outlet = [...openings].find(side => side !== state.inlet);
  const visited = [...state.visited, key];
  const bloomed = level.flowers.includes(key) ? [...state.bloomed, key] : state.bloomed;
  const next = { ...state, visited, bloomed };
  if (key === level.outlet.cell && outlet === level.outlet.side) {
    return level.flowers.every(flower => bloomed.includes(flower))
      ? { ...next, phase: 'won' } : lose(next, 'flowers');
  }
  const [dx, dy] = DELTA[outlet];
  const nx = x + dx, ny = y + dy;
  const target = `${nx},${ny}`;
  if (nx < 1 || nx > level.width || ny < 1 || ny > level.height) return lose(next, 'boundary', target);
  // Next inlet is checked on the next deterministic cell step.
  return { ...next, cursor: target, inlet: OPPOSITE[outlet] };
}
