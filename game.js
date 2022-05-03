//global varibales declerations
let selectedCell;      //indicates the current selected cell
let selectedPieceCell; //indicates the cell of the selected piece
let pieces = [];
let currentPiece;
let anotherPieceCanEat = false;
let gameOver = false;
let pieceJustAte = false;
const htmlTable = document.createElement('table');
const TABLE_SIZE = 8;
const RED_PLAYER = 'red';
const BLACK_PLAYER = 'black';
const RED_STARTING_ROW = 5;
const BLACK_STARTING_ROW = 0;
const RED_QUEEN_ROW = 0;
const BLACK_QUEEN_ROW = 7;
const PIECES_AMOUNT = 12;
const queenXArray = [1, 1, -1, -1]; //all queen possible movies in this 2 arrays
const queenYArray = [1, -1, -1, 1];

function onCellClick(e) {
    selectedCell = e.currentTarget;

    if (selectedPieceCell === undefined && pieces[e.currentTarget.parentNode.rowIndex][e.currentTarget.cellIndex] !== undefined && game.currentTurn === pieces[e.currentTarget.parentNode.rowIndex][e.currentTarget.cellIndex].color) {
        currentPiece = pieces[selectedCell.parentNode.rowIndex][selectedCell.cellIndex];
        selectedPieceCell = e.currentTarget; //saves the cell of the selected piece

        //checks if the current piece the player clicked on can eat. Here if the piece is queen
        if (currentPiece.isQueen && QueenPossibleEat(selectedCell.parentNode.rowIndex, selectedCell.cellIndex, game.currentTurn)) {
            selectedCell.classList.add('selected');
            QueenOnlyEat(selectedCell.parentNode.rowIndex, selectedCell.cellIndex, currentPiece.color);
        }
        //And here if the piece is regular
        else if (checkPossibleEat(selectedCell.parentNode.rowIndex, selectedCell.cellIndex, game.currentTurn)) {
            selectedCell.classList.add('selected');
            onlyPossibleEat(selectedCell.parentNode.rowIndex, selectedCell.cellIndex, currentPiece.color);
        }
        //if the piece you clicked on can't eat, this 'else' checks if there is any other piece in your color that can eat
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
            //if there isn't another piece that can eat, show the possible moves of the current piece
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
    //if the player clicked on a possible move
    else if (selectedCell.classList.contains('possibleMove')) {
        let row = selectedPieceCell.parentNode.rowIndex; //selectedCell contains the cell of the piece from the previous click
        let col = selectedPieceCell.cellIndex;
        selectedPieceCell.classList.remove('checker-' + currentPiece.color);
        selectedPieceCell.classList.remove('addQueen');
        pieces[row][col] = undefined;

        //now selectedCell contains the clicked on cell
        row = selectedCell.parentNode.rowIndex;
        col = selectedCell.cellIndex;
        pieces[row][col] = currentPiece;
        selectedCell.classList.add('checker-' + currentPiece.color);
        if (currentPiece.isQueen)
            selectedCell.classList.add('addQueen');
        unpaintAllCells();
        isPieceQueen(e.currentTarget.parentNode.rowIndex, e.currentTarget.cellIndex, currentPiece.color);
        selectedPieceCell = undefined;
        if (isGameOver()) {
            gameover = true;
            didIWin();
            return;
        }
        passTheTurn();
    }
    else if (selectedCell.classList.contains('possibleAfterEat')) {
        let row = selectedPieceCell.parentNode.rowIndex; //selectedCell contains the cell of the piece from the previous click
        let col = selectedPieceCell.cellIndex;
        pieces[row][col] = undefined;
        selectedPieceCell.classList.remove('checker-' + currentPiece.color);
        selectedPieceCell.classList.remove('addQueen');

        //now selectedCell contains the clicked on cell
        row = selectedCell.parentNode.rowIndex;
        col = selectedCell.cellIndex;
        selectedCell.classList.add('checker-' + currentPiece.color);
        if (currentPiece.isQueen)
            selectedCell.classList.add('addQueen');
        pieces[row][col] = currentPiece;
        removeEatenPiece();
        unpaintAllCells();
        game.currentTurn === RED_PLAYER ? game.blackEaten++ : game.redEaten++; //keeps count of the amount of eaten pieces for each color 
        //checks if there is another possible
        if (checkPossibleEat(row, col, pieces[row][col].color)) {
            pieceJustAte = true;
            onlyPossibleEat(row, col, pieces[row][col].color);
            selectedPieceCell = selectedCell;
            return;
        }

        isPieceQueen(e.currentTarget.parentNode.rowIndex, e.currentTarget.cellIndex, currentPiece.color);
        selectedPieceCell = undefined;
        if (isGameOver()) {
            gameover = true;
            if (didIWin())
                return;
        }
        pieceJustAte = false;
        passTheTurn();
    }
    //when clicking on another piece while one is alreay selected
    else if (selectedPieceCell !== undefined && !pieceJustAte) {
        unpaintAllCells();
        selectedPieceCell = undefined;
        onCellClick(e);
    }
}

function unpaintAllCells() {
    for (let i = 0; i < TABLE_SIZE; i++) {
        for (let j = 0; j < TABLE_SIZE; j++) {
            htmlTable.rows[i].cells[j].classList.remove('possibleEat');
            htmlTable.rows[i].cells[j].classList.remove('selected');
            htmlTable.rows[i].cells[j].classList.remove('possibleMove');
            htmlTable.rows[i].cells[j].classList.remove('possibleAfterEat');
        }
    }
}
function removeEatenPiece() {
    for (let i = 0; i < TABLE_SIZE; i++) {
        for (let j = 0; j < TABLE_SIZE; j++) {
            if (htmlTable.rows[i].cells[j].classList.contains('possibleEat')) {
                let opponentColor = game.currentTurn === BLACK_PLAYER ? RED_PLAYER : BLACK_PLAYER;
                htmlTable.rows[i].cells[j].classList.remove('checker-' + opponentColor);
                htmlTable.rows[i].cells[j].classList.remove('addQueen');
                pieces[i][j] = undefined;
                htmlTable.rows[i].cells[j].classList.remove('possibleEat');
            }
        }
    }
}
function passTheTurn() {
    game.currentTurn = game.currentTurn === BLACK_PLAYER ? RED_PLAYER : BLACK_PLAYER;
}
//checks if the piece reached the end of the board
function isPieceQueen(row, col, color) {
    let currentRowForQueen = color === BLACK_PLAYER ? BLACK_QUEEN_ROW : RED_QUEEN_ROW
    if (row === currentRowForQueen) {
        pieces[row][col].isQueen = true;
        selectedCell.classList.add('addQueen');
    }
}
//checks if at least one of the enemy pieces can move or the game is over
function isGameOver() {
    for (let i = 0; i < TABLE_SIZE; i++) {
        for (let j = 0; j < TABLE_SIZE; j++) {
            if (pieces[i][j] !== undefined && pieces[i][j].color !== game.currentTurn) {
                if (!pieces[i][j].isQueen && (checkPossibleMove(i, j, pieces[i][j].color) || checkPossibleEat(i, j, pieces[i][j].color))) { //checking if at least one of the opponnents pieces can move
                    return false;
                }
                if (pieces[i][j].isQueen && (QueenPossibleEat(i, j, pieces[i][j].color) || QueenCheckMove(i, j, pieces[i][j].color))) {
                    return false;
                }
            }
        }
    }
    return true;
}
//checks if any of the terms for the game to end are true. if at least one is true the game is over and a massage pops up 
function didIWin() {
    if (game.redEaten === PIECES_AMOUNT || game.blackEaten === PIECES_AMOUNT || gameover) {
        const winnerPopup = document.createElement('div');
        const winner = game.currentTurn.charAt(0).toUpperCase() + game.currentTurn.slice(1);
        winnerPopup.textContent = winner + ' is the bigger nerd!';
        winnerPopup.classList.add('winner-dialog');
        button = document.createElement("BUTTON");
        button.innerHTML = "Play Again?";
        button.classList.add('button');
        button.addEventListener("click", reloadGame);
        htmlTable.appendChild(winnerPopup);
        winnerPopup.appendChild(button);
        //to disable clicking on pieces
        for (let i = 0; i < TABLE_SIZE; i++) {
            pieces[i] = undefined;
        }
        return true;
    }
}
function reloadGame() {
    window.location.reload();
}
game = new BoardData();
window.addEventListener('load', game.initCheckersGame);