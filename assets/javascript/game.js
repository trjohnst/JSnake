//dimensions of grid
var gridXdim = 32;
var gridYdim = 20;
//game speed
var speed = 400;



var score = 0;
var tid;
var playTimer;
var timeBegun;
var timeElapsed;

// tell user time before they leave
// window.onbeforeunload = function() {
// 	alert('yo');
// };

window.onload = function() {

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

	initGrid();
};


//starts the timer, makes the snake and makes a food
function beginPlay() {

	timeBegun = Math.round(new Date().getTime()/1000);
	playTimer = updateTime();

	tid = setTimeout(update, speed);

	snake.init();
	food.init();
}

//utility function to give a class to a grid member
function setGrid(locID, newClass) {
	var item = document.getElementById(locID);
	item.setAttribute("class", newClass);
}


function initGrid() {
	var elem = document.getElementById("grid");
	var row;
	var col;
	for( y = 0; y < gridYdim; y++) {
		row = document.createElement('tr');
		elem.appendChild(row);
		for( x = 0; x < gridXdim; x++) {
			col = document.createElement('td');
			col.setAttribute("id", x+"-"+y);
			col.setAttribute("class", 'ground');
			row.appendChild(col);
		}
	}
	
}

function updateTime() {
	var newTime = Math.round(new Date().getTime()/1000);
	timeElapsed = newTime - timeBegun;

	document.getElementById('time').innerHTML = timeElapsed;
	setTimeout(updateTime, 1000);
}

//called at intervals to update game
function update() {
	// updateSnake();
	snake.update();
}

//called to stop update
function stop() {
	clearTimeout(tid);
	speed = 400;
}