//global varibales declerations
let selectedCell;
let pieces = [];
let currentPiece;
let anotherPieceCanEat = false;
let gameOver = false;
const htmlTable = document.createElement('table');
const TABLE_SIZE = 8;
const RED_PLAYER = 'red';
const BLACK_PLAYER = 'black';
const RED_STARTING_ROW = 5;
const BLACK_STARTING_ROW = 0;
const RED_QUEEN_ROW = 0;
const BLACK_QUEEN_ROW = 7;
const PIECES_AMOUNT = 12;
const queenXArray = [1, -1, 1, -1];                //all queen possible movies in this 2 arrays
const queenYArray = [1, -1, -1, 1];

function onCellClick(e) {

    if (selectedCell === undefined && pieces[e.currentTarget.parentNode.rowIndex][e.currentTarget.cellIndex] !== undefined && game.currentTurn === pieces[e.currentTarget.parentNode.rowIndex][e.currentTarget.cellIndex].color) {
        selectedCell = e.currentTarget;
        currentPiece = pieces[selectedCell.parentNode.rowIndex][selectedCell.cellIndex];

        if (currentPiece.isQueen && QueenPossibleEat(selectedCell.parentNode.rowIndex, selectedCell.cellIndex, game.currentTurn)) {
            selectedCell.classList.add('selected');
            QueenOnlyEat(selectedCell.parentNode.rowIndex, selectedCell.cellIndex, currentPiece.color);
        }
        else if (checkPossibleEat(selectedCell.parentNode.rowIndex, selectedCell.cellIndex, game.currentTurn)) {
            selectedCell.classList.add('selected');
            onlyPossibleEat(selectedCell.parentNode.rowIndex, selectedCell.cellIndex, currentPiece.color);
        }
        else {
            for (let i = 0; i < TABLE_SIZE; i++) {
                for (let j = 0; j < TABLE_SIZE; j++) {
                    if (pieces[i][j] !== undefined && pieces[i][j].color === game.currentTurn) {
                        if (checkPossibleEat(i, j, game.currentTurn) || (pieces[i][j].isQueen && QueenPossibleEat(i, j, game.currentTurn))) {
                            anotherPieceCanEat = true;
                            htmlTable.rows[i].cells[j].classList.add('highlightCorrectPieces');
                            setTimeout(() => {                                                          //flashing the cell/s to indicate the piece/s you need to move with (the piece/s that can eat)
                                htmlTable.rows[i].cells[j].classList.remove('highlightCorrectPieces');
                            }, 1300);
                        }
                    }
                }
            }
            if (!anotherPieceCanEat) {
                selectedCell.classList.add('selected');
                if (!currentPiece.isQueen)
                    pieceMovement(selectedCell.parentNode.rowIndex, selectedCell.cellIndex, currentPiece.color);
                else
                    QueenMovement(selectedCell.parentNode.rowIndex, selectedCell.cellIndex, currentPiece.color);
            }
            anotherPieceCanEat = false;
        }
    }
    else if (e.currentTarget.classList.contains('possibleMove')) {
        let row = selectedCell.parentNode.rowIndex; //selectedCell contains the cell of the piece from the previous click
        let col = selectedCell.cellIndex;
        selectedCell.classList.remove('checker-' + currentPiece.color);
        selectedCell.classList.remove('addQueen');
        pieces[row][col] = undefined;

        selectedCell = e.currentTarget; //now selectedCell contains the clicked on cell
        row = selectedCell.parentNode.rowIndex;
        col = selectedCell.cellIndex;
        pieces[row][col] = currentPiece;
        selectedCell.classList.add('checker-' + currentPiece.color);
        if (currentPiece.isQueen)
            selectedCell.classList.add('addQueen');
        unpaintAllCells();
        isPieceQueen(e.currentTarget.parentNode.rowIndex, e.currentTarget.cellIndex, currentPiece.color);
        selectedCell = undefined;
        if (isGameOver()) {
            gameover = true;
            didIWin();
            return;
        }
        passTheTurn();
    }
    else if (e.currentTarget.classList.contains('possibleAfterEat')) {
        let row = selectedCell.parentNode.rowIndex; //selectedCell contains the cell of the piece from the previous click
        let col = selectedCell.cellIndex;
        pieces[row][col] = undefined;
        selectedCell.classList.remove('checker-' + currentPiece.color);
        selectedCell.classList.remove('addQueen');

        selectedCell = e.currentTarget; //now selectedCell contains the clicked on cell
        let newRow = selectedCell.parentNode.rowIndex;
        let newCol = selectedCell.cellIndex;
        let x = (newRow - row) - ((newRow - row) / 2); //I'm checking where is the eaten piece located/what is the direction of the eaten piece from the piece that ate it
        let y = (newCol - col) - ((newCol - col) / 2);
        let opponentColor = currentPiece.color === BLACK_PLAYER ? RED_PLAYER : BLACK_PLAYER;
        htmlTable.rows[row + x].cells[col + y].classList.remove('checker-' + opponentColor); //removing the eaten piece by adding the direction (x,y) to the row and column of the piece that ate it
        selectedCell.classList.add('checker-' + currentPiece.color);
        if (currentPiece.isQueen)
            selectedCell.classList.add('addQueen');
        pieces[newRow][newCol] = currentPiece;
        pieces[row + x][col + y] = undefined;
        unpaintAllCells();
        isPieceQueen(e.currentTarget.parentNode.rowIndex, e.currentTarget.cellIndex, currentPiece.color);
        selectedCell = undefined;
        game.currentTurn === RED_PLAYER ? game.blackEaten++ : game.redEaten++; //keeps count of the amount of eaten pieces for each color 
        if (isGameOver()) {
            gameover = true;
            if (didIWin())
                return;
        }
        passTheTurn();
    }
    else if (selectedCell !== undefined) { //when clicking on another piece while one is alreay selected
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
            htmlTable.rows[i].cells[j].classList.remove('possibleAfterEat');
        }
    }
}
function passTheTurn() {
    game.currentTurn = game.currentTurn === BLACK_PLAYER ? RED_PLAYER : BLACK_PLAYER;
}
function isPieceQueen(row, col, color) {
    let currentRowForQueen = color === BLACK_PLAYER ? BLACK_QUEEN_ROW : RED_QUEEN_ROW
    if (row === currentRowForQueen) {
        pieces[row][col] = new Queen(color);
        selectedCell.classList.add('addQueen');
    }
}
function isGameOver() {
    for (let i = 0; i < TABLE_SIZE; i++) {
        for (let j = 0; j < TABLE_SIZE; j++) {
            if (pieces[i][j] !== undefined && pieces[i][j].color !== game.currentTurn) {
                if (checkPossibleMove(i, j, pieces[i][j].color) || checkPossibleEat(i, j, pieces[i][j].color)) { //checking if at least one of the opponnents pieces can move
                    return false;
                }
            }
        }
    }
    return true;
}
function didIWin() {
    if (game.redEaten === PIECES_AMOUNT || game.blackEaten === PIECES_AMOUNT || gameOver) {
        const winnerPopup = document.createElement('div');
        const winner = game.currentTurn.charAt(0).toUpperCase() + game.currentTurn.slice(1);
        winnerPopup.textContent = winner + ' is the bigger nerd!';
        winnerPopup.classList.add('winner-dialog');
        button = document.createElement("BUTTON");
        button.innerHTML = "Play Again?";
        button.classList.add('button');
        button.addEventListener("click", reloadgame);
        htmlTable.appendChild(winnerPopup);
        winnerPopup.appendChild(button);
        return true;
    }
}
function reloadgame() {
    window.location.reload();
}
game = new BoardData();
window.addEventListener('load', game.initCheckersGame);