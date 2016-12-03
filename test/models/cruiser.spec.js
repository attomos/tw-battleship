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

describe('Cruiser', () => {
  let emptyBoard
  let cruiser
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
    cruiser = fleets.cruiser
    submarine = fleets.submarine
    done()
  })

  describe('properties', () => {
    it('should have correct width, height, maximum, and name', (done) => {
      expect(cruiser.width).to.equal(3)
      expect(cruiser.height).to.equal(1)
      expect(cruiser.maximum).to.equal(2)
      expect(cruiser.name).to.equal('Cruiser')
      done()
    })
  })

  describe('getPositions', () => {
    it('should return positions correctly', (done) => {
      let position = [0, 0]
      let line = HORIZONTAL
      let actual = cruiser.getPositions(position, line)
      expect(actual).to.equal([
        [0, 0], [0, 1], [0, 2],
      ])

      position = [5, 5]
      line = VERTICAL
      actual = cruiser.getPositions(position, line)
      expect(actual).to.equal([
        [5, 5], [6, 5], [7, 5],
      ])
      done()
    })
  })

  describe('horizontal', () => {
    const line = HORIZONTAL

    describe('getSurroundings', () => {
      it('should return correctly when every border is valid', (done) => {
        let position = [1, 1]
        let actual = cruiser.getSurroundings(emptyBoard, position, line)
        expect(actual).to.equal([
          [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
          [1, 0], [1, 4],
          [2, 0], [2, 1], [2, 2], [2, 3], [2, 4],
        ])

        position = [5, 5]
        actual = cruiser.getSurroundings(emptyBoard, position, line)
        expect(actual).to.equal([[4, 4], [4, 5], [4, 6], [4, 7], [4, 8],
          [5, 4], [5, 8],
          [6, 4], [6, 5], [6, 6], [6, 7], [6, 8],
        ])
        done()
      })

      it('should return correctly when position is at the top-left corner', (done) => {
        const position = [0, 0]
        const actual = cruiser.getSurroundings(emptyBoard, position, line)
        expect(actual).to.equal([[0, 3], [1, 0], [1, 1], [1, 2], [1, 3]])
        done()
      })

      it('should return correctly when position is at the top-right corner', (done) => {
        const position = [0, 9]
        const actual = cruiser.getSurroundings(emptyBoard, position, line)
        expect(actual).to.equal([
          [0, 8], [1, 8], [1, 9],
        ])
        done()
      })

      it('should return correctly when position is at the bottom-right corner', (done) => {
        const position = [9, 9]
        const actual = cruiser.getSurroundings(emptyBoard, position, line)
        expect(actual).to.equal([
          [8, 8], [8, 9], [9, 8],
        ])
        done()
      })

      it('should return correctly when position is at the bottom-left corner', (done) => {
        const position = [9, 0]
        const actual = cruiser.getSurroundings(emptyBoard, position, line)
        expect(actual).to.equal([[8, 0], [8, 1], [8, 2], [8, 3], [9, 3]])
        done()
      })
    })

    describe('isOverlap', () => {
      it('should return true when there is top-left overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [0, 0])
        const position = [1, 1]
        const actual = cruiser.isOverlap(board, position)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when there is top-right overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [0, 4])
        const position = [1, 1]
        const actual = cruiser.isOverlap(board, position)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when there is bottom-right overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [2, 4])
        const position = [1, 1]
        const actual = cruiser.isOverlap(board, position)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when there is bottom-left overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [2, 0])
        const position = [1, 1]
        const actual = cruiser.isOverlap(board, position)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when there is top overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [0, 1])
        const position = [1, 1]
        const actual = cruiser.isOverlap(board, position)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when there is right overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [1, 2])
        const position = [1, 1]
        const actual = cruiser.isOverlap(board, position)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when there is bottom overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [2, 1])
        const position = [1, 1]
        const actual = cruiser.isOverlap(board, position)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when there is left overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [1, 0])
        const position = [1, 1]
        const actual = cruiser.isOverlap(board, position)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when the position is already occupied', (done) => {
        const board = placeShip(emptyBoard, submarine, [1, 1])
        const position = [1, 1]
        const actual = cruiser.isOverlap(board, position)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when there is overlap in one of the required positions', (done) => {
        const board = placeShip(emptyBoard, submarine, [1, 3])
        const position = [1, 1]
        const actual = cruiser.isOverlap(board, position)
        expect(actual).to.equal(true)
        done()
      })

      it('should return false when there is no overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [5, 5])
        const position = [1, 1]
        const actual = cruiser.isOverlap(board, position)
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
        let actual = cruiser.getSurroundings(emptyBoard, position, line)
        expect(actual).to.equal([
          [0, 0], [0, 1], [0, 2],
          [1, 0], [1, 2],
          [2, 0], [2, 2],
          [3, 0], [3, 2],
          [4, 0], [4, 1], [4, 2],
        ])

        position = [5, 5]
        actual = cruiser.getSurroundings(emptyBoard, position, line)
        expect(actual).to.equal([
          [4, 4], [4, 5], [4, 6],
          [5, 4], [5, 6],
          [6, 4], [6, 6],
          [7, 4], [7, 6],
          [8, 4], [8, 5], [8, 6],
        ])
        done()
      })

      it('should return correctly when position is at the top-left corner', (done) => {
        const position = [0, 0]
        const actual = cruiser.getSurroundings(emptyBoard, position, line)
        expect(actual).to.equal([[0, 1], [1, 1], [2, 1], [3, 0], [3, 1]])
        done()
      })

      it('should return correctly when position is at the top-right corner', (done) => {
        const position = [0, 9]
        const actual = cruiser.getSurroundings(emptyBoard, position, line)
        expect(actual).to.equal([[0, 8], [1, 8], [2, 8], [3, 8], [3, 9]])
        done()
      })

      it('should return correctly when position is at the bottom-right corner', (done) => {
        const position = [9, 9]
        const actual = cruiser.getSurroundings(emptyBoard, position, line)
        expect(actual).to.equal([
          [8, 8], [8, 9], [9, 8],
        ])
        done()
      })

      it('should return correctly when position is at the bottom-left corner', (done) => {
        const position = [9, 0]
        const actual = cruiser.getSurroundings(emptyBoard, position, line)
        expect(actual).to.equal([[8, 0], [8, 1], [9, 1]])
        done()
      })
    })

    describe('isOverlap', () => {
      it('should return true when there is top-left overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [0, 0], line)
        const position = [1, 1]
        const actual = cruiser.isOverlap(board, position, line)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when there is top-right overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [0, 2], line)
        const position = [1, 1]
        const actual = cruiser.isOverlap(board, position, line)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when there is bottom-right overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [4, 2], line)
        const position = [1, 1]
        const actual = cruiser.isOverlap(board, position, line)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when there is bottom-left overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [4, 0], line)
        const position = [1, 1]
        const actual = cruiser.isOverlap(board, position, line)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when there is top overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [0, 1], line)
        const position = [1, 1]
        const actual = cruiser.isOverlap(board, position, line)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when there is right overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [1, 2], line)
        const position = [1, 1]
        const actual = cruiser.isOverlap(board, position, line)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when there is bottom overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [4, 1], line)
        const position = [1, 1]
        const actual = cruiser.isOverlap(board, position, line)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when there is left overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [3, 0], line)
        const position = [1, 1]
        const actual = cruiser.isOverlap(board, position, line)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when the position already has occupied', (done) => {
        const board = placeShip(emptyBoard, submarine, [1, 1], line)
        const position = [1, 1]
        const actual = cruiser.isOverlap(board, position, line)
        expect(actual).to.equal(true)
        done()
      })

      it('should return true when there is overlap in one of the required positions', (done) => {
        const board = placeShip(emptyBoard, submarine, [3, 1])
        const position = [1, 1]
        const actual = cruiser.isOverlap(board, position, line)
        expect(actual).to.equal(true)
        done()
      })

      it('should return false when there is no overlap', (done) => {
        const board = placeShip(emptyBoard, submarine, [5, 5], line)
        const position = [1, 1]
        const actual = cruiser.isOverlap(board, position, line)
        expect(actual).to.equal(false)
        done()
      })
    })
  })
})
