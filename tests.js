QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
  
  solve(2,0,0,2);
  setupMaze(3,3,200,200);
     arr = TwoDArray(3,3);
   assert.equal(arr[0][0], null, "new cells are null");  
   assert.equal(arr[0].length, 3, "3 length");  
   assert.equal(arr.length, 3, "3 length"); 
});

QUnit.test( "movements in a losing board", function( assert ) {
  setupMaze(2,2,200,200);
  assert.equal(oldX, 1, "start x at 1");
  assert.equal(oldY, 0, "start y at 0");
   
   move(MOVES.down, false);
   assert.equal(oldX, 1, "x after down");
   assert.equal(oldY, 1, "y after down");
   move(MOVES.left, false);
   assert.equal(oldX, 0, "x after left");
   assert.equal(oldY, 1, "y after left");

   assert.equal(boardFilled(), false, "is the board filled?");
   assert.equal(atExit(), true);
   showPath();
});

QUnit.test( "winning, start and move", function( assert ) {
  setupMaze(3,3,200,200);
  assert.equal(oldX, 2, "start x at 2");
  assert.equal(oldY, 0, "start y at 0");
   //circle(oldX, oldY);
   move(MOVES.down, false);
   move(MOVES.down, false);
   move(MOVES.left, false);
   move(MOVES.up, false);
   move(MOVES.up, false);
   move(MOVES.left, false);
   move(MOVES.down, false);
   move(MOVES.down, false);

   assert.equal(oldX, 0, "x after moves");
   assert.equal(oldY, 2, "y after moves");
   assert.equal(boardFilled(), true, "the board filled");
   assert.equal(atExit(), true, "And I'm at the exit");
   assert.equal(winner(), true, "So I win");
   assert.equal(movesMade.length, cellsX * cellsY -1, "compare length to product of X and Y minus 1");
   showPath();
});

QUnit.test( "Solving", function( assert ) {
  setupMaze(3,3,200,200);
  assert.equal(solve(2,0,0,2), true, "I should have won");
 showLongestPath();	
 
});

QUnit.test( "Solving", function( assert ) {
  setupMaze(6,6,200,200);
  assert.equal(solve(5,0,0,5), false, "I should have lost");
 showLongestPath();	
 
});
