//global varibales declerations
let selectedCell;
let pieces = [];
let currentPiece;
const htmlTable = document.createElement('table');
const TABLE_SIZE = 8;
const RED_PLAYER = 'red';
const BLACK_PLAYER = 'black';
const RED_STARTING_ROW = 5;
const BLACK_STARTING_ROW = 0;

function onCellClick(e) {

    if (selectedCell === undefined && pieces[e.currentTarget.parentNode.rowIndex][e.currentTarget.cellIndex] !== undefined) {
        selectedCell = e.currentTarget;
        selectedCell.classList.add('selected');
        currentPiece = pieces[selectedCell.parentNode.rowIndex][selectedCell.cellIndex];
        pieceMovement(e.currentTarget.parentNode.rowIndex, e.currentTarget.cellIndex, currentPiece.player);
    }
    else if (e.currentTarget.classList.contains('possibleMove')) {
        let row = selectedCell.parentNode.rowIndex; //selectedCell contains the cell of the piece from the previous click
        let col = selectedCell.cellIndex;
        pieces[row][col] = undefined;
        selectedCell.classList.remove('checker-' + currentPiece.player);
        selectedCell = e.currentTarget; //now selectedCell contains the clicked on cell
        row = selectedCell.parentNode.rowIndex;
        col = selectedCell.cellIndex;
        pieces[row][col] = currentPiece;
        selectedCell.classList.add('checker-' + currentPiece.player);
        unpaintAllCells();
    }
    else if (selectedCell !== undefined) {
        unpaintAllCells();
        selectedCell = undefined;
        onCellClick(e);
    }
}
function unpaintAllCells() {
    for (let i = 0; i < TABLE_SIZE; i++) {
        for (let j = 0; j < TABLE_SIZE; j++) {
            htmlTable.rows[i].cells[j].classList.remove('selected');
            htmlTable.rows[i].cells[j].classList.remove('possibleMove');
            htmlTable.rows[i].cells[j].classList.remove('possibleEat');
        }
    }
}
game = new BoardData();
window.addEventListener('load', game.initCheckersGame);