const Code = require('code')
const Lab = require('lab')

const { parsePositionQuery, validatePosition } = require('../../src/helpers/position')

// Test shortcuts
const lab = exports.lab = Lab.script()
const describe = lab.describe
const it = lab.it
const expect = Code.expect

describe('position', () => {
  describe('parsePositionQuery', () => {
    it('should parse position query correctly', (done) => {
      let positionQuery = '1,1'
      let actual = parsePositionQuery(positionQuery)
      expect(actual).to.be.equal([1, 1])

      positionQuery = '1, 1'
      actual = parsePositionQuery(positionQuery)
      expect(actual).to.be.equal([1, 1])
      done()
    })
  })

  describe('validatePosition', () => {
    it('should return false with correct message when position query is invalid', (done) => {
      const actual = validatePosition([1])
      expect(actual).to.be.equal({
        isValid: false,
        message: 'position query is invalid',
      })
      done()
    })

    it('should return false with correct message when position query is not a number', (done) => {
      const actual = validatePosition([NaN, NaN])
      expect(actual).to.be.equal({
        isValid: false,
        message: 'position query is not a number',
      })
      done()
    })

    it('should return false with correct message when position query is out of range', (done) => {
      let actual = validatePosition([10, 10])
      expect(actual).to.be.equal({
        isValid: false,
        message: 'position query is out of range',
      })

      actual = validatePosition([-1, 22])
      expect(actual).to.be.equal({
        isValid: false,
        message: 'position query is out of range',
      })
      done()
    })

    it('should return true when position query is valid', (done) => {
      const actual = validatePosition([1, 1])
      expect(actual).to.be.equal({
        isValid: true,
      })
      done()
    })
  })
})
