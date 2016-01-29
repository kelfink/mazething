var context;
var callSize;
var cells;
var cellSpacing = 0;
var MOVES = {
    up :   {card : 0, x : 0, y : -1, name : "up"},
    down : {card: 2, x : 0,  y :  1, name : "down"}, 
    left : {card : 1, x : -1, y : 0, name : "left"},
    right : {card : 3, x : 1, y : 0, name : "right"}
};

var oldX = 0;
var oldY = 0;
var cellsX = 0;
var cellsY = 0;

var movesMade;
var longestChain;

var winX = 0;
var winY = 0;
var cells;

function setupMaze(mx, my, width, height) {
	cellsX = mx;
	cellsY = my;
    movesMade = [];
    longestChain = [];
    cellSize = width / cellsX;
    var	cellWidth = Math.floor((width - cellSpacing) / (cellSize + cellSpacing)),
		cellHeight = Math.floor((height - cellSpacing) / (cellSize + cellSpacing));

	var canvas = document.createElement('canvas');
	canvas.id = 'canvas';

	document.body.appendChild(canvas); // adds the canvas to the body element

	context = canvas.getContext("2d");
	canvas.width = width;
	canvas.height = height;
	mazeWidth = width;
    mazeHeight = height;
	drawCanvas();

    oldX = cellsX - 1;
    oldY = 0;
    startX = oldX;
    startY = oldY;
    winX = 0;
    winY = cellsY - 1;
    cells = TwoDArray(cellsX, cellsY);


}


function solve(x, y, outX, outY) {   
   movesMade = Array();
   startX = x;
   oldY = y;
   oldX = x;

   winX = outX;
   winY = outY;
   solved = false;

   won = tryMove(8	);
   console.log("did I win ? ", won);
   
   return won;
}

function tryMove() {

  tryTheseMoves = [MOVES.up, MOVES.down, MOVES.left, MOVES.right];
  // try each of the passed moves.
  while (direction = tryTheseMoves.pop()) {
    if (canMove(direction)) {
      x = oldX;
      y = oldY;
      move(direction);

      if (winner()) {
         return true;
      }
      else if (movesMade.length < cellsX * cellsY) {
        // move forward and keep trying.
        won = tryMove();
        if (won) {
          return true;
        }
      }
     
      if (direction) unmove(direction);
    }
  }
  return false;
}


function showPath() {
    loc = { x: startX, y: startY };
    circle(loc.x, loc.y);
    movesMade.forEach(function(direction) {
      newSpot = showMove(loc, direction);
      loc = newSpot
    });
    square(loc.x, loc.y);
}

function showLongestPath() {
    loc = { x: startX, y: startY };
    circle(loc.x, loc.y);
    longestChain.forEach(function(direction) {
      newSpot = showMove(loc, direction);
      loc = newSpot
    });
    square(loc.x, loc.y);
}

function canMove(direction) {
   x = oldX + direction.x;
   y = oldY + direction.y;
   return y >= 0 && x >= 0 && 
     y < cellsY && x < cellsX && !cells[x][y];
}

function showMove(loc, direction) {
   markBox(loc.x, loc.y, direction);
   return { "x" : loc.x + direction.x , "y" : loc.y + direction.y };
}


function move(direction) {
   movesMade.push(direction);
   x = oldX + direction.x;
   y = oldY + direction.y;
   cells[oldX][oldY] = true;
   oldX = x;
   oldY = y;
   if (movesMade.length > longestChain.length) {
     console.log("extending longest chain to " + movesMade.length);
     // copy the array to remember the best chain so far. ... covers the most cells.
     longestChain = movesMade.slice(0);
   }
}

function unmove(direction) {
   // forget the last move.
   movesMade.pop();
   cells[oldX][oldY] = false;
   oldX = oldX - direction.x;
   oldY = oldY - direction.y;
}




function winner() {
   return boardFilled() && atExit();
}

function boardFilled() {
   return movesMade.length == cellsX * cellsY -1
}

function atExit() {
  return winY == oldY && winX == oldX;
}

