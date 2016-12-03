const _ = require('lodash')
const { BOARD_SIZE, HORIZONTAL, VERTICAL } = require('../constants')
const fleets = require('../helpers/fleets')

const fleetsKeys = Object.keys(fleets)
const fleetsArray = fleetsKeys.map(key => fleets[key])
const totalShips = _(fleetsArray)
  .map(ship => ship.maximum)
  .sum()

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

function hitOrSank(board, moves, sankShipIds, ships, [row, col]) {
  const position = [row, col]
  let result = 'Hit'
  const findPosition = ship => _.find(ship.positions, p => _.isEqual(p, position))
  const s = _.find(ships, findPosition)
  const index = _.findIndex(ships, findPosition)

  const shipName = s.ship.name
  if (shipName === 'Submarine') {
    const found = _.find(s.positions, pos => _.isEqual(pos, position))
    if (found) {
      result = `You just sank the ${shipName}`
      sankShipIds.push(index)
    }
  } else {
    const merged = _.concat(moves, [position])
    let sank = true
    _.forEach(s.positions, (pos) => {
      const found = _.find(merged, e => _.isEqual(pos, e))
      if (!found) {
        sank = false
      }
    })
    if (sank) {
      result = `You just sank the ${shipName}`
      sankShipIds.push(index)
    }
  }
  return result
}

function attack(board, moves, sankShipIds, ships, [row, col]) {
  const position = [row, col]
  moves.push(position)
  if (board[row][col] === 1) {
    return hitOrSank(board, moves, sankShipIds, ships, [row, col])
  }
  return 'Miss'
}

const makeAttacker = (board, moves, sankShipIds, ships) =>
  (...position) => attack(board, moves, sankShipIds, ships, position)

const isWin = sankShipIds => _.uniq(sankShipIds).length === totalShips

function getWinMessage(moves) {
  return `Win! You completed the game in ${moves.length} moves`
}

/**
 * Place ships randomly, then return { board, ships } object.
 */
function initBoard() {
  let board = createEmptyBoard(BOARD_SIZE)
  const ships = []
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
        const positions = ship.getPositions(position, line)
        ships.push({
          ship,
          positions,
          line,
        })
        board = tmpBoard
        count += 1
      }
    }
  })
  return {
    board,
    ships,
  }
}

module.exports = {
  attack,
  createEmptyBoard,
  getWinMessage,
  initBoard,
  isOverflow,
  isWin,
  makeAttacker,
  placeShip,
}
