const { mongoose } = require('../database')
const { initBoard } = require('../helpers/ocean')

const GameSchema = {
  id: Number,
  board: Array,
  moves: Array,
  positions: Array,
  isFinish: Boolean,
}

const Game = mongoose.model('game', GameSchema)

function createNewGame(time) {
  const { board, positions } = initBoard()
  const game = new Game()
  game.id = time
  game.positions = positions
  game.board = board
  game.isFinish = false
  return game
}

module.exports = {
  createNewGame,
  Game,
}
