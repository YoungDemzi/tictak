const Player = (name) => {
  const ownedTiles = [];
  const pushTiles = (tile) => {
    ownedTiles.push(tile);
    console.log({ ownedTiles });
  };
  const checkWin = (winConditions) => {
    winConditions.forEach((array) => {
      const isWin = array.every((cell) => ownedTiles.includes(cell));
      if (isWin) {
        console.log(`${name} Has Won`);
      }
    });
  };
  return {
    name,
    pushTiles,
    checkWin,
  };
};
const gameBoard = (() => {
  const tiles = ["", "", "", "", "", "", "", "", ""];
  const boardContainer = document.querySelector(".game-container");
  const playerButton = document.querySelectorAll("button");
  const winConditions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  const playerX = Player("X");
  const playerO = Player("O");
  let activePlayer = playerX;
  return {
    generate: function generate() {
      for (let i = 1; i < tiles.length + 1; i++) {
        const tile = document.createElement("div");
        tile.addEventListener("click", () => {
          if (!tile.firstChild) {
            const marker = document.createElement("p");
            marker.classList.add("marker");
            if (activePlayer.name == "X") marker.textContent = "X";
            else marker.textContent = "O";
            tile.appendChild(marker);
            tiles[i] = i;
            activePlayer.pushTiles(tiles[i]);
            console.log(activePlayer.checkWin(winConditions));
            if (activePlayer.name == "X") activePlayer = playerO;
            else activePlayer = playerX;
          }
        });
        tile.classList.add("game-tile");
        boardContainer.appendChild(tile);
      }
    },
    remove: function remove() {
      while (boardContainer.firstChild) {
        boardContainer.removeChild(boardContainer.firstChild);
      }
    },
  };
})();
gameBoard.generate();
