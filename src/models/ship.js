const { HORIZONTAL, VERTICAL } = require('../constants')

const makeOverlapChecker = board => ([row, col]) => !!board[row][col]

class Ship {
  constructor(options) {
    const { width, height = 1, maximum } = options
    this.width = width
    this.height = height
    this.maximum = maximum
  }

  getSurroundings(board, [row, col], line) {
    const result = []
    const minIndex = 0
    const maxIndex = board[0].length - 1
    const rowStart = Math.max(minIndex, row - 1)
    const rowEnd = Math.min(maxIndex, row + 1)
    const colStart = Math.max(minIndex, col - 1)
    const colEnd = Math.min(maxIndex, col + 1)

    // console.log('----------------------------')
    // console.log(rowStart, rowEnd)
    // console.log(colStart, colEnd)
    // console.log('----------------------------')

    for (let i = rowStart; i <= rowEnd; i += 1) {
      for (let j = colStart; j <= colEnd; j += 1) {
        if (row !== i || col !== j) result.push([i, j])
      }
    }
    return result
  }

  isOverlap(board, [row, col], line = HORIZONTAL) {
    const checkOverlap = makeOverlapChecker(board)
    if (checkOverlap([row, col])) return true
    const surrounding = this.getSurroundings(board, [row, col], line)
    // TODO(atom): use reduce for better performance
    const result = surrounding.map(checkOverlap)
    return result.some(e => e)
  }
}

module.exports = Ship
