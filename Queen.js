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
            if (pieces[x][y] && pieces[x][y].color === color) break;
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
            if (pieces[x][y] && pieces[x][y].color === color) break;
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
