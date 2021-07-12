const tictactoe = require('../src/tictactoe');

test('Win', () => {
  expect(tictactoe([])).toBe(true);
});

test('Lose', () => {
    expect(tictactoe([])).toBe(true);
});

test('Tie', () => {
    expect(tictactoe([])).toBe(true);
});