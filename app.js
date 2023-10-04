const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");

const startCells = ["", "", "", "", "", "", "", "", ""];
let go = "circle";

infoDisplay.textContent = "Circle goes first";

function createBoard() {
  startCells.forEach((_cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", addGo);
    gameBoard.appendChild(cellElement);
  });
}

createBoard();

function addGo(e) {
  console.log(e.target);
  const goDisplay = document.createElement("div");
  goDisplay.classList.add("go");
  goDisplay.classList.add(go);
  e.target.appendChild(goDisplay);
  go = go === "circle" ? "cross" : "circle";
  infoDisplay.textContent = "It is now " + go + "'s go.";
  e.target.removeEventListener("click", addGo);
  checkScore();
}

function checkDraw() {
  const allSquares = document.querySelectorAll(".square");

  const isDraw = Array.from(allSquares).every(
    (square) =>
      square.firstChild?.classList.contains("circle") ||
      square.firstChild?.classList.contains("cross")
  );

  return isDraw;
}

function checkScore() {
  const allSquares = document.querySelectorAll(".square");
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combo of winningCombos) {
    const circleWins = combo.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("circle")
    );

    const crossWins = combo.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("cross")
    );

    if (circleWins) {
      infoDisplay.textContent = "Circle Wins!";
      return;
    } else if (crossWins) {
      infoDisplay.textContent = "Cross Wins!";
      return;
    }
  }

  if (checkDraw()) {
    infoDisplay.textContent = "It's a Draw!";
  }
}
