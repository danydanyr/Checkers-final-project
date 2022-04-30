class Piece {
    constructor(player) {
        this.player = player;
    }
}
function pieceMovement(row, col, color) {
    if (color === BLACK_PLAYER) {
        if (isPointInBounds(row + 1, col + 1) && pieces[row + 1][col + 1] === undefined) {
            paintPossibleMove(row + 1, col + 1);
        }
        if (isPointInBounds(row + 1, col - 1) && pieces[row + 1][col - 1] === undefined) {
            paintPossibleMove(row + 1, col - 1);
        }
    }
    else {
        if (isPointInBounds(row - 1, col + 1) && pieces[row - 1][col + 1] === undefined) {
            paintPossibleMove(row - 1, col + 1);
        }
        if (isPointInBounds(row - 1, col - 1) && pieces[row - 1][col - 1] === undefined) {
            paintPossibleMove(row - 1, col - 1);
        }
    }
}
function paintPossibleMove(row, col) {
    htmlTable.rows[row].cells[col].classList.add('possibleMove');
}
function isPointInBounds(x, y) {
    return (x >= 0 && y >= 0 && x < TABLE_SIZE && y < TABLE_SIZE);
}