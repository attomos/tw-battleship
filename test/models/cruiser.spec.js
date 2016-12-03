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
})
