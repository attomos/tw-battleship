const Code = require('code')
const Lab = require('lab')

const { HORIZONTAL, VERTICAL } = require('../../src/constants')

const fleets = require('../../src/helpers/fleets')
const { placeShip } = require('../../src/helpers/ocean')

// Test shortcuts
const lab = exports.lab = Lab.script()
const describe = lab.describe
const it = lab.it
const expect = Code.expect
const beforeEach = lab.beforeEach

describe('Destroyer', () => {
  let emptyBoard
  let destroyer
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
    destroyer = fleets.destroyer
    submarine = fleets.submarine
    done()
  })

  describe('properties', () => {
    it('should have correct width, height, maximum, and name', (done) => {
      expect(destroyer.width).to.equal(2)
      expect(destroyer.height).to.equal(1)
      expect(destroyer.maximum).to.equal(3)
      expect(destroyer.name).to.equal('Destroyer')
      done()
    })
  })

  describe('horizontal', () => {
    const line = HORIZONTAL

    describe('getSurroundings', () => {
      it('should return correctly when every border is valid', (done) => {
        let position = [1, 1]
        let actual = destroyer.getSurroundings(emptyBoard, position, line)
        expect(actual).to.equal([
          [0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [1, 3], [2, 0], [2, 1], [2, 2], [2, 3],
        ])

        position = [5, 5]
        actual = destroyer.getSurroundings(emptyBoard, position, line)
        expect(actual).to.equal([
          [4, 4], [4, 5], [4, 6], [4, 7], [5, 4], [5, 7], [6, 4], [6, 5], [6, 6], [6, 7],
        ])
        done()
      })

      it('should return correctly when position is at the top-left corner', (done) => {
        const position = [0, 0]
        const actual = destroyer.getSurroundings(emptyBoard, position, line)
        expect(actual).to.equal([
          [0, 2], [1, 0], [1, 1], [1, 2],
        ])
        done()
      })

      it('should return correctly when position is at the top-right corner', (done) => {
        const position = [0, 9]
        const actual = destroyer.getSurroundings(emptyBoard, position, line)
        expect(actual).to.equal([
          [0, 8], [1, 8], [1, 9],
        ])
        done()
      })

      it('should return correctly when position is at the bottom-right corner', (done) => {
        const position = [9, 9]
        const actual = destroyer.getSurroundings(emptyBoard, position, line)
        expect(actual).to.equal([
          [8, 8], [8, 9], [9, 8],
        ])
        done()
      })

      it('should return correctly when position is at the bottom-left corner', (done) => {
        const position = [9, 0]
        const actual = destroyer.getSurroundings(emptyBoard, position, line)
        expect(actual).to.equal([
          [8, 0], [8, 1], [8, 2], [9, 2],
        ])
        done()
      })
    })

    describe('isOverlap', () => {
      it('should return true when there is top-left overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [0, 0], line)
        const position = [1, 1]
        const actual = destroyer.isOverlap(board, position)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when there is top-right overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [0, 3], line)
        const position = [1, 1]
        const actual = destroyer.isOverlap(board, position)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when there is bottom-right overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [2, 3], line)
        const position = [1, 1]
        const actual = destroyer.isOverlap(board, position)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when there is bottom-left overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [2, 0], line)
        const position = [1, 1]
        const actual = destroyer.isOverlap(board, position)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when there is top overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [0, 1], line)
        const position = [1, 1]
        const actual = destroyer.isOverlap(board, position)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when there is right overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [1, 3], line)
        const position = [1, 1]
        const actual = destroyer.isOverlap(board, position)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when there is bottom overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [2, 2], line)
        const position = [1, 1]
        const actual = destroyer.isOverlap(board, position)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when there is left overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [1, 0], line)
        const position = [1, 1]
        const actual = destroyer.isOverlap(board, position)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when the position already has occupied', (done) => {
        let board = placeShip(emptyBoard, submarine, [1, 1], line)
        const position = [1, 1]
        let actual = submarine.isOverlap(board, position)
        expect(actual).to.equal(true)

        board = placeShip(emptyBoard, submarine, [1, 2], line)
        actual = submarine.isOverlap(board, position)
        expect(actual).to.equal(true)
        done()
      })

      it('should return false when there is no overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [5, 5], line)
        const position = [1, 1]
        const actual = destroyer.isOverlap(board, position)
        expect(actual).to.equal(false)
        done()
      })
    })
  })

  describe('vertical', () => {
    const line = VERTICAL

    describe('getSurroundings', () => {
      it('should return correctly when every border is valid', (done) => {
        let position = [1, 1]
        let actual = destroyer.getSurroundings(emptyBoard, position, line)
        expect(actual).to.equal([
          [0, 0], [0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2], [3, 0], [3, 1], [3, 2],
        ])

        position = [5, 5]
        actual = destroyer.getSurroundings(emptyBoard, position, line)
        expect(actual).to.equal([
          [4, 4], [4, 5], [4, 6], [5, 4], [5, 6], [6, 4], [6, 6], [7, 4], [7, 5], [7, 6],
        ])
        done()
      })

      it('should return correctly when position is at the top-left corner', (done) => {
        const position = [0, 0]
        const actual = destroyer.getSurroundings(emptyBoard, position, line)
        expect(actual).to.equal([
          [0, 1], [1, 1], [2, 0], [2, 1],
        ])
        done()
      })

      it('should return correctly when position is at the top-right corner', (done) => {
        const position = [0, 9]
        const actual = destroyer.getSurroundings(emptyBoard, position, line)
        expect(actual).to.equal([
          [0, 8], [1, 8], [2, 8], [2, 9],
        ])
        done()
      })

      it('should return correctly when position is at the bottom-right corner', (done) => {
        const position = [8, 9]
        const actual = destroyer.getSurroundings(emptyBoard, position, line)
        expect(actual).to.equal([
          [7, 8], [7, 9], [8, 8], [9, 8],
        ])
        done()
      })

      it('should return correctly when position is at the bottom-left corner', (done) => {
        const position = [8, 0]
        const actual = destroyer.getSurroundings(emptyBoard, position, line)
        expect(actual).to.equal([
          [7, 0], [7, 1], [8, 1], [9, 1],
        ])
        done()
      })
    })

    describe('isOverlap', () => {
      it('should return true when there is top-left overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [0, 0], line)
        const position = [1, 1]
        const actual = destroyer.isOverlap(board, position, line)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when there is top-right overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [0, 2], line)
        const position = [1, 1]
        const actual = destroyer.isOverlap(board, position, line)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when there is bottom-right overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [3, 2], line)
        const position = [1, 1]
        const actual = destroyer.isOverlap(board, position, line)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when there is bottom-left overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [3, 0], line)
        const position = [1, 1]
        const actual = destroyer.isOverlap(board, position, line)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when there is top overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [0, 1], line)
        const position = [1, 1]
        const actual = destroyer.isOverlap(board, position, line)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when there is right overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [1, 2], line)
        const position = [1, 1]
        const actual = destroyer.isOverlap(board, position, line)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when there is bottom overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [3, 1], line)
        const position = [1, 1]
        const actual = destroyer.isOverlap(board, position, line)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when there is left overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [2, 0], line)
        const position = [1, 1]
        const actual = destroyer.isOverlap(board, position, line)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when the position already has occupied', (done) => {
        const board = placeShip(emptyBoard, submarine, [1, 1], line)
        const position = [1, 1]
        const actual = submarine.isOverlap(board, position, line)
        expect(actual).to.equal(true)
        done()
      })

      it('should return false when there is no overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [5, 5], line)
        const position = [1, 1]
        const actual = destroyer.isOverlap(board, position, line)
        expect(actual).to.equal(false)
        done()
      })
    })
  })
})
