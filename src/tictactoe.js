const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var board = [['1','2','3'], ['4','5','6'], ['7','8','9']];
function tictactoe(board) {
    console.log("Game Board Creation...");
    console.log(printBoard(board));    
    console.log("Board Created.");
    console.log("The game will start with player X");  
    play(board);

}

function play(board){
    rl.question("Please choice a number to play:", function(number) {
        console.log(`${number}`);
        printBoard(board);
        if(endGame(board)){
            rl.close();
            console.log("Game Over");
        }else{
            play(board);
        }
    });
    rl.close();
}

function endGame(board){
    return 1;
}

function printBoard(board){    
   return board[0] + "\n" + board[1] + "\n" + board[2]; 
}

tictactoe(board);
module.exports = {printBoard, endGame};