const Ship = require('../models/ship')

const battleship = new Ship({
  name: 'Battleship',
  width: 4,
  maximum: 1,
})

const cruiser = new Ship({
  name: 'Cruiser',
  width: 3,
  maximum: 2,
})

const destroyer = new Ship({
  name: 'Destroyer',
  width: 2,
  maximum: 3,
})

const submarine = new Ship({
  name: 'Submarine',
  width: 1,
  maximum: 4,
})

const FLEETS = {
  battleship,
  cruiser,
  destroyer,
  submarine,
}

module.exports = FLEETS
