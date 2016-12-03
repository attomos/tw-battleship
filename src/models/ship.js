const { HORIZONTAL } = require('../constants')

const makeOverlapChecker = board => ([row, col]) => !!board[row][col]

class Ship {
  constructor(options) {
    const { name, width, height = 1, maximum } = options
    this.name = name
    this.width = width
    this.height = height
    this.maximum = maximum
  }

  getPositions([row, col], line) {
    const result = []
    if (line === HORIZONTAL) {
      for (let i = col; i < col + this.width; i += 1) {
        result.push([row, i])
      }
    } else {
      for (let i = row; i < row + this.width; i += 1) {
        result.push([i, col])
      }
    }
    return result
  }


  getSurroundings(board, position, line) {
    const [row, col] = position
    const rowWise = line === HORIZONTAL ? this.height : this.width
    const colWise = line === HORIZONTAL ? this.width : this.height
    const result = []
    const minIndex = 0
    const maxIndex = board[0].length - 1
    const rowStart = Math.max(minIndex, row - 1)
    const rowEnd = Math.min(maxIndex, row + rowWise)
    const colStart = Math.max(minIndex, col - 1)
    const colEnd = Math.min(maxIndex, col + colWise)

    for (let i = rowStart; i <= rowEnd; i += 1) {
      for (let j = colStart; j <= colEnd; j += 1) {
        if ((i < row || i >= row + rowWise) || (j < col || j >= col + colWise)) {
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
