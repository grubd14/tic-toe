// function renderTicToe() {
//   let gameboard = document.querySelectorAll(".board-cell");
//   gameboard.forEach((cell) => {
//     cell.addEventListener('click', handleClick, { once: true });
//   });
// }

// function handleClick() {
//   console.log('Clicked');
// }
//
// const ticTatToeGrids = document.querySelectorAll(".board-cell");
// ticTatToeGrids.forEach( cell => {
//   cell.addEventListener('click', handleClick, {once:true})
// })

// function handleClick() {
//   console.log('Hello Clicked');
// }

//Since this project is meant to learn about Factory Functions
//and Module pattern I am going to use this
const Gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const isCellGridEmpty = (index) => board[index] === "";

  const updateCellGrid = (index, marked) => {
    if (isCellGridEmpty(index)) {
      board[index] = marked
      return true;
    }
    return false;
  };

  return { getBoard, isCellGridEmpty, updateCellGrid};
})();

console.log(Gameboard.getBoard());
console.log(Gameboard.isCellGridEmpty());
console.log(Gameboard.updateCellGrid());



const Players = (name, marked) => {
  return { name, marked };
};
