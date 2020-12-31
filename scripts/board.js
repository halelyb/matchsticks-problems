class Board {
	constructor(n, m) {
		this.n = n;
		this.m = m;
		this.arr = Array.from(Array(n), () => new Array(m));
	}

	set(arr) {
		const _n = this.n;
		const _m = this.m;
		const _arr = this.arr;

		this.arr = arr.map(col => col.map(row => row));
		this.n = arr.length;
		this.m = arr[0].length;

		if (!this.isLegal()) {
			this.arr = _arr;
			this.n = _n;
			this.m = _m;

			return false;
		} else {
			return true;
		}
	}

	getMatchsticks() {
		var matchsticks = [];
		for (var i = 0; i < this.n; i++) {
			for (var j = 0; j < this.m; j++) {
				if (!!this.arr[i][j]) {
					this.arr[i][j].split('').forEach(m => {
						matchsticks.push({
							x: i,
							y: j,
							direction: m
						});
					});
				}
			}
		}
		return matchsticks;
	}


	addMatchstick(x, y, dir) {
		if (this.isInBounds(x,y) && (!this.arr[x][y] || !this.arr[x][y].includes(dir))) {
			const temp = this.arr[x][y];
			this.arr[x][y] = (!!this.arr[x][y]) ? this.arr[x][y] + dir : dir;

			if (!this.isLegal()) {
				this.arr[x][y] = temp;
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
	}

	removeMatchstick (x,y, dir) {
		this.arr[x][y] = this.arr[x][y].split('').filter(d => d != dir).join('');
	}

	isInBounds(x, y) {
		return 	x >= 0 && x <= (this.n - 1) &&
				y >= 0 && y <= (this.m - 1);
	}

	isLegal() {
		var response = true;

		for (var i = 0; i < this.n; i++) {
			for (var j = 0; j < this.m; j++) {
				this.arr[i][j] && this.arr[i][j].split('').forEach((function (m) {
					switch(m) {
						case 'N':
							if (j > (this.m - 1) || this.includesIfNotEmpty(i,j+1,'S'))
								response = false;
							break;
						case 'S':
							if (j < 1 || this.includesIfNotEmpty(i,j-1,'N'))
								response =  false;
							break;
						case 'E':
							if (i < 1 || this.includesIfNotEmpty(i-1,j,'W'))
								response =  false;
							break;
						case 'W':
							if (i > (this.n - 1) || this.includesIfNotEmpty(i+1,j,'E'))
								response = false;
							break;
					}
				}).bind(this));
			}
		}

		return response;
	}

	includesIfNotEmpty(i, j, d) {
		if (this.arr[i] && this.arr[i][j])
			return this.arr[i][j].includes(d);
		else
			return false;
	}
}
