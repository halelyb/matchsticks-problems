requirejs.config({
    "paths": {
      "pixijs": "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.1.3/pixi.min"
    },
    shim: {
        'pixijs-grid': ['pixijs'],
        'matchstick': ['pixijs'],
    }
});

const N = 'N';
const S = 'S';
const E = 'E';
const W = 'W';

const puzzle1 = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,'N','E','NE',0,0,0],
  [0,0,'W','W',0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
]

const puzzle2 = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,'N','E','NE',0,0,0],
  [0,0,'S','W',0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
]

var puzzles = [puzzle1, puzzle2];

function invertArray(arr) {
  return arr[0].map((_, colIndex) => arr.map(row => row[colIndex]));
}

require(['game'], function (Game){
	const x = new Game('gameCanvas', 8,8,50);

  
  x.setProblem(invertArray(problem1));
})