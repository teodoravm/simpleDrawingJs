// Containers - use those for interaction with them
const container1 = document.getElementById('container-1');
const container2 = document.getElementById('container-2');
const tileHeight = 40;
const tileWidth = 120;
const padding = 10;
const tileHeightWithPadding = 50;
const tileWidthWithPadding = 130;
const containerHeight = 400;
const containerWidth = 500;
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

function addTile() {
    const input = document.getElementById('tile-name').value;

    if (input !== '') {
        const randomTop = Math.floor(
            Math.random() * (containerHeight - tileHeight)
        );
        const randomLeft = Math.floor(
            Math.random() * (containerWidth - tileWidth)
        );
        const tile1 = createTileObject(input, randomTop, randomLeft);
        container1.appendChild(tile1);
    }
}

function sortContainer(container, children) {
    const tiles = Array.from(children);
    tiles.sort((a, b) => a.innerText.localeCompare(b.innerText));

    let top = -40;
    let left = 0;
    let heightToAdd = 10;

    //calculating the maximum count of tiles on a row inluding the padding before each one
    const maxElementsOnLine = parseInt(
        container.offsetWidth / (tileWidth + padding * 3)
    );
    //calculating the maximum count of tiles in the container inluding the top and bottom padding
    const maxElementsInCont = parseInt(
        (containerHeight / (tileHeight + padding * 2)) * maxElementsOnLine
    );

    container.innerHTML = '';

    for (let i = 0; i < tiles.length; i++) {
        const tileStyle = tiles[i].style;

        //when the tile is the last on the line increment top and set left so that the tiles are centered
        if (i % maxElementsOnLine === 0) {
            top = top + tileHeightWithPadding;
            //calculating the space on the left needed for centering the tiles by
            //extracting the total space taken by the tiles on the row and dividing that by 2
            left =
                (container.offsetWidth -
                    maxElementsOnLine * tileWidthWithPadding) /
                2;

            if (i >= maxElementsInCont) {
                container.style.minHeight =
                    containerHeight + heightToAdd + 'px';

                heightToAdd = heightToAdd + tileHeightWithPadding;
            }
        } else {
            left = left + tileWidth;
        }

        tileStyle.top = top + 'px';
        tileStyle.left = left + 'px';

        left = left + padding;

        container.appendChild(tiles[i]);
    }
}

function sortTiles() {
    sortContainer(container1, container1.childNodes);
    sortContainer(container2, container2.childNodes);
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
