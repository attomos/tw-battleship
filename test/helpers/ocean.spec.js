const Code = require('code')
const Lab = require('lab')

const { BOARD_SIZE, HORIZONTAL, VERTICAL } = require('../../src/constants')

const fleets = require('../../src/helpers/fleets')
const {
  attack,
  createEmptyBoard,
  getWinMessage,
  initBoard,
  isOverflow,
  isWin,
  makeAttacker,
} = require('../../src/helpers/ocean')

// Test shortcuts
const lab = exports.lab = Lab.script()
const describe = lab.describe
const it = lab.it
const expect = Code.expect
const beforeEach = lab.beforeEach

describe('Ocean', () => {
  let emptyBoard
  let board
  let ships
  const {
    battleship,
    cruiser,
    destroyer,
    submarine,
  } = fleets

  beforeEach((done) => {
    emptyBoard = createEmptyBoard(BOARD_SIZE)
    board = [
      [0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
      [0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 1, 1, 1, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    ]
    ships = [
      {
        line: 'vertical',
        positions: [
          [3, 6],
          [4, 6],
          [5, 6],
          [6, 6],
        ],
        ship: {
          name: 'Battleship',
          width: 4,
          height: 1,
          maximum: 1,
        },
      },
      {
        line: 'vertical',
        positions: [
          [6, 0],
          [7, 0],
          [8, 0],
        ],
        ship: {
          name: 'Cruiser',
          width: 3,
          height: 1,
          maximum: 2,
        },
      },
      {
        line: 'horizontal',
        positions: [
          [8, 6],
          [8, 7],
          [8, 8],
        ],
        ship: {
          name: 'Cruiser',
          width: 3,
          height: 1,
          maximum: 2,
        },
      },
      {
        line: 'vertical',
        positions: [
          [0, 8],
          [1, 8],
        ],
        ship: {
          name: 'Destroyer',
          width: 2,
          height: 1,
          maximum: 3,
        },
      },
      {
        line: 'vertical',
        positions: [
          [3, 3],
          [4, 3],
        ],
        ship: {
          name: 'Destroyer',
          width: 2,
          height: 1,
          maximum: 3,
        },
      },
      {
        line: 'vertical',
        positions: [
          [0, 5],
          [1, 5],
        ],
        ship: {
          name: 'Destroyer',
          width: 2,
          height: 1,
          maximum: 3,
        },
      },
      {
        line: 'horizontal',
        positions: [
          [7, 2],
        ],
        ship: {
          name: 'Submarine',
          width: 1,
          height: 1,
          maximum: 4,
        },
      },
      {
        line: 'vertical',
        positions: [
          [4, 9],
        ],
        ship: {
          name: 'Submarine',
          width: 1,
          height: 1,
          maximum: 4,
        },
      },
      {
        line: 'vertical',
        positions: [
          [9, 2],
        ],
        ship: {
          name: 'Submarine',
          width: 1,
          height: 1,
          maximum: 4,
        },
      },
      {
        line: 'horizontal',
        positions: [
          [1, 1],
        ],
        ship: {
          name: 'Submarine',
          width: 1,
          height: 1,
          maximum: 4,
        },
      },
    ]
    done()
  })

  describe('attack', () => {
    it('should return "Miss" when the attacker misses', (done) => {
      const moves = []
      const position = [0, 0]
      const actual = attack(board, moves, ships, position)
      expect(actual).to.equal('Miss')
      done()
    })

    it('should return "Hit" when a ship has been hit but not sunk', (done) => {
      const moves = []
      const position = [3, 3]
      const actual = attack(board, moves, ships, position)
      expect(actual).to.equal('Hit')
      done()
    })

    it('should return "You just sank the X" when a ship has been sunk', (done) => {
      const moves = []
      let position = [3, 3]
      let actual = attack(board, moves, ships, position)

      position = [4, 3]
      actual = attack(board, moves, ships, position)

      expect(actual).to.equal('You just sank the Destroyer')
      done()
    })
  })

  describe('isFinish', () => {
    it('should return false when there are more ships to hit', (done) => {
      const moves = []
      const attackAt = makeAttacker(board, moves, ships)
      attackAt(0, 0)
      const actual = isWin(ships)
      expect(actual).to.equal(false)
      done()
    })

    it('should return true when all ships have been sank', (done) => {
      const moves = []
      const attackAt = makeAttacker(board, moves, ships)
      // submarines
      attackAt(1, 1)

      attackAt(4, 9)

      attackAt(7, 2)

      attackAt(9, 2)

      // destroyers
      attackAt(0, 5)
      attackAt(1, 5)

      attackAt(0, 8)
      attackAt(1, 8)

      attackAt(3, 3)
      attackAt(4, 3)

      // cruisers
      attackAt(6, 0)
      attackAt(7, 0)
      attackAt(8, 0)

      attackAt(8, 6)
      attackAt(8, 7)
      attackAt(8, 8)

      // battleship
      attackAt(3, 6)
      attackAt(4, 6)
      attackAt(5, 6)
      attackAt(6, 6)

      const actual = isWin(ships)
      expect(actual).to.equal(true)
      done()
    })
  })

  describe('getWinMessage', () => {
    it('should return message with a correct number of moves', (done) => {
      const moves = []
      const attackAt = makeAttacker(board, moves, ships)
      // submarines
      attackAt(1, 1)

      attackAt(4, 9)

      attackAt(7, 2)

      attackAt(9, 2)

      // destroyers
      attackAt(0, 5)
      attackAt(1, 5)

      attackAt(0, 8)
      attackAt(1, 8)

      attackAt(3, 3)
      attackAt(4, 3)

      // cruisers
      attackAt(6, 0)
      attackAt(7, 0)
      attackAt(8, 0)

      attackAt(8, 6)
      attackAt(8, 7)
      attackAt(8, 8)

      // battleship
      attackAt(3, 6)
      attackAt(4, 6)
      attackAt(5, 6)
      attackAt(6, 6)

      const actual = getWinMessage(moves)
      expect(actual).to.equal('Win! You completed the game in 20 moves')
      done()
    })

    it('should return message with a correct number of moves when there are misses', (done) => {
      const moves = []
      const attackAt = makeAttacker(board, moves, ships)
      // misses
      attackAt(0, 0)
      attackAt(0, 1)
      attackAt(0, 2)

      // submarines
      attackAt(1, 1)

      attackAt(4, 9)

      attackAt(7, 2)

      attackAt(9, 2)

      // destroyers
      attackAt(0, 5)
      attackAt(1, 5)

      attackAt(0, 8)
      attackAt(1, 8)

      attackAt(3, 3)
      attackAt(4, 3)

      // cruisers
      attackAt(6, 0)
      attackAt(7, 0)
      attackAt(8, 0)

      attackAt(8, 6)
      attackAt(8, 7)
      attackAt(8, 8)

      // battleship
      attackAt(3, 6)
      attackAt(4, 6)
      attackAt(5, 6)
      attackAt(6, 6)

      const actual = getWinMessage(moves)
      expect(actual).to.equal('Win! You completed the game in 23 moves')
      done()
    })
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
    it('should return board and ships correctly', (done) => {
      const actual = initBoard()
      expect(actual).to.only.include(['board', 'ships'])
      expect(actual.board).to.be.an.array()
      expect(actual.board).to.have.length(BOARD_SIZE)
      expect(actual.ships).to.be.an.array()
      expect(actual.ships).to.have.length(1 + 2 + 3 + 4) // total ships
      done()
    })
  })
})
