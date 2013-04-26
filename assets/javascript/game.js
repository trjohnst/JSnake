//dimensions of grid
var gridXdim = 32;
var gridYdim = 20;
//game speed
var speed = 400;
//snake variables
var dir, len, newX, newY, snakeX, snakeY;
//dir -> 0,1,2,3 = left, up, right, down
dir = 0;
//Array for locations for Play button pieces (one per line)
var play = new Array(
	"4-4","4-5","4-6","4-7","4-8","5-4","5-6","6-5", //P
	"8-4","8-5","8-6","8-7","8-8", "9-8", "10-8",	 //L
	"12-5","12-6","12-7","12-8","13-4","13-6","14-5","14-6","14-7","14-8", //A
	 "16-4","16-5","18-4","18-5","17-6","17-7","17-8" //Y
	 );
var playselected = false;
var score = 0;
var tid;
var timeBegun;
var timeElapsed;

// tell user time before they leave
// window.onbeforeunload = function() {
// 	alert('yo');
// };

window.onload = function() {

	timeBegun = Math.round(new Date().getTime()/1000);

	document.onkeydown = function(e){
		switch(e.keyCode) {
			case 37: //left arrow
				if(dir != 2) dir = 0;
				break;
			case 38: //up arrow
				if(dir != 3) dir = 1;
				break;
			case 39: //right arrow
				if(dir != 0) dir = 2;
				break;
			case 40: //down arrow
				if(dir != 1) dir = 3;
				break;
		}
	};

	initGrid();
	initMenu();
};

function togglePlay() {
	playselected = !playselected;
	setPlay();
}

function setPlay() {
	var newClass = "playunselected";
	if(playselected) {
		newClass = "playselected";
	}
	for(iter =0; iter < play.length; iter++) {
		setGrid(play[iter], newClass);
	}
}

function initMenu() {
	//set colors
	setPlay();

	//setup highlighting and playing
	for(iter =0; iter < play.length; iter++) {
		//console.log(play[iter]);
		var item = document.getElementById(play[iter]);
		item.setAttribute("onmousedown","beginPlay();");
		item.setAttribute("onmouseover","togglePlay();");
		item.setAttribute("onmouseout","togglePlay();");
	}
}

//starts the timer, makes the snake and makes a food
function beginPlay() {
	playSelected = false;

	for(iter =0; iter < play.length; iter++) {
		var item = document.getElementById(play[iter]);
		item.setAttribute("class", 'ground');
		item.removeAttribute("onmousedown");
		item.removeAttribute("onmouseover");
		item.removeAttribute("onmouseout");
	}

	tid = setTimeout(update, speed);

	makeSnake();
	makeFood();
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

//sets up the snake and his body
function makeSnake() {
	//init vars
	dir = 0;
	snakeX=new Array();
	snakeY=new Array();

	//find random and fair placing (not too close to an edge)
	var Xrange = (gridXdim-10)/2+1;
	var Yrange = gridYdim/2+1;
	var firstX = Math.floor((Math.random()*Xrange) + Xrange/2);
	var firstY = Math.floor((Math.random()*Yrange) + Yrange/2);

	//setup body
	len = 5;
	for( iter = 0; iter < len; iter++) {
		snakeX[iter] = firstX + iter;
		snakeY[iter] = firstY;
		setGrid(snakeX[iter]+'-'+firstY, 'snake');
	}
}

//creates a food item at a random place on the board
function makeFood() {
	//choose a position
	var foodX = Math.floor(Math.random()*gridXdim);
	var foodY = Math.floor(Math.random()*gridYdim);

	//ensure the position is a valid position (so we don't turn part of the snake into food)
	while(document.getElementById(foodX+'-'+foodY).getAttribute('class') != 'ground') {
		foodX = Math.floor(Math.random()*gridXdim);
		foodY = Math.floor(Math.random()*gridYdim);
	}

	//set the position to food
	setGrid(foodX+'-'+foodY, 'food');
}

function updateSnake() {
	//find the next grid member to be a snake
	switch(dir) {
		case 0:
			newX = snakeX[0] - 1;
			newY = snakeY[0];
			break;
		case 1:
			newX = snakeX[0];
			newY = snakeY[0] - 1;
			break;
		case 2:
			newX = snakeX[0] + 1;
			newY = snakeY[0];
			break;
		case 3:
			newX = snakeX[0];
			newY = snakeY[0] + 1;
			break;
		default:
			alert('illegal direction');
	}
	
	//test if new position is out of bounds
	if(newX < 0 || newX > gridXdim || newY < 0 || newY > gridYdim) {
		//collided with edge
		stop();
		playselected = false;
		initMenu();
		return;
	}
	
	//set grid to snake
	var newLocClass = document.getElementById(newX+'-'+newY).getAttribute('class');

	
	if(newLocClass == 'snake') {
		//collided with self
		stop();
		playselected = false;
		initMenu();
	} else { 
		if(newLocClass != 'food')
			//did not eat food, move normally
			setGrid(snakeX.pop()+'-'+snakeY.pop(), 'ground');
		else {
			//ate food -> increase speed, and make another food
			speed = Math.floor(9/10*speed);
			makeFood();
			score++;
			document.getElementById('score').innerHTML = score;
		}

		//set new position
		setGrid(newX+'-'+newY, 'snake');
		snakeX.unshift(newX);
		snakeY.unshift(newY);

		//call another update
		tid = setTimeout(update, speed);
	}
}

function updateTime() {
	var newTime = Math.round(new Date().getTime()/1000);
	timeElapsed = newTime - timeBegun;

	document.getElementById('time').innerHTML = timeElapsed;
}

//called at intervals to update game
function update() {
	updateSnake();

	updateTime();
}

//called to stop update
function stop() {
	clearTimeout(tid);
}