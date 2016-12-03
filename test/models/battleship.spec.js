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

describe('Battleship', () => {
  let emptyBoard
  let battleship
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
    battleship = fleets.battleship
    submarine = fleets.submarine
    done()
  })

  describe('properties', () => {
    it('should have correct width, height, maximum, and name', (done) => {
      expect(battleship.width).to.equal(4)
      expect(battleship.height).to.equal(1)
      expect(battleship.maximum).to.equal(1)
      expect(battleship.name).to.equal('Battleship')
      done()
    })
  })

  describe('getPositions', () => {
    it('should return positions correctly', (done) => {
      let position = [0, 0]
      let line = HORIZONTAL
      let actual = battleship.getPositions(position, line)
      expect(actual).to.equal([
        [0, 0], [0, 1], [0, 2], [0, 3],
      ])

      position = [5, 5]
      line = VERTICAL
      actual = battleship.getPositions(position, line)
      expect(actual).to.equal([
        [5, 5], [6, 5], [7, 5], [8, 5],
      ])
      done()
    })
  })
})
