const READLINE = require("readline");
const RL = READLINE.createInterface({
    input: process.stdin,
    output: process.stdout
});
const PLAYER_1 = 'X';
const PLAYER_2 = 'O';
const BOARD_MAPPING = {1: [0,0], 2: [0,1], 3: [0,2], 4: [1,0], 5: [1,1], 6: [1,2], 7: [2,0], 8: [2,1], 9: [2,2]}
const BOARD_CREATION_MESSAGE = "Game Board Creation...";
const BOARD_CREATED_MESSAGE = "Board Created.";
const START_GAME_MESSAGE = "The game will start with player X";
const PLAY_GAME_MESSAGE = "Please choice a number to play:";
const PLAY_ERROR_MESSAGE = "Please type a number from 1-9 available in game board."
const GAME_OVER_MESSAGE = "Game Over";
const PLAYER_1_MOVEMENT_MESSAGE = "Game board movement, player "+PLAYER_1;
const PLAYER_2_MOVEMENT_MESSAGE = "Game board movement, player "+PLAYER_2;
const THINKING_MESSAGE = "Thinking...";
const LOWEST_NUMBER_BOARD = 1;
const HIGHEST_NUMBER_BOARD = 9;
const LINE_BREAK = "\n";

var board = [[1,2,3],[4,5,6],[7,8,9]];

function tictactoe() {
    printMessage(BOARD_CREATION_MESSAGE);
    printMessage(getStringBoard(board));    
    printMessage(BOARD_CREATED_MESSAGE);
    printMessage(START_GAME_MESSAGE);  
    play();
}

function play(){
    RL.question(PLAY_GAME_MESSAGE, function(number) { 
        if(!validateInputNumber(number) || !validateReplaceNumber(number)){
            printMessage(PLAY_ERROR_MESSAGE);         
            return play();
        }     
        round(number);
        if(endGame(board)){
            RL.close();
            printMessage(GAME_OVER_MESSAGE);
        }else{
            return play();
        }
    });
}

function round(number){
    replaceInputInBoard(number,PLAYER_1);
    printMessage(PLAYER_1_MOVEMENT_MESSAGE);
    printMessage(getStringBoard(board));
    randomPlay();      
    printMessage(PLAYER_2_MOVEMENT_MESSAGE);
    printMessage(getStringBoard(board));
}

function randomPlay(){
    let randomNumber = 0;
    do{
        randomNumber = Math.floor(Math.random() * 9) + 1;
        printMessage(THINKING_MESSAGE);
    }while(!replaceInputInBoard(randomNumber,PLAYER_2));
}

function replaceInputInBoard(number,value){
    let positions = BOARD_MAPPING[number];
    if(validateReplaceNumber(number)){
        board[positions[0]][positions[1]] = value;
        return true;
    }
    return false;
}

function endGame(board){
    return false;
}

function validateReplaceNumber(number){
    let positions = BOARD_MAPPING[number];
    return parseInt(board[positions[0]][positions[1]]) === parseInt(number);
}

function validateInputNumber(number){
    return Number.isInteger(parseInt(number)) && number>=LOWEST_NUMBER_BOARD && number<=HIGHEST_NUMBER_BOARD;
}

function getStringBoard(board){    
   boardString = board[0] + LINE_BREAK + board[1] + LINE_BREAK + board[2];
   return boardString; 
}

function printMessage(message){
    console.log(message);
}

tictactoe(board);
module.exports = {getStringBoard, endGame, validateInputNumber};