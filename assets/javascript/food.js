var food = (function(grid) {
	var my = {}, pos = [0,0];

	//my.;


	my.reset = function () {
		grid.set(pos[0]+'-'+pos[1], 'ground');
	};

	my.init = function () {
		my.reset();

		my.move();
	};

	my.move = function () {
		var foodX = Math.floor(Math.random()*(gridXdim-2)+1);
		var foodY = Math.floor(Math.random()*(gridYdim-2)+1);

		//ensure the position is a valid position (so we don't turn part of the snake into food)
		while(document.getElementById(foodX+'-'+foodY).getAttribute('class') != 'ground') {
			foodX = Math.floor(Math.random()*(gridXdim-2)+1);
			foodY = Math.floor(Math.random()*(gridYdim-2)+1);
		}

		//set the position to food
		grid.set(foodX+'-'+foodY, 'food');
		pos[0] = foodX;
		pos[1] = foodY;
	};

	return my;
}(grid));