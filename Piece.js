class Piece {
    constructor(color) {
        this.color = color;
    }
}
function pieceMovement(row, col, color) {
    if (color === BLACK_PLAYER) {
        if (isPointInBounds(row + 1, col + 1) && pieces[row + 1][col + 1] !== undefined && pieces[row + 1][col + 1].color !== color && isPointInBounds(row + 2, col + 2) && pieces[row + 2][col + 2] === undefined) {
            paintPossibleEat(row + 1, col + 1);
            paintPossibleAfterEat(row + 2, col + 2);
        }
        else if (isPointInBounds(row + 1, col + 1) && pieces[row + 1][col + 1] === undefined) {
            paintPossibleMove(row + 1, col + 1);
        }
        if (isPointInBounds(row + 1, col - 1) && pieces[row + 1][col - 1] !== undefined && pieces[row + 1][col - 1].color !== color && isPointInBounds(row + 2, col - 2) && pieces[row + 2][col - 2] === undefined) {
            paintPossibleEat(row + 1, col - 1);
            paintPossibleAfterEat(row + 2, col - 2);
        }
        else if (isPointInBounds(row + 1, col - 1) && pieces[row + 1][col - 1] === undefined) {
            paintPossibleMove(row + 1, col - 1);
        }
    }
    else {
        if (isPointInBounds(row - 1, col + 1) && pieces[row - 1][col + 1] !== undefined && pieces[row - 1][col + 1].color !== color && isPointInBounds(row - 2, col + 2) && pieces[row - 2][col + 2] === undefined) {
            paintPossibleEat(row - 1, col + 1);
            paintPossibleAfterEat(row - 2, col + 2);
        }
        else if (isPointInBounds(row - 1, col + 1) && pieces[row - 1][col + 1] === undefined) {
            paintPossibleMove(row - 1, col + 1);
        }
        if (isPointInBounds(row - 1, col - 1) && pieces[row - 1][col - 1] !== undefined && pieces[row - 1][col - 1].color !== color && isPointInBounds(row - 2, col - 2) && pieces[row - 2][col - 2] === undefined) {
            paintPossibleEat(row - 1, col - 1);
            paintPossibleAfterEat(row - 2, col - 2);
        }
        else if (isPointInBounds(row - 1, col - 1) && pieces[row - 1][col - 1] === undefined) {
            paintPossibleMove(row - 1, col - 1);
        }
    }
}
function checkPossibleEat(row, col, color) {
    if (color === BLACK_PLAYER) {
        if (isPointInBounds(row + 1, col + 1) && pieces[row + 1][col + 1] !== undefined && pieces[row + 1][col + 1].color !== color && isPointInBounds(row + 2, col + 2) && pieces[row + 2][col + 2] === undefined) {
            return true;
        }
        if (isPointInBounds(row + 1, col - 1) && pieces[row + 1][col - 1] !== undefined && pieces[row + 1][col - 1].color !== color && isPointInBounds(row + 2, col - 2) && pieces[row + 2][col - 2] === undefined) {
            return true;
        }
    }
    else {
        if (isPointInBounds(row - 1, col + 1) && pieces[row - 1][col + 1] !== undefined && pieces[row - 1][col + 1].color !== color && isPointInBounds(row - 2, col + 2) && pieces[row - 2][col + 2] === undefined) {
            return true;
        }
        if (isPointInBounds(row - 1, col - 1) && pieces[row - 1][col - 1] !== undefined && pieces[row - 1][col - 1].color !== color && isPointInBounds(row - 2, col - 2) && pieces[row - 2][col - 2] === undefined) {
            return true;
        }
    }
    return false;
}
function paintPossibleMove(row, col) {
    htmlTable.rows[row].cells[col].classList.add('possibleMove');
}
function paintPossibleEat(row, col) {
    htmlTable.rows[row].cells[col].classList.add('possibleEat');
}
function paintPossibleAfterEat(row, col) {
    htmlTable.rows[row].cells[col].classList.add('possibleAfterEat');
}
function isPointInBounds(x, y) {
    return (x >= 0 && y >= 0 && x < TABLE_SIZE && y < TABLE_SIZE);
}