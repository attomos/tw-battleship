const Code = require('code')
const Lab = require('lab')

const { BOARD_SIZE, HORIZONTAL, VERTICAL } = require('../../src/constants')

const fleets = require('../../src/helpers/fleets')
const { createEmptyBoard, initBoard, isOverflow } = require('../../src/helpers/ocean')

// Test shortcuts
const lab = exports.lab = Lab.script()
const describe = lab.describe
const it = lab.it
const expect = Code.expect
const beforeEach = lab.beforeEach

describe('Ocean', () => {
  let emptyBoard
  const {
    battleship,
    cruiser,
    destroyer,
    submarine,
  } = fleets

  beforeEach((done) => {
    emptyBoard = createEmptyBoard(BOARD_SIZE)
    done()
  })

  describe('isOverflow', () => {
    describe('battleship', () => {
      it('should return true when it is overflow', (done) => {
        let position = [0, 9]
        let actual = isOverflow(emptyBoard, battleship, position, HORIZONTAL)
        expect(actual).to.equal(true)

        position = [0, 7]
        actual = isOverflow(emptyBoard, battleship, position, HORIZONTAL)
        expect(actual).to.equal(true)

        position = [9, 9]
        actual = isOverflow(emptyBoard, battleship, position, VERTICAL)
        expect(actual).to.equal(true)

        position = [7, 9]
        actual = isOverflow(emptyBoard, battleship, position, VERTICAL)
        expect(actual).to.equal(true)
        done()
      })

      it('should return false when it is not overflow', (done) => {
        let position = [0, 0]
        let actual = isOverflow(emptyBoard, battleship, position, HORIZONTAL)
        expect(actual).to.equal(false)

        position = [0, 6]
        actual = isOverflow(emptyBoard, battleship, position, HORIZONTAL)
        expect(actual).to.equal(false)

        position = [6, 9]
        actual = isOverflow(emptyBoard, battleship, position, VERTICAL)
        expect(actual).to.equal(false)

        position = [6, 0]
        actual = isOverflow(emptyBoard, battleship, position, VERTICAL)
        expect(actual).to.equal(false)
        done()
      })
    })

    describe('cruiser', () => {
      it('should return true when it is overflow', (done) => {
        let position = [0, 8]
        let actual = isOverflow(emptyBoard, cruiser, position, HORIZONTAL)
        expect(actual).to.equal(true)

        position = [0, 9]
        actual = isOverflow(emptyBoard, cruiser, position, HORIZONTAL)
        expect(actual).to.equal(true)

        position = [8, 9]
        actual = isOverflow(emptyBoard, cruiser, position, VERTICAL)
        expect(actual).to.equal(true)

        position = [9, 9]
        actual = isOverflow(emptyBoard, cruiser, position, VERTICAL)
        expect(actual).to.equal(true)

        position = [8, 4]
        actual = isOverflow(emptyBoard, cruiser, position, VERTICAL)
        expect(actual).to.equal(true)
        done()
      })

      it('should return false when it is not overflow', (done) => {
        let position = [0, 0]
        let actual = isOverflow(emptyBoard, cruiser, position, HORIZONTAL)
        expect(actual).to.equal(false)

        position = [5, 5]
        actual = isOverflow(emptyBoard, cruiser, position, HORIZONTAL)
        expect(actual).to.equal(false)

        position = [7, 9]
        actual = isOverflow(emptyBoard, cruiser, position, VERTICAL)
        expect(actual).to.equal(false)

        position = [7, 0]
        actual = isOverflow(emptyBoard, cruiser, position, VERTICAL)
        expect(actual).to.equal(false)
        done()
      })
    })

    describe('destroyer', () => {
      it('should return true when it is overflow', (done) => {
        let position = [0, 9]
        let actual = isOverflow(emptyBoard, destroyer, position, HORIZONTAL)
        expect(actual).to.equal(true)

        position = [9, 9]
        actual = isOverflow(emptyBoard, destroyer, position, VERTICAL)
        expect(actual).to.equal(true)

        position = [9, 0]
        actual = isOverflow(emptyBoard, destroyer, position, VERTICAL)
        expect(actual).to.equal(true)
        done()
      })

      it('should return false when it is not overflow', (done) => {
        let position = [0, 8]
        let actual = isOverflow(emptyBoard, destroyer, position, HORIZONTAL)
        expect(actual).to.equal(false)

        position = [5, 5]
        actual = isOverflow(emptyBoard, destroyer, position, HORIZONTAL)
        expect(actual).to.equal(false)

        position = [7, 9]
        actual = isOverflow(emptyBoard, destroyer, position, VERTICAL)
        expect(actual).to.equal(false)

        position = [7, 0]
        actual = isOverflow(emptyBoard, destroyer, position, VERTICAL)
        expect(actual).to.equal(false)
        done()
      })
    })

    describe('submarine', () => {
      it('should return false when it is not overflow', (done) => {
        const position = [0, 0]
        const actual = isOverflow(emptyBoard, submarine, position, HORIZONTAL)
        expect(actual).to.equal(false)
        done()
      })
    })
  })

  describe('initBoard', () => {
    it('should return board and positions correctly', (done) => {
      const actual = initBoard()
      expect(actual).to.only.include(['board', 'positions'])
      expect(actual.board).to.be.an.array()
      expect(actual.board).to.have.length(BOARD_SIZE)
      expect(actual.positions).to.be.an.array()
      expect(actual.positions).to.have.length(1 + 2 + 3 + 4) // total ships
      done()
    })
  })
})
