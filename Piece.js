class Piece {
    constructor(color) {
        this.color = color;
        this.isQueen = false;
    }
}
class Queen {
    constructor(color) {
        this.color = color;
        this.isQueen = true; //can't find another way to check if the piece is a queen
    }
}
function QueenMovement(row, col, color) {
    let x, y;
    for (let i = 0; i < queenXArray.length; i++) {
        x = row + queenXArray[i];
        y = col + queenYArray[i];
        for (let j = 0; j < TABLE_SIZE; j++) {
            if (!isPointInBounds(x, y)) break;

            if (pieces[x][y] && pieces[x][y].color !== undefined) break;
            //else if the cell is empty
            paintPossibleMove(x, y);
            x += queenXArray[i];
            y += queenYArray[i];
        }
    }
}
function QueenCheckMove(row, col, color) {
    let x, y;
    for (let i = 0; i < queenXArray.length; i++) {
        x = row + queenXArray[i];
        y = col + queenYArray[i];
        for (let j = 0; j < TABLE_SIZE; j++) {
            if (!isPointInBounds(x, y)) break;

            if (pieces[x][y] && pieces[x][y].color !== undefined) break;
            //else if the cell is empty
            return true;
            x += queenXArray[i];
            y += queenYArray[i];
        }
    }
    return false;
}
function QueenOnlyEat(row, col, color) {
    let x, y;
    for (let i = 0; i < queenXArray.length; i++) {
        x = row + queenXArray[i];
        y = col + queenYArray[i];
        for (let j = 0; j < TABLE_SIZE; j++) {
            if (!isPointInBounds(x, y)) break;

            if (pieces[x][y] && pieces[x][y].color !== color) {
                x += queenXArray[i];
                y += queenYArray[i];
                if (isPointInBounds(x, y) && pieces[x][y] === undefined) {
                    paintPossibleAfterEat(x, y);
                    paintPossibleEat(x - queenXArray[i], y - queenYArray[i]);
                }
                break;
            }
            //else if the cell is empty
            x += queenXArray[i];
            y += queenYArray[i];
        }
    }
}
function QueenPossibleEat(row, col, color) {
    let x, y;
    for (let i = 0; i < queenXArray.length; i++) {
        x = row + queenXArray[i];
        y = col + queenYArray[i];
        for (let j = 0; j < TABLE_SIZE; j++) {
            if (!isPointInBounds(x, y)) break;

            if (pieces[x][y] && pieces[x][y].color !== color) {
                x += queenXArray[i];
                y += queenYArray[i];
                if (isPointInBounds(x, y) && pieces[x][y] === undefined) {
                    return true;
                }
                break;
            }
            //else if the cell is empty
            x += queenXArray[i];
            y += queenYArray[i];
        }
    }
    return false;
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