//dimensions of grid
var gridXdim = 32;
var gridYdim = 20;
//game speed
var speed = 400;


var scoreEl;
var timeEl;
var gridEl;
var score = 0;
var gameTimer;
var playTimer;
var timeBegun;
var timeElapsed;
var totalTime = 0;
var grid = {
	element: null,
	init: function() {
		this.element = document.getElementById('grid');
		var row;
		var col;
		for( y = 0; y < gridYdim; y++) {
			row = document.createElement('tr');
			this.element.appendChild(row);
			for( x = 0; x < gridXdim; x++) {
				col = document.createElement('td');
				col.setAttribute("id", x+"-"+y);
				col.setAttribute("class", 'ground');
				row.appendChild(col);
			}
		}
	},
	set : function(locID, newClass) {
		var element = document.getElementById(locID);
		element.setAttribute("class", newClass);
	}
}

// tell user time before they leave
// window.onbeforeunload = function() {
// 	alert('yo');
// };

window.onload = function() {
	scoreEl = document.getElementById('score');
	timeEl = document.getElementById('time');

	timeEl.innerHTML = totalTime;

	document.onkeydown = function(e){
		switch(e.keyCode) {
			case 37: //left arrow
				if(snake.dir != 2) snake.dir = 0;
				break;
			case 38: //up arrow
				if(snake.dir != 3) snake.dir = 1;
				break;
			case 39: //right arrow
				if(snake.dir != 0) snake.dir = 2;
				break;
			case 40: //down arrow
				if(snake.dir != 1) snake.dir = 3;
				break;
		}
	};

	grid.init();
};


//starts the timer, makes the snake and makes a food
function beginPlay() {

	timeBegun = Math.round(new Date().getTime()/1000);
	playTimer = setTimeout(updateTime, 1000);

	gameTimer = setTimeout(update, speed);

	snake.init();
	food.init();
}

function updateTime() {
	var newTime = Math.round(new Date().getTime()/1000);
	timeElapsed = newTime - timeBegun;

	timeEl.innerHTML = totalTime + timeElapsed;
	playTimer = setTimeout(updateTime, 1000);
}

//called at intervals to update game
function update() {
	// updateSnake();
	snake.update();
}

//called to stop update
function stop() {
	clearTimeout(gameTimer);
	clearTimeout(playTimer);

	totalTime += timeElapsed;

	var highest = document.getElementById('highest');
	if(score > highest.innerHTML) {
		highest.innerHTML = score;
	}

	scoreEl.innerHTML = 0;
	score = 0;
	speed = 400;
}