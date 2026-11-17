// Coordinates use column,row; omitted cells are permanent stones.
const level = (name, budget, tiles, flowers, hint, width=3, height=3, kind='tutorial') => Object.freeze({
  name, budget, width, height, kind,
  inlet:Object.freeze({cell:'1,2',side:'L'}),
  outlet:Object.freeze({cell:`${width},2`,side:'R'}),
  tiles: Object.freeze(tiles), flowers: Object.freeze(flowers), hint,
});
const challenge = (name,budget,rows,flowers) => level(name,budget,
  Object.fromEntries(rows.flatMap((row,y)=>row.split(' ').map((tile,x)=>[`${x+1},${y+1}`,tile]))),
  flowers,'Amati pilihan saluran. Lewati semua bunga sebelum menuju muara.',4,4,'challenge');

// Grid positions around the board, including top/bottom bank tracks. Pure UI metadata.
export function endpointPosition(level, endpoint) {
  const [x,y]=endpoint.cell.split(',').map(Number), side=endpoint.side;
  const vertical=side==='U' || side==='D';
  return {
    column:side==='L'?1:side==='R'?level.width+2:x+1,
    row:side==='U'?1:side==='D'?level.height+2:y+1,
    vertical, fraction:vertical?(x-.5)/level.width:(y-.5)/level.height,
    rotation:{L:0,R:180,U:90,D:-90}[side],
  };
}
export const LEVELS = Object.freeze([
  level('Saluran pertama', 1, { '1,2': 'LR', '2,2': 'UD', '3,2': 'LR' },
    ['2,2'], 'Putar saluran tengah satu kali agar air melintas dari kiri ke kanan.'),
  level('Belokan pucuk', 2, {
    '1,2': 'LD', '1,1': 'DR', '2,1': 'LD', '2,2': 'LU', '3,2': 'LR',
  }, ['1,1', '2,2'], 'Lewati bunga di kiri atas, lalu kembali ke tengah.'),
  level('Pasang berkelok', 3, {
    '1,2': 'LD', '1,3': 'LU', '2,3': 'LU', '2,2': 'LR',
    '2,1': 'DR', '3,1': 'RD', '3,2': 'UR',
  }, ['1,3', '2,1', '3,2'], 'Dari bawah ke pucuk, lalu turun menuju muara.'),
  // Certified offline; reference evidence stays under tests/, never loaded by browser.
  challenge('Rumpun muara',6,[
    'RD RD UR UD','DL UD UR LR','RD UR UR UD','LU DL LU DL',
  ],['2,1','2,2']),
  challenge('Liku bakau',7,[
    'DL DL RD DL','LU RD UR RD','UR LU LU DL','DL UR DL RD',
  ],['2,2','2,3']),
  challenge('Taman selat',8,[
    'UR DL DL DL','DL UR LU RD','LU LU LU RD','UR DL UR DL',
  ],['2,2','3,2','3,3','4,3']),
  challenge('Pasang rimbun',9,[
    'LU UR RD RD','LR DL LR RD','DL RD DL UR','LR UD RD DL',
  ],['2,2','3,1','3,2']),
]);
