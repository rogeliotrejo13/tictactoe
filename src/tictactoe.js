const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const playerX = 'X';
const playerO = 'O';
var board = [[1,2,3],[4,5,6],[7,8,9]];
const boardPositionMapping = {1: [0,0], 2: [0,1], 3: [0,2], 4: [1,0], 5: [1,1], 6: [1,2], 7: [2,0], 8: [2,1], 9: [2,2]}

function tictactoe() {
    console.log("Game Board Creation...");
    console.log(printBoard(board));    
    console.log("Board Created.");
    console.log("The game will start with player X");  
    play();

}

function play(){
    rl.question("Please choice a number to play:", function(number) { 
        if(!validateInputNumber(number)){
            console.log("Please type a number from 1-9 available in game board.")            
            return play();
        }     
        replaceInputInBoard(number,playerX);
        randomPlay();      
        console.log(printBoard(board));
        if(endGame(board)){
            rl.close();
            console.log("Game Over");
            return -1;
        }else{
            return play();
        }
    });
    return -1;
}

function randomPlay(){
    let randomNumber = 0;
    do{
        randomNumber = Math.floor(Math.random() * 9) + 1;
        console.log("Thinking...")
    }while(!replaceInputInBoard(randomNumber,playerO));
}

function replaceInputInBoard(number,value){
    let positions = boardPositionMapping[number];
    if(parseInt(board[positions[0]][positions[1]]) === parseInt(number)){
        board[positions[0]][positions[1]] = value;
        return true;
    }
    return false;
}

function endGame(board){
    return false;
}

function validateInputNumber(number){
  return Number.isInteger(parseInt(number)) && number>0 && number<10;
}

function printBoard(board){    
   return board[0] + "\n" + board[1] + "\n" + board[2]; 
}

tictactoe(board);
module.exports = {printBoard, endGame, validateInputNumber};