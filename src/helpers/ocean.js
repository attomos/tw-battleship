const { HORIZONTAL, VERTICAL } = require('../constants')

function placeShip(board, ship, position, line = HORIZONTAL) {
  if (ship.isOverlap(board, position)) return board
  const [row, col] = position

  const newBoard = board

  if (line === HORIZONTAL) {
    for (let i = col; i < col + ship.width; i += 1) {
      newBoard[row][i] = 1
    }
  } else if (line === VERTICAL) {
    for (let i = row; i < row + ship.width; i += 1) {
      newBoard[i][col] = 1
    }
  }

  return newBoard
}

module.exports = {
  placeShip,
}
