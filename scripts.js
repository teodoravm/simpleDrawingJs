// Containers - use those for interaction with them
const container1 = document.getElementById('container-1');
const container2 = document.getElementById('container-2');
const TILE_HEIGHT = 40;
const TILE_WIDTH = 120;
const PADDING = 10;
const TILE_HEIGHT_WITH_PADDING = 50;
const TILE_WIDTH_WITH_PADDING = 130;
const CONTAINER_INITIAL_HEIGHT = 400;
const CONTAINER_WIDTH = 500;
let idCounter = 0;

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
    newTile.id = idCounter;
    newTile.addEventListener('click', function () {
        if (this.parentElement === container1) {
            moveTile(this.id, this.parentElement, container2);
        } else {
            moveTile(this.id, this.parentElement, container1);
        }
    });
    newTile.draggable = 'true';
    newTile.addEventListener('dragstart', function (ev) {
        ev.dataTransfer.setData('div', ev.target.id);
    });

    idCounter = idCounter + 1;

    return newTile;
}

function generateRandomPosition(pos) {
    if (pos === 'top') {
        return Math.floor(
            Math.random() * (CONTAINER_INITIAL_HEIGHT - TILE_HEIGHT)
        );
    } else {
        return Math.floor(Math.random() * (CONTAINER_WIDTH - TILE_WIDTH));
    }
}

function addTile() {
    const input = document.getElementById('tile-name').value;

    if (input !== '') {
        const randomTop = generateRandomPosition('top');
        const randomLeft = generateRandomPosition('left');
        const tile1 = createTileObject(input, randomTop, randomLeft);
        container1.appendChild(tile1);
    }
}

function sortContainer(container) {
    const tiles = Array.from(container.childNodes);
    tiles.sort((a, b) => a.innerText.localeCompare(b.innerText));

    let top = -TILE_HEIGHT;
    let left = 0;
    let heightToAdd = PADDING;

    //calculating the maximum count of tiles on a row inluding the padding before each one
    const maxElementsOnLine = parseInt(
        container.offsetWidth / (TILE_WIDTH + PADDING * 3)
    );
    //calculating the maximum count of tiles in the container inluding the top and bottom padding
    const maxElementsInCont = parseInt(
        (CONTAINER_INITIAL_HEIGHT / (TILE_HEIGHT + PADDING * 2)) *
            maxElementsOnLine
    );

    container.innerHTML = '';

    for (let i = 0; i < tiles.length; i++) {
        const tileStyle = tiles[i].style;
        const tileFirstOnRow = i % maxElementsOnLine === 0;

        //when the tile is the last on the line increment top and set left so that the tiles are centered
        if (tileFirstOnRow) {
            top = top + TILE_HEIGHT_WITH_PADDING;
            //calculating the space on the left needed for centering the tiles by extracting the total space taken by the tiles on the row and dividing that by 2
            left =
                (container.offsetWidth -
                    maxElementsOnLine * TILE_WIDTH_WITH_PADDING) /
                2;

            if (i >= maxElementsInCont) {
                container.style.minHeight =
                    CONTAINER_INITIAL_HEIGHT + heightToAdd + 'px';

                heightToAdd = heightToAdd + TILE_HEIGHT_WITH_PADDING;
            }
        } else {
            left = left + TILE_WIDTH;
        }

        tileStyle.top = top + 'px';
        tileStyle.left = left + 'px';

        left = left + PADDING;

        container.appendChild(tiles[i]);
    }
}

function sortTiles() {
    sortContainer(container1);
    sortContainer(container2);
}

function moveTile(id, containerFrom, containerTo) {
    const tiles = Array.from(containerFrom.childNodes);
    const tileToMove = tiles.find((tile) => tile.id === id);
    if (tileToMove) {
        containerFrom.removeChild(tileToMove);
        containerTo.appendChild(tileToMove);
        sortTiles();
    }
}

function handleDrop(ev) {
    let draggedTileId = ev.dataTransfer.getData('div');

    if (ev.target == container1) {
        moveTile(draggedTileId, container2, container1);
    } else {
        moveTile(draggedTileId, container1, container2);
    }
}

//prevents the browser's default behaviour which is to not allow dragging of elements
function allowDrag(ev) {
    ev.preventDefault();
}
