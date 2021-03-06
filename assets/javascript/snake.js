//Snake
var snake = {
	//dir -> 0,1,2,3 = left, up, right, down
	dir : 0,
	//starting length of the snake
	len : 5,
	body : [],
	reset : function() {
		for(var i = this.body.pop(); i != null; i = this.body.pop()) {
			grid.set(i[0]+'-'+i[1], 'ground');
		}
		this.len = 5;
		this.dir = 0;
	},
	init : function() {
		this.reset();

		//find random and fair placing (not too close to an edge)
		var Xrange = (gridXdim-10)/2+1;
		var Yrange = gridYdim/2+1;
		var firstX = Math.floor((Math.random()*Xrange) + Xrange/2);
		var firstY = Math.floor((Math.random()*Yrange) + Yrange/2);

		//setup body
		for( iter = 0; iter < this.len; iter++) {
			this.body.push([firstX + iter, firstY]);
			grid.set((firstX+iter)+'-'+firstY, 'snake');
		}
	},
	isColliding : function() {
		var newLoc;
		//find the next grid member to be a snake
		switch(this.dir) {
			case 0:
				newLoc = [this.body[0][0] - 1, this.body[0][1]];
				break;
			case 1:
				newLoc = [this.body[0][0], this.body[0][1] - 1];
				break;
			case 2:
				newLoc = [this.body[0][0] + 1, this.body[0][1]];
				break;
			case 3:
				newLoc = [this.body[0][0], this.body[0][1] + 1];
				break;
			default:
				console.log('illegal direction');
		}
		//test if new position is out of bounds
		if(newLoc[0] < 0 || newLoc[0] >= gridXdim || newLoc[1] < 0 || newLoc[1] >= gridYdim) {
			return null;
		}

		var newLocClass = document.getElementById(newLoc[0]+'-'+newLoc[1]).getAttribute('class');
		
		if(newLocClass == 'snake') {
			return null;
		}

		return [newLoc,newLocClass];
	},
	update : function() {
		var newLoc = this.isColliding();
		//var newLoc = Snake.prototype.isColliding.apply(this);

		if(newLoc == null) {
			stop();
			return;
		}
		
		if(newLoc[1] != 'food') {
			//did not eat food, move normally
			var tail = this.body.pop();
			grid.set(tail[0]+'-'+tail[1], 'ground');
		} else {
			//ate food -> increase speed, and make another food
			speed = Math.floor(9/10*speed);
			food.move();
			score++;
			document.getElementById('score').innerHTML = score;
		}

		//set new position
		grid.set(newLoc[0][0]+'-'+newLoc[0][1], 'snake');
		this.body.unshift([newLoc[0][0], newLoc[0][1]]);

		//call another update
		gameTimer = setTimeout(update, speed);
	}
};

//called at intervals to update game
function update() {
	snake.update();
}