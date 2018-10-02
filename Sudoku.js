// Returns a row
const getRow = (grid, rowIdx) => grid[rowIdx];

// Returns a column
const getColumn = (grid, colIdx) => {
  const colArr = [];

  for (let i = 0; i < grid.length; i++){
    colArr.push(grid[i][colIdx])
  }

  return colArr;
}

// Returns a subgrid
const getSubGrid = (grid, x, y) => {

  const sectionArr = [];
  x *= 3;
  y *= 3;

  for (let i = y; i < y + 3; i++) {
    for (let j = x; j < x + 3; j++) {
      sectionArr.push(grid[i][j])
    }
  }

  return sectionArr;
}

// Checks to two arrays to see if they contain the same values (but scrambled)
// More flexible function - can be used to compare two grids, row by row, in isSame()
const includesValsOf = (arr, valsToCheck) => {
  const numsToCheck = valsToCheck.slice();

  for (let i = 0; i < arr.length; i++){
    const idxOfNum = numsToCheck.indexOf(arr[i]);

    if (idxOfNum !== -1) numsToCheck.splice(idxOfNum, 1);
  }

  if (numsToCheck.length === 0) return true;
  return false;
}

const sudokuIsValid = grid => {

  let oneThroughNine = [1,2,3,4,5,6,7,8,9];

  // Check each row and col
  for (let i = 0; i < 9; i++) {
    if (!includesValsOf(getRow(grid, i), oneThroughNine) || !includesValsOf(getColumn(grid, i), oneThroughNine)) {
      return false;
    }
  }

  // Check each sub-grid
  for (let j = 0; j < 3; j++){
    for (let k = 0; k < 3; k++) {
      if (!includesValsOf(getSubGrid(grid, j, k), oneThroughNine)) {
        return false;
      }
    }
  }

  return true;
};

const isSame = (grid1, grid2) => {
  for (let i = 0; i < grid1.length; i++) {
    let grid1Row = getRow(grid1, i);
    let grid2Row = getRow(grid2, i);

    if (!includesValsOf(grid1Row, grid2Row)) {
      return false;
    }
  }
  return true;
}

let puzzle = [
  [ 8,9,5,  7,4,2,  1,3,6 ],
  [ 2,7,1,  9,6,3,  4,8,5 ],
  [ 4,6,3,  5,8,1,  7,9,2 ],

  [ 9,3,4,  6,1,7,  2,5,8 ],
  [ 5,1,7,  2,3,8,  9,6,4 ],
  [ 6,8,2,  4,5,9,  3,7,1 ],

  [ 1,5,9,  8,7,4,  6,2,3 ],
  [ 7,4,6,  3,2,5,  8,1,9 ],
  [ 3,2,8,  1,9,6,  5,4,7 ]
];

// ------------------------------------
// TESTS
// ------------------------------------
console.log(getRow(puzzle, 8));         // => [ 3, 2, 8, 1, 9, 6, 5, 4, 7 ]
console.log(getColumn(puzzle, 2));      // => [ 5, 1, 3, 4, 7, 2, 9, 6, 8 ]
console.log(getSubGrid(puzzle, 1,0));   // -> [ 7,4,2,9,6,3,5,8,1 ]
console.log(sudokuIsValid(puzzle));     // => true