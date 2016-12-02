const Code = require('code')
const Lab = require('lab')

const lab = exports.lab = Lab.script()

const { HORIZONTAL } = require('../../src/constants')

const fleets = require('../../src/helpers/fleets')
const { placeShip } = require('../../src/helpers/ocean')

lab.experiment('Submarine', () => {
  const line = HORIZONTAL
  let emptyBoard
  let submarine

  lab.beforeEach((done) => {
    emptyBoard = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
    submarine = fleets.submarine
    done()
  })

  lab.test('returns surroundings correctly', (done) => {
    const position = [1, 1]
    const actual = submarine.getSurroundings(emptyBoard, position, line)
    Code.expect(actual).to.equal([
      [0, 0], [0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2],
    ])
    done()
  })

  lab.test('returns true when there is overlap at the upper left', (done) => {
    const board = placeShip(emptyBoard, submarine, [0, 0])
    const position = [1, 1]
    const actual = submarine.isOverlap(board, position)
    Code.expect(actual).to.equal(true)
    done()
  })

  lab.test('returns true when there is overlap at the upper right', (done) => {
    const board = placeShip(emptyBoard, submarine, [0, 2])
    const position = [1, 1]
    const actual = submarine.isOverlap(board, position)
    Code.expect(actual).to.equal(true)
    done()
  })

  lab.test('returns true when there is overlap at the lower left', (done) => {
    const board = placeShip(emptyBoard, submarine, [2, 0])
    const position = [1, 1]
    const actual = submarine.isOverlap(board, position)
    Code.expect(actual).to.equal(true)
    done()
  })

  lab.test('returns true when there is overlap at the lower right', (done) => {
    const board = placeShip(emptyBoard, submarine, [2, 2])
    const position = [1, 1]
    const actual = submarine.isOverlap(board, position)
    Code.expect(actual).to.equal(true)
    done()
  })

  lab.test('returns true when there is overlap at the top', (done) => {
    const board = placeShip(emptyBoard, submarine, [0, 1])
    const position = [1, 1]
    const actual = submarine.isOverlap(board, position)
    Code.expect(actual).to.equal(true)
    done()
  })

  lab.test('returns true when there is overlap at the right', (done) => {
    const board = placeShip(emptyBoard, submarine, [1, 2])
    const position = [1, 1]
    const actual = submarine.isOverlap(board, position)
    Code.expect(actual).to.equal(true)
    done()
  })

  lab.test('returns true when there is overlap at the bottom', (done) => {
    const board = placeShip(emptyBoard, submarine, [2, 1])
    const position = [1, 1]
    const actual = submarine.isOverlap(board, position)
    Code.expect(actual).to.equal(true)
    done()
  })

  lab.test('returns true when there is overlap at the left', (done) => {
    const board = placeShip(emptyBoard, submarine, [1, 0])
    const position = [1, 1]
    const actual = submarine.isOverlap(board, position)
    Code.expect(actual).to.equal(true)
    done()
  })

  lab.test('returns false when there is no overlap', (done) => {
    const board = placeShip(emptyBoard, submarine, [5, 5])
    const position = [1, 1]
    const actual = submarine.isOverlap(board, position)
    Code.expect(actual).to.equal(false)
    done()
  })
})
