const Code = require('code')
const Lab = require('lab')

const { HORIZONTAL } = require('../../src/constants')

const fleets = require('../../src/helpers/fleets')
const { placeShip } = require('../../src/helpers/ocean')

// Test shortcuts
const lab = exports.lab = Lab.script()
const describe = lab.describe
const it = lab.it
const expect = Code.expect
const beforeEach = lab.beforeEach

describe('Submarine', () => {
  const line = HORIZONTAL
  let emptyBoard
  let submarine

  beforeEach((done) => {
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

  describe('properties', () => {
    it('should have correct width, height, maximum, and name', (done) => {
      expect(submarine.width).to.equal(1)
      expect(submarine.height).to.equal(1)
      expect(submarine.maximum).to.equal(4)
      expect(submarine.name).to.equal('Submarine')
      done()
    })
  })

  describe('getSurroundings', () => {
    it('should return correctly when every border is valid', (done) => {
      let position = [1, 1]
      let actual = submarine.getSurroundings(emptyBoard, position, line)
      expect(actual).to.equal([
        [0, 0], [0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2],
      ])

      position = [5, 5]
      actual = submarine.getSurroundings(emptyBoard, position, line)
      expect(actual).to.equal([
        [4, 4], [4, 5], [4, 6], [5, 4], [5, 6], [6, 4], [6, 5], [6, 6],
      ])
      done()
    })

    it('should return correctly when position is at the top-left corner', (done) => {
      const position = [0, 0]
      const actual = submarine.getSurroundings(emptyBoard, position, line)
      expect(actual).to.equal([
        [0, 1], [1, 0], [1, 1],
      ])
      done()
    })

    it('should return correctly when position is at the top-right corner', (done) => {
      const position = [0, 9]
      const actual = submarine.getSurroundings(emptyBoard, position, line)
      expect(actual).to.equal([
        [0, 8], [1, 8], [1, 9],
      ])
      done()
    })

    it('should return correctly when position is at the bottom-right corner', (done) => {
      const position = [9, 9]
      const actual = submarine.getSurroundings(emptyBoard, position, line)
      expect(actual).to.equal([
        [8, 8], [8, 9], [9, 8],
      ])
      done()
    })

    it('should return correctly when position is at the bottom-left corner', (done) => {
      const position = [9, 0]
      const actual = submarine.getSurroundings(emptyBoard, position, line)
      expect(actual).to.equal([
        [8, 0], [8, 1], [9, 1],
      ])
      done()
    })
  })

  describe('isOverlap', () => {
    it('should return true when there is top-left overlap', (done) => {
      const board = placeShip(emptyBoard, submarine, [0, 0])
      const position = [1, 1]
      const actual = submarine.isOverlap(board, position)
      expect(actual).to.equal(true)
      done()
    })

    it('should return true when there is top-right overlap', (done) => {
      const board = placeShip(emptyBoard, submarine, [0, 2])
      const position = [1, 1]
      const actual = submarine.isOverlap(board, position)
      expect(actual).to.equal(true)
      done()
    })

    it('should return true when there is bottom-right overlap', (done) => {
      const board = placeShip(emptyBoard, submarine, [2, 2])
      const position = [1, 1]
      const actual = submarine.isOverlap(board, position)
      expect(actual).to.equal(true)
      done()
    })

    it('should return true when there is bottom-left overlap', (done) => {
      const board = placeShip(emptyBoard, submarine, [2, 0])
      const position = [1, 1]
      const actual = submarine.isOverlap(board, position)
      expect(actual).to.equal(true)
      done()
    })

    it('should return true when there is top overlap', (done) => {
      const board = placeShip(emptyBoard, submarine, [0, 1])
      const position = [1, 1]
      const actual = submarine.isOverlap(board, position)
      expect(actual).to.equal(true)
      done()
    })

    it('should return true when there is right overlap', (done) => {
      const board = placeShip(emptyBoard, submarine, [1, 2])
      const position = [1, 1]
      const actual = submarine.isOverlap(board, position)
      expect(actual).to.equal(true)
      done()
    })

    it('should return true when there is bottom overlap', (done) => {
      const board = placeShip(emptyBoard, submarine, [2, 1])
      const position = [1, 1]
      const actual = submarine.isOverlap(board, position)
      expect(actual).to.equal(true)
      done()
    })

    it('should return true when there is left overlap', (done) => {
      const board = placeShip(emptyBoard, submarine, [1, 0])
      const position = [1, 1]
      const actual = submarine.isOverlap(board, position)
      expect(actual).to.equal(true)
      done()
    })

    it('should return true when the position is already occupied', (done) => {
      const board = placeShip(emptyBoard, submarine, [1, 1])
      const position = [1, 1]
      const actual = submarine.isOverlap(board, position)
      expect(actual).to.equal(true)
      done()
    })

    it('should return false when there is no overlap', (done) => {
      const board = placeShip(emptyBoard, submarine, [5, 5])
      const position = [1, 1]
      const actual = submarine.isOverlap(board, position)
      expect(actual).to.equal(false)
      done()
    })
  })
})
