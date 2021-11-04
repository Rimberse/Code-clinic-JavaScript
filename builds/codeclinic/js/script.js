/*function findPossibleLocations() {
  let queenCount = 0;
  const queenPositions = {};
  const freeCells = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [] };

  // Find out free cells for 1st piece
  for (let i = 1; i <= rows; i++) {
    letters.forEach(function (letter) {
      const color = document.querySelector("#" + letter + i).firstElementChild.getAttribute('fill');
      if (color !== "#C38D9E" && color !== "#41B3A3") {
        freeCells[queenCount + 1].push(letter + i);
      }
    });
  }

  // Place pieces
  for (let i = 1; i <= rows; i++) {
    letters.forEach(function (letter) {
      const cellColor = document.querySelector("#" + letter + i).firstElementChild.getAttribute('fill');
      if (cellColor !== "#C38D9E" && cellColor !== "#41B3A3") {
        const collisionCells = displayPieceMoves(letter + i);
        queenCount++;
        queenPositions[letter + i] = collisionCells;

        for (let i = 1; i <= rows; i++) {
          letters.forEach(function (l) {
            const color = document.querySelector("#" + l + i).firstElementChild.getAttribute('fill');
            if (color !== "#C38D9E" && color !== "#41B3A3") {
              freeCells[queenCount + 1].push(l + i);
            }
          });
        }
      }
    });
  }

  console.log(queenPositions);
  console.log(queenCount);
  if (queenCount !== 8) {
    console.log(queenPositions);
    console.log(freeCells);

    freeCells[queenCount].forEach(function (cell) {
      if (queenPositions.hasOwnProperty(cell)) {
        freeCells[queenCount] = freeCells[queenCount].filter(function (item) {
          return item !== cell;
        });

        queenPositions[cell].forEach(function (c) {
          let includes = false;
          for (key in queenPositions) {
            if (key !== cell) {

              if (queenPositions[key].includes(c))
                includes = true;
            }
          }

          if (!includes)
            document.querySelector("#" + c).firstElementChild.setAttribute('fill', "#FFF");
        });

        delete queenPositions[cell];
      }
    });


    const nextCell = freeCells[queenCount].shift();
    queenPositions[nextCell] = displayPieceMoves(nextCell);
    console.log(queenPositions);
  }
}

function tryQueenPlacement(board, n) {
  if (n == 8) {
    // no queens left to place, so we're done
    return true
  }
  console.log(board);

  // try each open position until we find one that works
  board.forEach(function (position) {
    const cellColor = document.querySelector("#" + position).firstElementChild.getAttribute('fill');
    if (cellColor !== "#C38D9E" && cellColor !== "#41B3A3") {
      const collisionCells = displayPieceMoves(position);

      const temp = board;
      board = board.filter(function (pos) { return !collisionCells.includes(pos) });
      if (tryQueenPlacement(board, n + 1)) {
        return true;
      }

      board = temp;
      collisionCells.forEach(function (cell) {
        document.querySelector("#" + cell).firstElementChild.setAttribute('fill', "#FFF");
      });
    }
  });

  // if we get this far, there's no available position
  return false
}*/

// findPossibleLocations();

// const positions = [];
// for (let i = 1; i <= rows; i++) {
//   letters.forEach(function (letter) { positions.push(letter + i) });
// }

// tryQueenPlacement(positions, 0);

