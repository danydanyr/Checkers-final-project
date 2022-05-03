class Piece {
    constructor(color) {
        this.color = color;
        this.isQueen = false;
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
//checks if at least one of the pieces can move or its game over
function checkPossibleMove(row, col, color) {
    if (color === BLACK_PLAYER) {
        if (isPointInBounds(row + 1, col + 1) && pieces[row + 1][col + 1] === undefined) {
            return true;
        }
        if (isPointInBounds(row + 1, col - 1) && pieces[row + 1][col - 1] === undefined) {
            return true;
        }
    }
    else {
        if (isPointInBounds(row - 1, col + 1) && pieces[row - 1][col + 1] === undefined) {
            return true;
        }
        if (isPointInBounds(row - 1, col - 1) && pieces[row - 1][col - 1] === undefined) {
            return true;
        }
    }
    return false;
}
//to check if any of the pieces on the board can eat
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
//even if the piece can move a different direction, the piece HAS to eat
function onlyPossibleEat(row, col, color) {
    if (color === BLACK_PLAYER) {
        if (isPointInBounds(row + 1, col + 1) && pieces[row + 1][col + 1] !== undefined && pieces[row + 1][col + 1].color !== color && isPointInBounds(row + 2, col + 2) && pieces[row + 2][col + 2] === undefined) {
            paintPossibleEat(row + 1, col + 1);
            paintPossibleAfterEat(row + 2, col + 2);
        }
        if (isPointInBounds(row + 1, col - 1) && pieces[row + 1][col - 1] !== undefined && pieces[row + 1][col - 1].color !== color && isPointInBounds(row + 2, col - 2) && pieces[row + 2][col - 2] === undefined) {
            paintPossibleEat(row + 1, col - 1);
            paintPossibleAfterEat(row + 2, col - 2);
        }
    }
    else {
        if (isPointInBounds(row - 1, col + 1) && pieces[row - 1][col + 1] !== undefined && pieces[row - 1][col + 1].color !== color && isPointInBounds(row - 2, col + 2) && pieces[row - 2][col + 2] === undefined) {
            paintPossibleEat(row - 1, col + 1);
            paintPossibleAfterEat(row - 2, col + 2);
        }
        if (isPointInBounds(row - 1, col - 1) && pieces[row - 1][col - 1] !== undefined && pieces[row - 1][col - 1].color !== color && isPointInBounds(row - 2, col - 2) && pieces[row - 2][col - 2] === undefined) {
            paintPossibleEat(row - 1, col - 1);
            paintPossibleAfterEat(row - 2, col - 2);
        }
    }
}
//checks if the piece can eat in any direction (even backwards) after it ate a piece
function multipleEatCheck(row, col, color) {
    if (isPointInBounds(row + 1, col + 1) && pieces[row + 1][col + 1] !== undefined && pieces[row + 1][col + 1].color !== color && isPointInBounds(row + 2, col + 2) && pieces[row + 2][col + 2] === undefined) {
        return true;
    }
    if (isPointInBounds(row + 1, col - 1) && pieces[row + 1][col - 1] !== undefined && pieces[row + 1][col - 1].color !== color && isPointInBounds(row + 2, col - 2) && pieces[row + 2][col - 2] === undefined) {
        return true;
    }

    if (isPointInBounds(row - 1, col + 1) && pieces[row - 1][col + 1] !== undefined && pieces[row - 1][col + 1].color !== color && isPointInBounds(row - 2, col + 2) && pieces[row - 2][col + 2] === undefined) {
        return true;
    }
    if (isPointInBounds(row - 1, col - 1) && pieces[row - 1][col - 1] !== undefined && pieces[row - 1][col - 1].color !== color && isPointInBounds(row - 2, col - 2) && pieces[row - 2][col - 2] === undefined) {
        return true;
    }
    return false;
}
//and if it can eat it paints the possible eat
function multipleEatPaint(row, col, color) {
    if (isPointInBounds(row + 1, col + 1) && pieces[row + 1][col + 1] !== undefined && pieces[row + 1][col + 1].color !== color && isPointInBounds(row + 2, col + 2) && pieces[row + 2][col + 2] === undefined) {
        paintPossibleEat(row + 1, col + 1);
        paintPossibleAfterEat(row + 2, col + 2);
    }
    if (isPointInBounds(row + 1, col - 1) && pieces[row + 1][col - 1] !== undefined && pieces[row + 1][col - 1].color !== color && isPointInBounds(row + 2, col - 2) && pieces[row + 2][col - 2] === undefined) {
        paintPossibleEat(row + 1, col - 1);
        paintPossibleAfterEat(row + 2, col - 2);
    }

    if (isPointInBounds(row - 1, col + 1) && pieces[row - 1][col + 1] !== undefined && pieces[row - 1][col + 1].color !== color && isPointInBounds(row - 2, col + 2) && pieces[row - 2][col + 2] === undefined) {
        paintPossibleEat(row - 1, col + 1);
        paintPossibleAfterEat(row - 2, col + 2);
    }
    if (isPointInBounds(row - 1, col - 1) && pieces[row - 1][col - 1] !== undefined && pieces[row - 1][col - 1].color !== color && isPointInBounds(row - 2, col - 2) && pieces[row - 2][col - 2] === undefined) {
        paintPossibleEat(row - 1, col - 1);
        paintPossibleAfterEat(row - 2, col - 2);
    }
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