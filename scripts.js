// Containers - use those for interaction with them
const container1 = document.getElementById('container-1');
const container2 = document.getElementById('container-2');
const tiles = [];

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
  tiles.push(name);

  return newTile;
}

function addTile() {
  const input = document.getElementById('tile-name').value;
  const randomTop = Math.floor(Math.random() * (400 - 40));
  const randomLeft = Math.floor(Math.random() * (500 - 120));
  const tile1 = createTileObject(input, randomTop, randomLeft);
  container1.appendChild(tile1);
}

function sortTiles() {}
