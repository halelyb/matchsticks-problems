class Matchstick extends PIXI.Graphics {	
	constructor(position, cell, dir, length) {
		super();

		this.direction = dir;
		this.stickLength = length;
		this.cell = cell;

		this.draw(position);
	}
	
	draw(headPosition) {
		const length = this.stickLength;
		const direction = this.direction;
		const headX = headPosition.x;
		const headY = headPosition.y;
		const hitWidth = 4;
		const headLength = length * .1;

		this.lineStyle(4, 0xFF3300, 1);
		this.moveTo(headX, headY);

		switch (direction) {
			case 'N':
				this.lineTo(headX, headY + headLength);
				this.hitArea = new PIXI.Polygon([
					headX + hitWidth / 2, headY,
					headX + hitWidth / 2, headY + length,
					headX - hitWidth / 2, headY + length,
					headX - hitWidth / 2, headY,
				]);
			break;
			case 'S':
				this.lineTo(headX, headY - headLength);
				this.hitArea = new PIXI.Polygon([
					headX + hitWidth / 2, headY,
					headX + hitWidth / 2, headY - length,
					headX - hitWidth / 2, headY - length,
					headX - hitWidth / 2, headY,
				]);
				
			break;
			case 'E':
				this.lineTo(headX - headLength, headY);
				this.hitArea = new PIXI.Polygon([
					headX, headY + hitWidth / 2,
					headX - length, headY + hitWidth / 2,
					headX - length, headY - hitWidth / 2,
					headX, headY - hitWidth / 2,
				]);
			break;
			case 'W':
				this.lineTo(headX + headLength, headY);
				this.hitArea = new PIXI.Polygon([
					headX, headY + hitWidth / 2,
					headX + length, headY + hitWidth / 2,
					headX + length, headY - hitWidth / 2,
					headX, headY - hitWidth / 2,
				]);
			break;
		}

		this.lineStyle(2, 0xcd853f, 1);

		switch (direction) {
			case 'N':
				this.lineTo(headX, headY + length);
				break;
			case 'S':
				this.lineTo(headX, headY - length);
				break;
			case 'E':
				this.lineTo(headX - length, headY);
				break;
			case 'W':
				this.lineTo(headX + length, headY);
				break;
		}		

		return this;
	}

	rotate(degrees) {
		const head = this.getLocalHeadPosition();
		this.pivot.set(head.x, head.y);
		this.angle = degrees;
	}

	moveHeadTo(position, rotation) {
		if (rotation)
	    	this.angle += rotation;

		const head = this.getLocalHeadPosition();
		this.pivot.set(head.x, head.y);
	    this.position.set(position.x, position.y);
	}

	getLocalHeadPosition(bounds) {
		return this.getHeadPosition(this.getLocalBounds());
	}

	getHeadPosition(bounds) {
		if (!bounds)
			bounds = this.getBounds();

		let xFix = 0;
		let yFix = 0;

		switch (this.direction) {
			case 'N':
				xFix = bounds.width / 2;
				break;
			case 'S':
				xFix = bounds.width / 2;
				yFix += this.stickLength;
				break;
			case 'E':
				xFix += this.stickLength;
				yFix = bounds.height / 2;
				break;
			case 'W':
				yFix = bounds.height / 2;
				break;
		}

		return {
			x: bounds.x + xFix, 
			y:bounds.y + yFix
		};
	}
}

Matchstick.directions = ['N', 'E', 'S', 'W'];