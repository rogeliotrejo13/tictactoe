const tictactoe = require('../src/tictactoe');

test('Board Creation', () => {
  expect(tictactoe.printBoard([['1','2','3'], ['4','5','6'], ['7','8','9']])).toBe('1,2,3\n4,5,6\n7,8,9'); 
});

test('WIN', () => {
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