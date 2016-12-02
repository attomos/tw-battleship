const { HORIZONTAL, VERTICAL } = require('../constants')

const makeOverlapChecker = board => ([row, col]) => !!board[row][col]

class Ship {
  constructor(options) {
    const { width, height = 1, maximum } = options
    this.width = width
    this.height = height
    this.maximum = maximum
  }

  getSurroundings(board, position, line) {
    const [row, col] = position
    const result = []
    const minIndex = 0
    const maxIndex = board[0].length - 1
    const rowStart = Math.max(minIndex, row - 1)
    const rowEnd = Math.min(maxIndex, row + this.height)
    const colStart = Math.max(minIndex, col - 1)
    const colEnd = Math.min(maxIndex, col + this.width)

    for (let i = rowStart; i <= rowEnd; i += 1) {
      for (let j = colStart; j <= colEnd; j += 1) {
        if ((i < row || i >= row + this.height) || (j < col || j >= col + this.width)) {
          result.push([i, j])
        }
      }
    }
    return result
  }

  isOverlap(board, position, line = HORIZONTAL) {
    const checkOverlap = makeOverlapChecker(board)
    if (checkOverlap(position)) return true
    const surroundings = this.getSurroundings(board, position, line)
    const result = surroundings.map(checkOverlap)
    return result.some(e => e)
  }
}

module.exports = Ship
