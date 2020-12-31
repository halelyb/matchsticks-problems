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
  [0,0,'NW','W','W','N',0,0],
  [0,0,'N','NW','N','N',0,0],
  [0,0,'N','W',0,'N',0,0],
  [0,0,'W','W','W',0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
]

const puzzle2 = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,'NW','W',0,0,0],
  [0,0,'NW','N','W',0,0,0],
  [0,0,'W','W','W',0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
]

const puzzle3 = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,'NW','NW','N',0],
  [0,0,'NW','NW','NW','NW',0,0],
  [0,0,'W','W','W',0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
]

const puzzle4 = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,'NW','W','W','N',0,0],
  [0,0,'N','NW','N','N',0,0],
  [0,0,'N','W',0,'N',0,0],
  [0,0,'W','W','W',0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
]

const puzzle5 = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,'NW','NW','NW','N',0,0],
  [0,0,'NW','NW','NW','N',0,0],
  [0,0,'W',0,'W',0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
]

const puzzle6 = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,'NW','NW','N',0,0],
  [0,0,0,'NW','NW','N',0,0],
  [0,0,0,'W','W',0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
]

const puzzle7 = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,'N','N',0,0,0],
  [0,0,'W','NW','NW',0,0,0],
  [0,0,'W','NW','NW',0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
]

const puzzle8 = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,'NW','NW','N',0,0],
  [0,0,0,'NW','NW','N',0,0],
  [0,0,0,'W','W',0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
]

const puzzle9 = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,'NW','W','NW','N',0,0],
  [0,0,'W','NW','N','N',0,0],
  [0,0,0,'N','NW',0,0,0],
  [0,0,0,'W',0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
]

const puzzle10 = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,'NW','NW','NW','N',0,0],
  [0,0,'NW','NW','NW','N',0,0],
  [0,0,'W',0,'W',0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  ]

const puzzle11 = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,'NW','N',0,0],
  [0,0,0,0,'NW','N',0,0],
  [0,0,0,'NW','NW','N',0,0],
  [0,0,0,'NW','NW',0,0,0],
  [0,0,0,'W',0,0,0,0],
  [0,0,0,0,0,0,0,0],
]

const puzzle12 = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,'NW','N',0,0,0],
  [0,0,'NW','NW','NW','N',0,0],
  [0,0,'W','NW','NW',0,0,0],
  [0,0,0,'W',0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
]

var puzzles = [
  {
    arr: invertArray(puzzle1),
    prompt: 'Move 4 matches to create 3 squares',
  }, 
  { 
    arr: invertArray(puzzle2),
    prompt: 'Move 3 matches to create 2 squares',
  },
  {
    arr: invertArray(puzzle3),
    prompt: 'Move 2 matches to create 4 squares',
  }, 
  { 
    arr: invertArray(puzzle4),
    prompt: 'Move 3 matches to create 3 squares',
  },
  {
    arr: invertArray(puzzle5),
    prompt: 'Move 3 matches to create 4 squares',
  }, 
  { 
    arr: invertArray(puzzle6),
    prompt: 'Move 3 matches to create 3 squares',
  },
  {
    arr: invertArray(puzzle7),
    prompt: 'Move 3 matches to create 3 squares',
  }, 
  { 
    arr: invertArray(puzzle8),
    prompt: 'Move 4 matches to create 3 squares',
  },
  {
    arr: invertArray(puzzle9),
    prompt: 'Move 3 matches to create 6 squares',
  }, 
  { 
    arr: invertArray(puzzle10),
    prompt: 'Move 1 match to create 6 squares',
  },
  { 
    arr: invertArray(puzzle11),
    prompt: 'Move 2 matches to create 4 squares',
  },
  {
    arr: invertArray(puzzle12),
    prompt: 'Move 3 matches to create 4 squares',
  }
];

function invertArray(arr) {
  return arr[0].map((_, colIndex) => arr.map(row => row[colIndex]));
}

require(['game'], function (Game){
	const x = new Game('gameCanvas');

  function startPuzzle(p) {
    Array.from(document.getElementById("puzzle-links").children).forEach(l => {
      l.classList.remove('selected');
    });

    document.getElementById('puzzle-' + p.id + '-link').classList.add('selected');
    document.getElementById("promptContainer").innerHTML = p.prompt;
    x.setProblem(p.arr);
  }

  puzzles.forEach((p, i) => {
    var links = document.getElementById("puzzle-links");
    p.id = i+1;

    var link = document.createElement("a");
    link.id = 'puzzle-' + p.id + '-link';
    link.href = "#";
    link.appendChild(document.createTextNode("Puzzle " + p.id))
    link.onclick = function() {
      startPuzzle(p);
    };
  links.appendChild(link);
  });
  
  startPuzzle(puzzles[0]);
})