/* SOLUTION */
(function () {
  const occupied = 1;
  const free = 0;
  let columnNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const numColumns = 8;
  const allSolutions = [];
  let solutionsQty;
  let currentSolution = 0;

  colors = {};
  let change = false;

  for (let i = 1; i <= 8; i++) {
    if (i > 1)
      change = !change;

    columnNames.forEach(function (name) {
      if (!change) {
        this.colors[name + i] = "#BCDBE0";
        change = true;
      } else {
        this.colors[name + i] = "#FFF";
        change = false;
      }
    });
  }

  function displayPieceMoves(coordinate) {
    const directionCells = [];
    let letterIndex = columnNames.indexOf(coordinate[0].toUpperCase());
    document.querySelector("#" + columnNames[letterIndex] + coordinate[1]).firstElementChild.setAttribute('fill', '#41B3A3');
    directionCells.push(columnNames[letterIndex] + coordinate[1]);
  
    for (let i = 0; i < numColumns; i++) {
      let letter = String.fromCharCode('a'.charCodeAt(0) + i).toUpperCase();
  
      if (letter !== columnNames[letterIndex]) {
        document.querySelector("#" + letter + coordinate[1]).firstElementChild.setAttribute('fill', '#C38D9E');
        directionCells.push(letter + coordinate[1]);
      }
  
      if ((i + 1) !== Number(coordinate[1])) {
        document.querySelector("#" + columnNames[letterIndex] + (i + 1)).firstElementChild.setAttribute('fill', '#C38D9E');
        directionCells.push(columnNames[letterIndex] + (i + 1));
      }
    }
  
    let digitIndex = Number(coordinate[1]);
    let upperLeftIndex, upperRightIndex, bottomLeftIndex, bottomRightIndex;
    upperLeftIndex = upperRightIndex = bottomLeftIndex = bottomRightIndex = letterIndex;
  
    for (let i = digitIndex; i > 0; i--) {
      if (upperLeftIndex > 0 && (i - 1) !== 0) {
        document.querySelector("#" + columnNames[--upperLeftIndex] + (i - 1)).firstElementChild.setAttribute('fill', '#C38D9E');
        directionCells.push(columnNames[upperLeftIndex] + (i - 1));
      }
  
      if ((upperRightIndex !== columnNames.length - 1) && (i - 1) !== 0) {
        document.querySelector("#" + columnNames[++upperRightIndex] + (i - 1)).firstElementChild.setAttribute('fill', '#C38D9E');
        directionCells.push(columnNames[upperRightIndex] + (i - 1));
      }
    }
  
    for (let i = digitIndex; i < columnNames.length; i++) {
      if (bottomLeftIndex > 0) {
        document.querySelector("#" + columnNames[--bottomLeftIndex] + (i + 1)).firstElementChild.setAttribute('fill', '#C38D9E');
        directionCells.push(columnNames[bottomLeftIndex] + (i + 1));
      }
  
      if (bottomRightIndex < columnNames.length - 1) {
        document.querySelector("#" + columnNames[++bottomRightIndex] + (i + 1)).firstElementChild.setAttribute('fill', '#C38D9E');
        directionCells.push(columnNames[bottomRightIndex] + (i + 1));
      }
    }
  
    return directionCells;
  };

  function Board() {
    this.width = numColumns;
    this.lastRow = this.width - 1;
    this.columns = new Array(this.width);

    let numberOfDiagonals = 2 * this.width - 1;
    this.diagDown = new Array(numberOfDiagonals);
    this.diagUp = new Array(numberOfDiagonals);
    this.solutions = [];

    for (let index = 0; index < numberOfDiagonals; ++index) {
      if (index < this.width) {
        this.columns[index] = -1;
      }

      this.diagDown[index] = free;
      this.diagUp[index] = free;
    }

    this.position = numColumns;

    this.tryNewQueen = function (row) {
      for (let column = 0; column < numColumns; column++) {
        if (this.columns[column] >= 0) {
          continue;
        }

        let diagDownIndex = row + column;
        if (this.diagDown[diagDownIndex] === occupied) {
          continue;
        }

        let diagonalUpIndex = this.position - 1 - row + column;
        if (this.diagUp[diagonalUpIndex] === occupied) {
          continue;
        }

        this.columns[column] = row;
        this.diagDown[diagDownIndex] = occupied;
        this.diagUp[diagonalUpIndex] = occupied;

        if (row === this.width - 1) {
          this.solutions.push(this.columns.slice(0));

          for (let rowIndex = 0; rowIndex < this.solutions.length; ++rowIndex) {
            let solution = this.solutions[rowIndex];
            let line = '';

            for (let colIndex = 0; colIndex < this.solutions.length; ++colIndex) {
              line += columnNames[colIndex] + (solution[colIndex] + 1 + ' ');
            }
          }
        } else {
          this.tryNewQueen(row + 1);
        }

        this.columns[column] = -1;
        this.diagDown[diagDownIndex] = free;
        this.diagUp[diagonalUpIndex] = free;
      }
    };
  }

  const myBoard = new Board();
  myBoard.tryNewQueen(0);
  solutionsQty = myBoard.solutions.length;

  document.querySelector('#currentSolution').innerHTML = 1;
  document.querySelector('#totalSolutions').innerHTML = solutionsQty;

  for (let rowIndex = 0; rowIndex < myBoard.solutions.length; ++rowIndex) {
    let solution = myBoard.solutions[rowIndex];
    let singleSolution = [];

    for (let colIndex = 0; colIndex < solution.length; ++colIndex) {
      singleSolution.push(columnNames[colIndex] + (solution[colIndex] + 1));
    }

    allSolutions.push(singleSolution);
  }

  function displaySolution(solutionId) {
    for (let index = 0; index < allSolutions[solutionId].length; index++) {
      document.querySelector('#' + allSolutions[solutionId][index] + ' .queen').style.fill = '#D33682';
    }
  }

  function clearBoard() {
    for (let colIndex = 0; colIndex < columnNames.length; colIndex++) {
      for (let rowIndex = 0; rowIndex < numColumns; rowIndex++) {
        document.querySelector('#' + columnNames[colIndex] + (rowIndex + 1) + ' .queen').style.fill = 'transparent';
      }
    }
  }

  displaySolution(currentSolution);

  document.querySelector('#previous').addEventListener('click', function (e) {
    currentSolution--;

    if (currentSolution < 1) {
      currentSolution = allSolutions.length - 1;
    }

    clearBoard();
    document.querySelector('#currentSolution').innerHTML = currentSolution + 1;
    displaySolution(currentSolution);
  });

  document.querySelector('#next').addEventListener('click', function (e) {
    currentSolution++;

    if (currentSolution > allSolutions.length - 1) {
      currentSolution = 0;
    }

    clearBoard();
    document.querySelector('#currentSolution').innerHTML = currentSolution + 1;
    displaySolution(currentSolution);
  });

  document.querySelector('#Board').addEventListener('click', function (e) {
    if (e.target.tagName === 'path') {
      if (e.target.style.fill === 'rgb(211, 54, 130)') {
        e.target.style.fill = 'transparent';
      } else {
        e.target.style.fill = 'rgb(211, 54, 130)';
      }
    } else if (e.target.tagName === 'rect') {
      if (e.target.getAttribute("fill") === "#BCDBE0" || e.target.getAttribute("fill") == "#FFF") {
        displayPieceMoves(e.target.parentElement.id);
      } else {
        displayPieceMoves(e.target.parentElement.id).forEach(function (cell) {
          document.querySelector("#" + cell).firstElementChild.setAttribute("fill", colors[cell]);
        });
      }
    }
  }, false);
})();