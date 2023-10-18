// Containers - use those for interaction with them
const container1 = document.getElementById('container-1');
const container2 = document.getElementById('container-2');
let tilesFirstContainer = [];
let tilesSecondContainer = [];

// Setup initial tile
const tile = createTileObject('Tile 1', 50, 60);
container1.appendChild(tile);

// Your implementation goes here

function createTileObject(name, top, left) {
  const newTile = document.createElement('div');
  newTile.classList.add('tile');
  newTile.innerText = name;
  newTile.style.top = top + 'px';
  newTile.style.left = left + 'px';
  newTile.id = Math.floor(Math.random() * 1000);
  newTile.addEventListener('click', function () {
    moveTile(this.id, this.parentElement);
  });

  tilesFirstContainer.push(newTile);

  return newTile;
}

function addTile() {
  const input = document.getElementById('tile-name').value;
  const randomTop = Math.floor(Math.random() * (400 - 40));
  const randomLeft = Math.floor(Math.random() * (500 - 120));
  const tile1 = createTileObject(input, randomTop, randomLeft);
  container1.appendChild(tile1);
}

function sortOneContainer(container, tilesToSort) {
  tilesToSort.sort((a, b) => a.innerText.localeCompare(b.innerText));
  let currentY = -40;
  let currentX = 0;
  let heightToAdd = 10;
  let marginLeft = 10;
  let marginTop = 0;

  const maxElementsOnLine = parseInt(container.offsetWidth / (120 + 40));
  const maxElementsInCont = parseInt((400 / 60) * maxElementsOnLine);

  container.innerHTML = '';

  for (let i = 0; i < tilesToSort.length; i++) {
    if (i % maxElementsOnLine === 0) {
      currentY = currentY + 40;
      currentX = 0;
      marginLeft = 50;
      marginTop = marginTop + 10;

      if (i >= maxElementsInCont) {
        container.style.minHeight = 400 + heightToAdd + 'px';

        heightToAdd = heightToAdd + 50;
      }
    } else {
      currentX = currentX + 120;
    }

    tilesToSort[i].style.top = currentY + 'px';
    tilesToSort[i].style.left = currentX + 'px';
    tilesToSort[i].style.marginLeft = marginLeft + 'px';
    tilesToSort[i].style.marginTop = marginTop + 'px';

    marginLeft = marginLeft + 10;

    container.appendChild(tilesToSort[i]);
  }
}

function sortTiles() {
  sortOneContainer(container1, tilesFirstContainer);
  sortOneContainer(container2, tilesSecondContainer);
}

function moveTile(id, container) {
  if (container == container1) {
    const tileToMove = tilesFirstContainer.find((tile) => tile.id === id);
    tilesFirstContainer = tilesFirstContainer.filter((tile) => tile.id !== id);
    tilesSecondContainer.push(tileToMove);
    container1.removeChild(tileToMove);
    container2.appendChild(tileToMove);
  } else {
    const tileToMove = tilesSecondContainer.find((tile) => tile.id === id);
    tilesSecondContainer = tilesSecondContainer.filter(
      (tile) => tile.id !== id
    );
    tilesFirstContainer.push(tileToMove);
    container2.removeChild(tileToMove);
    container1.appendChild(tileToMove);
  }

  sortTiles();
}
