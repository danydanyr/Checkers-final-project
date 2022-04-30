const htmlTable = document.createElement('table');
const TABLE_SIZE = 8;
let pieces = [];
const RED_PLAYER = 'red';
const BLACK_PLAYER = 'black';
const RED_STARTING_ROW = 5;
const BLACK_STARTING_ROW = 0;

function onCellClick(e){

}
game = new BoardData();
window.addEventListener('load', game.initCheckersGame);