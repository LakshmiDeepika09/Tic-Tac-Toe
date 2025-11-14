const board = document.getElementById('board');
const resultScreen = document.getElementById('resultScreen');
const resultMessage = document.getElementById('resultMessage');
const newGameBtn = document.getElementById('newGameBtn');

let currentPlayer = 'X';
let cells = Array(9).fill('');
let gameOver = false;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

function createBoard() {
  board.innerHTML = '';
  cells.forEach((_, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = index;
    cell.addEventListener('click', handleMove, { once: true });
    board.appendChild(cell);
  });
}

function handleMove(e) {
  const index = e.target.dataset.index;
  if (gameOver || cells[index]) return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner(currentPlayer)) {
    showResult(`Player ${currentPlayer} Wins!`);
    gameOver = true;
    return;
  }

  if (cells.every(cell => cell)) {
    showResult("It's a Draw!");
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner(player) {
  return winPatterns.some(pattern =>
    pattern.every(index => cells[index] === player)
  );
}

function showResult(message) {
  resultMessage.textContent = message;
  resultScreen.classList.remove('hidden');
}

function resetGame() {
  cells = Array(9).fill('');
  currentPlayer = 'X';
  gameOver = false;
  resultScreen.classList.add('hidden');
  createBoard();
}

newGameBtn.addEventListener('click', resetGame);

createBoard();
