const _ = require('lodash')
const { BOARD_SIZE, HORIZONTAL, VERTICAL } = require('../constants')
const fleets = require('../helpers/fleets')

const fleetsKeys = Object.keys(fleets)
const fleetsArray = fleetsKeys.map(key => fleets[key])

function getRandomPosition() {
  const randomRow = _.random(BOARD_SIZE - 1)
  const randomCol = _.random(BOARD_SIZE - 1)
  return [randomRow, randomCol]
}

function getRandomLine() {
  return _.random(1) === 0 ? HORIZONTAL : VERTICAL
}

function createEmptyBoard(n) {
  return _.range(n).map(() => _.fill(Array(n), 0))
}

function isOverflow(board, ship, position, line) {
  const [row, col] = position
  if (line === HORIZONTAL) {
    return col + ship.width > board.length
  }
  return row + ship.width > board.length
}

function placeShip(board, ship, position, line = HORIZONTAL) {
  if (ship.isOverlap(board, position, line)) {
    return board
  }
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

/**
 * Place ships randomly, then return { board, positions } object.
 */
function initBoard() {
  let board = createEmptyBoard(BOARD_SIZE)
  const positions = []
  fleetsArray.forEach((ship) => {
    let count = 0
    while (count < ship.maximum) {
      let position = getRandomPosition()
      let line = getRandomLine()
      while (isOverflow(board, ship, position, line)) {
        position = getRandomPosition()
        line = getRandomLine()
      }
      const before = _.cloneDeep(board)
      const tmpBoard = placeShip(board, ship, position, line)
      if (!_.isEqual(before, tmpBoard)) { // place each ship to its maximum
        positions.push({
          ship,
          position,
          line,
        })
        board = tmpBoard
        count += 1
      }
    }
  })
  return {
    board,
    positions,
  }
}

module.exports = {
  createEmptyBoard,
  initBoard,
  isOverflow,
  placeShip,
}
