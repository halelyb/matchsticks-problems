define(['pixijs-grid', 'matchstick', 'board'], function() {
	class Game {
		constructor(canvasElementId) {
			this.board = new Board(8,8);
			this.gameCanvas = document.getElementById(canvasElementId);

			this.renderer = PIXI.autoDetectRenderer({
				height: this.gameCanvas.clientHeight,
				width: this.gameCanvas.clientWidth,
				view: this.gameCanvas 
			});

			this.renderer.backgroundColor = 0xFFFFFF;
		}

		setProblem(arr) {
			this.board.set(arr);

			if (this.stage)
				this.stage.destroy();

			this.start(this.board.n, this.board.m);

			this.board.getMatchsticks().forEach(mData => {
				this.drawMatchstick(mData.x, mData.y, mData.direction);
			});
		}

		start(n, m) {			
			const stage = new PIXI.Container();

			var cellSize = Math.min(this.renderer.width / (n+1), this.renderer.height / (m+1));

			const gridWidth = Math.max(n,m) * cellSize;
			const lineWidth = 1;
			const gridColor = 0x7291c8;
			this.grid = new PixiJSGrid(
				gridWidth, 
				cellSize, 
				{ 
					color: gridColor, 
					width: lineWidth 
				}, 
				false, // normalize grid size
				false); // draw edges
			

			this.grid.x = (this.renderer.width - this.grid.gridWidth) / 2;
			this.grid.y = (this.renderer.height - this.grid.gridWidth) / 2;

			stage.addChild(this.grid.drawGrid());

			this.stage = stage;

			// run the render loop	
			if (!this.animationStarted) {		
				this.animate();
				this.animationStarted = true;
			}
		}

		animate() {
		    this.renderer.render(this.stage);
		    requestAnimationFrame( (this.animate).bind(this) );
		}

		addMatchstick(cellX, cellY, direction) {
			if (!this.board.addMatchstick(cellX, cellY, direction))
				return false;

			return this.drawMatchstick(cellX, cellY, direction);
		}

		drawMatchstick(cellX, cellY, direction) {
			var position = this.grid.getRealCoordinates(cellX,cellY);
			var matchstick = new Matchstick(position, { x: cellX, y: cellY }, direction, this.grid.cellSize);
			this.configureDragAndDrop(matchstick);
			this.stage.addChild(matchstick);
			return matchstick;
		}

		configureDragAndDrop(matchstick) {
			matchstick.interactive = true;
  			matchstick.buttonMode = true;
  			
  			matchstick.game = this;
  			matchstick.grid = this.grid;
  			matchstick.board = this.board;
  			matchstick.stage = this.stage;

			matchstick
			    .on('mousedown', this.onDragStart)
			    .on('touchstart', this.onDragStart)
			    .on('mouseup', this.onDragEnd)
			    .on('mouseupoutside', this.onDragEnd)
			    .on('touchend', this.onDragEnd)
			    .on('touchendoutside', this.onDragEnd)
			    .on('mousemove', this.onDragMove)
			    .on('touchmove', this.onDragMove);		    
		}

		deleteMatchstick(matchstick) {
			var cellX = matchstick.cell.x;
			var cellY = matchstick.cell.y;

			this.board.removeMatchstick(cellX, cellY, matchstick.direction);

			this.stage.removeChild(matchstick);
			matchstick.clear();
			matchstick.destroy();
		}

		onDragStart(event) {
			this.positionBeforeDrag = this.getHeadPosition();	    
			this.board.removeMatchstick(this.cell.x, this.cell.y, this.direction);

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

		onDragEnd() {
			var head = this.getHeadPosition();

	        var cell = this.grid.getCellCoordinates(head.x, head.y);
	        cell.x = Math.max(Math.min(cell.x, this.board.n), 0);
	        cell.y = Math.max(Math.min(cell.y, this.board.m), 0);

			var p = this.grid.getRealCoordinates(cell.x, cell.y);

			var realtivePositionInCell = {
				x: (head.x - p.x) / this.grid.cellSize,
				y: (head.y - p.y) / this.grid.cellSize
			}			

			const originalCell = this.cell;			

			switch (this.direction) {
				case 'N':
					if (realtivePositionInCell.x > Game.headAccuracy && realtivePositionInCell.x < (1 - Game.headAccuracy)) {
						this.game.deleteMatchstick(this);
						if (this.game.addMatchstick(cell.x + 1, cell.y + 1, 'E'))
							return;
						else
							return this.game.addMatchstick(originalCell.x, originalCell.y, 'N')
					}
					break;
				case 'S':
					if (realtivePositionInCell.x > Game.headAccuracy && realtivePositionInCell.x < (1 - Game.headAccuracy)) {
						this.game.deleteMatchstick(this);
						if (this.game.addMatchstick(cell.x, cell.y, 'W'))
							return;
						else
							return this.game.addMatchstick(originalCell.x, originalCell.y, 'S')
					}
					break;
				case 'E':
					if (realtivePositionInCell.y > Game.headAccuracy && realtivePositionInCell.y < (1 - Game.headAccuracy)) {
						this.game.deleteMatchstick(this);
						if (this.game.addMatchstick(cell.x, cell.y + 1, 'S'))
							return;
						else
							return this.game.addMatchstick(originalCell.x, originalCell.y, 'E')
					}
					break;
				case 'W':
					if (realtivePositionInCell.y > Game.headAccuracy && realtivePositionInCell.y < (1 - Game.headAccuracy)) {
						this.game.deleteMatchstick(this);
						if (this.game.addMatchstick(cell.x + 1, cell.y, 'N'))
							return;
						else
							return this.game.addMatchstick(originalCell.x, originalCell.y, 'W')

					}
					break;
			}

			if (cell.x < (this.board.n - 1) && realtivePositionInCell.x > (1 - Game.headAccuracy))
				cell.x += 1;
			if (cell.y < (this.board.m - 1) && realtivePositionInCell.y > (1 - Game.headAccuracy))
				cell.y += 1;

	        if (this.board.addMatchstick(cell.x, cell.y, this.direction)) {
				this.cell = cell;

				p = this.grid.getRealCoordinates(cell.x, cell.y);
			} else {
				p = this.positionBeforeDrag;
			}

			this.moveHeadTo(p);

			this.alpha = 1;

			this.dragging = false;

			// set the interaction data to null
			this.dragDropData = null;
		}

		onDragMove() {
		    if (this.dragging)
		    {
		        var newPosition = this.dragDropData.getLocalPosition(this.parent);
		        this.position.x = newPosition.x;
		        this.position.y = newPosition.y;
		    }
		}
	}	

	Game.headAccuracy = 0.2;

	return Game;
});