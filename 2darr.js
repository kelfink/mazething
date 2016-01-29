// 2d JS array functions

function TwoDArray(x,y) {
  var cells = new Array(y);
  for (var i = 0; i < y; i++) {
    cells[i] = new Array(x);
    for (var j = 0; j < x; j++) {
      cells[i][j] = null;
    }
  }
  return cells;
}

