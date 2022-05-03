
//all functions works so that x and y indicate the direction/diagonal that the queen can move in, and the functions check a different direction/diagonal every for-run
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
//this function excists to check if the queen (as well as the rest of the pieces in the same color) can move in order to identify if the game has ended (when none of the pieces can move)
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
//even if the piece can move a different direction, the piece HAS to eat
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
//to check if any of the pieces on the board can eat
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
