class BoardData {
    constructor() {
        this.currentTurn = RED_PLAYER;
        this.redEaten = 0;
        this.blackEaten = 0;
    }

    initCheckersGame() {

        document.body.appendChild(htmlTable);
        for (let i = 0; i < TABLE_SIZE; i++) {
            const row = htmlTable.insertRow();
            for (let j = 0; j < TABLE_SIZE; j++) {
                const cell = row.insertCell();
                if ((i + j) % 2 == 0)
                    cell.className = 'white-cell';
                else
                    cell.className = 'brown-cell';

                cell.addEventListener('click', onCellClick);
            }
        }
        createInitialBoard();
    }

}
function createInitialBoard() {
    //initialising the pieces matrix
    for (let i = 0; i < TABLE_SIZE; i++) {
        pieces[i] = [];
    }
    //filling undefined in the right places
    for (let i = 0; i < TABLE_SIZE; i++) {
        for (let j = 0; j < TABLE_SIZE; j++) {
            if (htmlTable.rows[i].cells[j].classList.contains('white-cell')) {
                pieces[i][j] = undefined;
            }
            if (i === 3 || 4 || 5) {
                pieces[i][j] = undefined;
            }
        }
    }
    addPieces(RED_PLAYER);
    addPieces(BLACK_PLAYER);
}
function addPieces(color) {
    let row = color == RED_PLAYER ? RED_STARTING_ROW : BLACK_STARTING_ROW;
    for (let i = row; i < row + 3; i++) {
        for (let j = 0; j < TABLE_SIZE; j++) {
            if (htmlTable.rows[i].cells[j].classList.contains('brown-cell')) {
                htmlTable.rows[i].cells[j].classList.add('checker-' + color);
                pieces[i][j] = new Piece(color);
            }
        }
    }
}