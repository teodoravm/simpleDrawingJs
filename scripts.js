// Containers - use those for interaction with them
const container1 = document.getElementById('container-1');
const container2 = document.getElementById('container-2');

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

  return newTile;
}

function addTile() {}

function sortTiles() {}
