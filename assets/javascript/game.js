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
var timeTaken = 0;
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

// window.onbeforeunload = function() {
// 	return "Really? You've only been playing for " + totalTime + " seconds!";
// }

window.onload = function() {
	scoreEl = document.getElementById('score');
	timeEl = document.getElementById('time');

	totalTime = cookie.get('time');
	if(totalTime == null) {
		totalTime = 0;
	}
	timeEl.innerHTML = totalTime;

	document.onkeydown = function(e){
		switch(e.keyCode) {
			case 65: //A
			case 37: //left arrow
				if(snake.dir != 2) snake.dir = 0;
				break;
			case 87: //W
			case 38: //up arrow
				if(snake.dir != 3) snake.dir = 1;
				break;
			case 68: //D
			case 39: //right arrow
				if(snake.dir != 0) snake.dir = 2;
				break;
			case 83: //S
			case 40: //down arrow
				if(snake.dir != 1) snake.dir = 3;
				break;
		}
	};

	cookie.init();
	grid.init();
};


//starts the timer, makes the snake and makes a food
function beginPlay() {
	timeBegun = Math.round(new Date().getTime()/1000);
	playTimer = setTimeout(updateTime, 1000);

	gameTimer = setTimeout(update, speed);

	document.getElementById('menucontainer').style.display = 'none';

	snake.init();
	food.init();
}

function updateTime() {
	var newTime = Math.round(new Date().getTime()/1000);
	timeElapsed = newTime - timeBegun;

	timeEl.innerHTML = totalTime + timeElapsed;
	playTimer = setTimeout(updateTime, 1000);
}



//called to stop update
function stop() {
	clearTimeout(gameTimer);
	clearTimeout(playTimer);

	totalTime += timeElapsed;

	cookie.set('time', totalTime, 365);

	var highest = document.getElementById('highest');
	if(score > highest.innerHTML) {
		highest.innerHTML = score;
	}

	document.getElementById('menucontainer').style.display = 'block';

	scoreEl.innerHTML = 0;
	score = 0;
	speed = 400;
}