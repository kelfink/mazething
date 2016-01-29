function line(oldX, oldY, x,y) {
   context.beginPath();
   context.moveTo( (oldX + 0.5) * cellSize, (oldY + 0.5) * cellSize);
   context.lineTo( (x + 0.5) * cellSize,    (y + 0.5) * cellSize);
   context.stroke();
}

function circle(x, y) {
    context.beginPath();
    context.arc((x + 0.5) * cellSize, (y + 0.5) * cellSize, cellSize / 5, 0, 2 * Math.PI, false);
    context.fill();
    context.lineWidth = 2;
    context.stroke();
}

function square(x, y) {
   context.beginPath();
   context.moveTo( (x + 0.25) * cellSize, (y + 0.5) * cellSize);
   context.lineTo( (x + 0.75) * cellSize,    (y + 0.5) * cellSize);
   context.lineWidth = cellSize / 2;
   context.stroke();
}

function markBox(x, y, direction) {
  cells[x][y] = true;
  // line from center of current square to the next.
  circle(x, y);
  line(x, y, x + direction.x, y + direction.y);
}


function drawCanvas() {
	context.strokeStyle = "blue";
	context.fillStyle = "white";
	context.fillRect(0, 0, mazeWidth, mazeHeight);

	for (i = 0; i < cellsY; i++ ) {
	  for (j = 0;j < cellsX;  j++ ) {
		context.strokeRect(1 + j * cellSize, 1 + i * cellSize, cellSize - 1, cellSize - 1);
	  }
	}
	
    context.fillStyle = "green";
    context.strokeStyle = 'green';

}