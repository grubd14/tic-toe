//Since this project is meant to learn about Factory Functions
//and Module pattern I am going to use this
const Gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const updateCell = (index, player) => {
    if (board[index] === "") {
      board[index] = player.getSymbol();
      return true;
    }
    return false;
  };

  const resetGameboard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  return { getBoard, updateCell, resetGameboard };
})();

console.log(Gameboard.getBoard());
console.log(Gameboard.updateCell());

const Players = (name, symbol) => {
  const getSymbol = () => symbol;
  return { name, getSymbol };
};

const GameController = (() => {
  const player1 = Players("Player1", "X");
  const player2 = Players("Player 2", "O");
  let currentPlayer = player1;
  let gameOver = false;

  const checkWin = () => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        Gameboard.getBoard()[a] &&
        Gameboard.getBoard()[a] === Gameboard.getBoard()[b] &&
        Gameboard.getBoard()[a] === Gameboard.getBoard()[c]
      ) {
        return true;
      }
    }

    if (!Gameboard.getBoard().includes("")) {
      return "tie";
    }

    return false;
  };

  const handleClick = (index) => {
    if (!gameOver && Gameboard.updateCell(index, currentPlayer)) {
      renderBoard();
      const winner = checkWin();
      if (winner === true) {
        alert(`${currentPlayer.name} wins!`);
        gameOver = true;
      } else if (winner === "tie") {
        alert(`It's a tie`);
        gameOver = true;
      } else {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
      }
    }
  };

  const renderBoard = () => {
    const gameBoard = Gameboard.getBoard();
    const board = document.querySelectorAll(".board-cell");
    board.forEach((cell, index) => {
      cell.textContent = gameBoard[index];
    });
  };

  // const resetGame = () => {
  //   Gameboard.resetGameboard();
  //   currentPlayer = player1;
  //   gameOver = false;
  //   renderBoard();
  // }

  // const handleRestartClick = () => {
  //   const restartButton = document.querySelector('.restart-btn');
  //   restartButton.addEventListener('click', resetGame);
  // };

  const startGame = () => {
    const cells = document.querySelectorAll(".board-cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        const index = parseInt(cell.dataset.index);
        handleClick(index);
      });
    });
  };

  return { startGame };
})();

GameController.startGame();
