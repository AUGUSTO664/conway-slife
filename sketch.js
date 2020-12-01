/*

 The conway's game of life

 students: Neguib Metri & Jose Augusto

 in this implementation we use a matrix to represent the cells
 if the cell is alive then will be a 1 in the matrix, otherwisw will be 0.


*/

//creating a matrix
function make2DArray(cols, rows) {
  //first we create the columns
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    //to each column we assign an array of rows
    arr[i] = new Array(rows);
  }
  return arr;
}

// variables to work with
let grid;
let cols;
let rows;
let resolution = 10;
let color = 255;

//creating the canvas
//and the matrix
function setup() {
  createCanvas(600, 400);

  cols = width / resolution;
  rows = height / resolution;

  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      //filling randomly the matrix
      grid[i][j] = floor(random(2));
    }
  }
}

//start the action
function draw() {
  background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
      //if the cell is alive then we fill it with
      //a white collor
        fill(300);
        stroke(0);
       //we draw the new shape
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }
//computing the next generation
  let next = make2DArray(cols, rows);
 // Compute next based on grid
  grid = newGeneration(grid, next);

}


function newGeneration(prev_gen, next) {

    for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = prev_gen[i][j];
      // Count live neighbors!
      let sum = 0;
       //looking for the neighbors
      let neighbors = countNeighbors(prev_gen, i, j);
     //when a dead cell has three neighbors then it is live
      if (state == 0 && neighbors == 3) {
        next[i][j] = 1;
      }
      //if the cell is live and has less than 2 or more than 3 cells
      // it is live
        else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      }
      //if it has three neighbor, it will live.
      else {
        next[i][j] = state;
      }
    }
  }
  //we return the new generation
   return next;
}


function countNeighbors(grid, x, y) {
  let sum = 0;
 //checking for the neighbors around it
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}
