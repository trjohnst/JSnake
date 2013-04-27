var food = {
	pos : [0,0],
	reset : function() {
		grid.set(this.pos[0]+'-'+this.pos[1], 'ground');
	},
	init : function() {
		this.reset();

		this.move();
	},
	move : function() {
		//choose a position
		var foodX = Math.floor(Math.random()*gridXdim);
		var foodY = Math.floor(Math.random()*gridYdim);

		//ensure the position is a valid position (so we don't turn part of the snake into food)
		while(document.getElementById(foodX+'-'+foodY).getAttribute('class') != 'ground') {
			foodX = Math.floor(Math.random()*gridXdim);
			foodY = Math.floor(Math.random()*gridYdim);
		}

		//set the position to food
		grid.set(foodX+'-'+foodY, 'food');
		this.pos[0] = foodX;
		this.pos[1] = foodY;
	}
}