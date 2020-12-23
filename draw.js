function getMaxMultiplyOf(a, n) {
  return a * Math.floor(n/a);
}

function onDragStart(event) {
    //console.log('onDragStart');

    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.dragDropData = event.data;

    // fix to positin issue from here:
    // https://stackoverflow.com/questions/31786906/pixi-js-images-jump-when-dragged
    //store this variable for convenience           
    let position = this.dragDropData.getLocalPosition(this);

    // Set the pivot point to the new position
    this.pivot.set(position.x, position.y)

    // update the new position of the sprite to the position obtained through 
    // the global data. This ensures the position lines up with the location of 
    // the mouse on the screen. I'm not certain why, but this is necessary. 
    this.position.set(this.dragDropData.global.x, this.dragDropData.global.y)

    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd() {
    //console.log('onDragEnd');
    
    var cell = grid.getCellCoordinates(this.position.x, this.position.y);
    var p = grid.getRealCoordinates(cell.x, cell.y);

    const localBounds = this.getLocalBounds();
    this.pivot.set(localBounds.x, localBounds.y);
    this.position.set(p.x, p.y);

    this.alpha = 1;

    this.dragging = false;

    // set the interaction data to null
    this.dragDropData = null;
}

function onDragMove() {
    if (this.dragging)
    {
        var newPosition = this.dragDropData.getLocalPosition(this.parent);
        this.position.x = newPosition.x;
        this.position.y = newPosition.y;
    }
}

function drawGrid(stage, x, y, gridColor=0xffffff, drawEdges=true, cellSize=50) {
  //const app = new PIXI.Application();
  
  
  const lineWidth = 1;
  const gridWidth = getMaxMultiplyOf(cellSize, 800 * .5);
  const grid = new PixiJSGrid(gridWidth, cellSize, { color: gridColor, width: lineWidth }, false, drawEdges);

  grid.x = x; // (stage.view.width / 2) - (grid.gridWidth / 2);
  grid.y = y; //(stage.view.height / 2) - (grid.gridWidth / 2);
  stage.addChild(grid.drawGrid());

  return grid;
}

function drawMatchstick (stage, headX, headY, length, direction) {
  const matchstick = new PIXI.Graphics();

  const hitWidth = 4;
  matchstick.lineStyle(4, 0xFF3300, 1);
  
  matchstick.moveTo(headX, headY);

  const headLength = length * .1;
  const bodyLength = length - headLength;

  switch (direction) {
    case 'N':
      matchstick.lineTo(headX, headY - headLength);
      matchstick.hitArea = new PIXI.Polygon([
        headX + hitWidth / 2, headY,
        headX + hitWidth / 2, headY - length,
        headX - hitWidth / 2, headY - length,
        headX - hitWidth / 2, headY,
      ]);
      break;
    case 'S':
      matchstick.lineTo(headX, headY + headLength);

      matchstick.hitArea = new PIXI.Polygon([
        headX + hitWidth / 2, headY,
        headX + hitWidth / 2, headY + length,
        headX - hitWidth / 2, headY + length,
        headX - hitWidth / 2, headY,
      ]);
      break;
    case 'E':
      matchstick.lineTo(headX + headLength, headY);
      matchstick.hitArea = new PIXI.Polygon([
        headX, headY + hitWidth / 2,
        headX + length, headY + hitWidth / 2,
        headX + length, headY - hitWidth / 2,
        headX, headY - hitWidth / 2,
      ]);
      break;
    case 'W':
      matchstick.lineTo(headX - headLength, headY);
      matchstick.hitArea = new PIXI.Polygon([
        headX, headY + hitWidth / 2,
        headX - length, headY + hitWidth / 2,
        headX - length, headY - hitWidth / 2,
        headX, headY - hitWidth / 2,
      ]);
      break;

  }

  matchstick.lineStyle(2, 0xFFDEAD, 1);

  switch (direction) {
    case 'N':
      matchstick.lineTo(headX, headY - length);
      break;
    case 'S':
      matchstick.lineTo(headX, headY + length);
      break;
    case 'E':
      matchstick.lineTo(headX + length, headY);
      break;
    case 'W':
      matchstick.lineTo(headX - length, headY);
      break;
  }

  matchstick.interactive = true;
  matchstick.buttonMode = true;
  
  stage.addChild(matchstick);

  matchstick
    .on('mousedown', onDragStart)
    .on('touchstart', onDragStart)
    .on('mouseup', onDragEnd)
    .on('mouseupoutside', onDragEnd)
    .on('touchend', onDragEnd)
    .on('touchendoutside', onDragEnd)
    .on('mousemove', onDragMove)
    .on('touchmove', onDragMove);

}

//var renderer = PIXI.autoDetectRenderer(800, 600);
var stage = new PIXI.Container(0x97c56e, true);
var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.view);
//app.view.height = window.innerHeight * .5;
//app.view.width = window.innerWidth * .5;
//document.querySelector('.container').appendChild(app.view);

// create the root of the scene graph
//var stage = new PIXI.Container();
//stage.interactive =true;

const grid = drawGrid(stage, 20, 20, 0x0000FF);

const { x, y } = grid.getRealCoordinates(0,0);
drawMatchstick(stage, x, y, grid.cellSize, 'S');
drawMatchstick(stage, x, y, grid.cellSize, 'E');

var p = grid.getRealCoordinates(1,0);
drawMatchstick(stage, p.x, p.y, grid.cellSize, 'S');
drawMatchstick(stage, p.x, p.y, grid.cellSize, 'E');

// run the render loop
function animate() {

    renderer.render(stage);
    requestAnimationFrame( animate );
}
requestAnimationFrame(animate);




