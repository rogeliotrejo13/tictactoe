const READLINE = require("readline");
const RL = READLINE.createInterface({
    input: process.stdin,
    output: process.stdout
});
const PLAYER_ONE = 'X';
const PLAYER_TWO = 'O';
const BOARD_MAPPING = {1: [0,0], 2: [0,1], 3: [0,2], 4: [1,0], 5: [1,1], 6: [1,2], 7: [2,0], 8: [2,1], 9: [2,2]}
const BOARD_CREATION_MESSAGE = "Game Board Creation...";
const BOARD_CREATED_MESSAGE = "Board Created.";
const START_GAME_MESSAGE = "The game will start with player "+PLAYER_ONE;
const PLAY_GAME_MESSAGE = "Please choice a number to play:";
const PLAY_ERROR_MESSAGE = "Please type a number from 1-9 available in game board."
const GAME_OVER_MESSAGE = "Final Board - Game Over";
const END_GAME_MESSAGE =   ["PLAYER " + PLAYER_TWO + " WON!", "PLAYER " + PLAYER_ONE + " WON!", "GAME ENDS WITH A DRAW!"];
const PLAYER_ONE_MOVEMENT_MESSAGE = "Game board movement, player "+PLAYER_ONE;
const PLAYER_TWO_MOVEMENT_MESSAGE = "Game board movement, player "+PLAYER_TWO;
const THINKING_MESSAGE = "Thinking...";
const LOWEST_NUMBER_BOARD = 1;
const HIGHEST_NUMBER_BOARD = 9;
const LINE_BREAK = "\n";
const ROUND_SECONDS = 2;
const WIN = 1;
const LOSE = 0;
const DRAW = 2;
const NUMBER_TO_WIN = 3;
const DEFAULT_SYMBOL_WIN_MAPPING = '*';
const WIN_SCENARIOS_MAPPING = [
    [['*','*','*'],['','',''],['','','']],
    [['','',''],['*','*','*'],['','','']],
    [['','',''],['','',''],['*','*','*']],
    [['*','',''],['*','',''],['*','','']],
    [['','*',''],['','*',''],['','*','']],
    [['','','*'],['','','*'],['','','*']],
    [['*','',''],['','*',''],['','','*']],
    [['','','*'],['','*',''],['*','','']]
];
  
var sleep = require('sleep');
var board = [[1,2,3],[4,5,6],[7,8,9]];
var gamePlays = 0;

function tictactoe() {
    printMessage(BOARD_CREATION_MESSAGE);
    printMessage(getStringBoard(board));    
    printMessage(BOARD_CREATED_MESSAGE);
    printMessage(START_GAME_MESSAGE);  
    play();
}

function play(){
    let gameOver = null;
    RL.question(PLAY_GAME_MESSAGE, function(number) { 
        if(!validateInputNumber(number) || !validateReplaceNumber(number)){
            printMessage(PLAY_ERROR_MESSAGE);         
            return play();
        }     
        gameOver = round(number);
        if(!gameOver){
            return play();
        }
    });
}

function round(number){
    replaceInputInBoard(number,PLAYER_ONE);
    printMessage(PLAYER_ONE_MOVEMENT_MESSAGE);
    printMessage(getStringBoard(board));
    gameOver = finishGame(PLAYER_ONE);
    if(!gameOver){
        randomPlay();  
        printMessage(PLAYER_TWO_MOVEMENT_MESSAGE);
        printMessage(getStringBoard(board));
        gameOver = finishGame(PLAYER_TWO);
    }
    return gameOver;
}

function finishGame(player){
    gameOver = endGame(player);
    if(gameOver === LOSE || gameOver === WIN || gameOver === DRAW){
        RL.close();
        printMessage(GAME_OVER_MESSAGE);
        printMessage(getStringBoard(board));
        printMessage(END_GAME_MESSAGE[gameOver]);
        return true;
    }
    return false;
}

function randomPlay(){
    let randomNumber = 0;
    do{
        randomNumber = Math.floor(Math.random() * HIGHEST_NUMBER_BOARD) + LOWEST_NUMBER_BOARD;
        printMessage(THINKING_MESSAGE);
    }while(!replaceInputInBoard(randomNumber,PLAYER_TWO) && gamePlays < HIGHEST_NUMBER_BOARD);
    sleep.sleep(ROUND_SECONDS);
}

function replaceInputInBoard(number,value){
    let positions = BOARD_MAPPING[number];
    if(validateReplaceNumber(number)){
        board[positions[0]][positions[1]] = value;
        gamePlays++;
        return true;
    }
    return false;
}

function endGame(player){
    if(gamePlays>=HIGHEST_NUMBER_BOARD){return 2;}
    let isPlayerWinner = winnerMovementValidator(player, board);
    return isPlayerWinner;
}

function winnerMovementValidator(player, board){
    let winner = false;
    let winnerCounter = 0;
    let drawCounter = 0;

    for(let i = 0; i < WIN_SCENARIOS_MAPPING.length; i++){
        winnerCounter = 0;
        drawCounter = 0;
        for(let j = 0; j < WIN_SCENARIOS_MAPPING[i].length; j++){
            for(let k = 0; k < WIN_SCENARIOS_MAPPING[i][j].length; k++){
                if(WIN_SCENARIOS_MAPPING[i][j][k] === DEFAULT_SYMBOL_WIN_MAPPING && board[j][k] === player){
                    winnerCounter ++;
                }
                if(board[j][k] == PLAYER_ONE || board[j][k] == PLAYER_TWO){
                    drawCounter ++;
                }
            }            
        }
        if(winnerCounter == NUMBER_TO_WIN){
            if(player == PLAYER_ONE){winner = 1;}
            if(player == PLAYER_TWO){winner = 0;}
            break;
        }         
    }
    if(drawCounter>=HIGHEST_NUMBER_BOARD){winner = 2;}    
    return winner;
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
module.exports = {getStringBoard, winnerMovementValidator, validateInputNumber};
