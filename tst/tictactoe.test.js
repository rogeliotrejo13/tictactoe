const tictactoe = require('../src/tictactoe');

test('Board Creation', () => {
  expect(tictactoe.getStringBoard([[1,2,3],[4,5,6],[7,8,9]])).toBe('1,2,3\n4,5,6\n7,8,9'); 
});

test('Win', () => {
  expect(tictactoe.endGame([['X','X','X'],['','',''],['','','']])).toBe(1);
  expect(tictactoe.endGame([['','',''],['X','X','X'],['','','']])).toBe(1);
  expect(tictactoe.endGame([['','',''],['','',''],['X','X','X']])).toBe(1);
  expect(tictactoe.endGame([['X','',''],['X','',''],['X','','']])).toBe(1);
  expect(tictactoe.endGame([['','X',''],['','X',''],['','X','']])).toBe(1);
  expect(tictactoe.endGame([['','','X'],['','','X'],['','','X']])).toBe(1);
  expect(tictactoe.endGame([['X','',''],['','X',''],['','','X']])).toBe(1);
  expect(tictactoe.endGame([['','','X'],['','X',''],['X','','']])).toBe(1);
});

test('Lose', () => {
  expect(tictactoe.endGame([['O','O','O'],['','',''],['','','']])).toBe(0);
  expect(tictactoe.endGame([['','',''],['O','O','O'],['','','']])).toBe(0);
  expect(tictactoe.endGame([['','',''],['','',''],['O','O','O']])).toBe(0);
  expect(tictactoe.endGame([['O','',''],['O','',''],['O','','']])).toBe(0);
  expect(tictactoe.endGame([['','O',''],['','O',''],['','O','']])).toBe(0);
  expect(tictactoe.endGame([['','','O'],['','','O'],['','','O']])).toBe(0);
  expect(tictactoe.endGame([['O','',''],['','O',''],['','','O']])).toBe(0);
  expect(tictactoe.endGame([['','','O'],['','O',''],['O','','']])).toBe(0);
});

test('Draw', () => {
  expect(tictactoe.endGame([['X','O','X'],['O','O','X'],['X','X','O']])).toBe(2);
});

test('Validate Input Number', () => {
  expect(tictactoe.validateInputNumber(1)).toBe(true);
  expect(tictactoe.validateInputNumber(2)).toBe(true);
  expect(tictactoe.validateInputNumber(3)).toBe(true);
  expect(tictactoe.validateInputNumber(4)).toBe(true);
  expect(tictactoe.validateInputNumber(5)).toBe(true);
  expect(tictactoe.validateInputNumber(6)).toBe(true);
  expect(tictactoe.validateInputNumber(7)).toBe(true);
  expect(tictactoe.validateInputNumber(8)).toBe(true);
  expect(tictactoe.validateInputNumber(9)).toBe(true);
  expect(tictactoe.validateInputNumber(10)).toBe(false);
  expect(tictactoe.validateInputNumber('')).toBe(false);
});