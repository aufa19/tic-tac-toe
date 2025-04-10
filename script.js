const board = document.getElementById("board");
const statusText = document.getElementById("status");
let currentPlayer = "X";
let gameActive = true;
let cells = Array(9).fill("");

function renderBoard() {
  board.innerHTML = "";
  cells.forEach((value, index) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = value;
    cell.addEventListener("click", () => handleClick(index));
    board.appendChild(cell);
  });
}

function handleClick(index) {
  if (cells[index] || !gameActive) return;
  cells[index] = currentPlayer;
  if (checkWin()) {
    statusText.textContent = `${currentPlayer} wins!`;
    gameActive = false;
  } else if (!cells.includes("")) {
    statusText.textContent = "Draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Turn: ${currentPlayer}`;
  }
  renderBoard();
}

function checkWin() {
  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8], 
    [0,3,6], [1,4,7], [2,5,8], 
    [0,4,8], [2,4,6]
  ];
  return winCombos.some(combo =>
    combo.every(i => cells[i] === currentPlayer)
  );
}

function resetBtn(){
    const resetBtn = document.getElementById("resetBtn");
    resetBtn.addEventListener("click", () => {
        cells = Array(9).fill("");
        currentPlayer = "X";
        gameActive = true;
        statusText.textContent = `Turn: ${currentPlayer}`;
    renderBoard();
});

}

renderBoard();
statusText.textContent = `Turn: ${currentPlayer}`;
