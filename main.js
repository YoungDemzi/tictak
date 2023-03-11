const Player = (name) => {
  let ownedTiles = [];
  const pushTiles = (tile) => {
    ownedTiles.push(tile);
    console.log({ name, ownedTiles });
  };
  const checkWin = (winConditions) => {
    winConditions.forEach((array) => {
      const isWin = array.every((cell) => ownedTiles.includes(cell));
      if (isWin) {
        console.log(`${name} Has Won`);
        setTimeout(popup(name), 200);
      }
    });
  };
  const reset = () => {
    ownedTiles = [];
  };
  return {
    name,
    pushTiles,
    checkWin,
    reset,
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
      for (let i = 1; i < 9 + 1; i++) {
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
    reset: function reset() {
      while (boardContainer.firstChild) {
        boardContainer.removeChild(boardContainer.firstChild);
      }
      tiles.fill(""); // reset tiles array
      activePlayer = playerX; // set active player back to playerX
      playerX.reset(); // reset ownedTiles array for playerX
      playerO.reset(); // reset ownedTiles array for playerO
      gameBoard.generate(); // generate new tiles
    },
  };
})();
gameBoard.generate();

const popup = (name) => {
  const endScreen = document.querySelector(".popup");
  endScreen.firstChild.textContent = `Player ${name} Won!`;
  const resetBtn = document
    .querySelector(".reset")
    .addEventListener("click", () => {
      endScreen.style.opacity = "0";
      endScreen.style.visibility = "hidden";
    });
  endScreen.style.opacity = "1";
  endScreen.style.visibility = "visible";
  console.log("Popup");
  gameBoard.reset();
};
