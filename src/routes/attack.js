const Boom = require('boom')
const Joi = require('joi')

const { Game } = require('../models/game')
const { isWin, getWinMessage, makeAttacker } = require('../helpers/ocean')
const { parsePositionQuery, validatePosition } = require('../helpers/position')

const attackRoute = {
  method: 'GET',
  path: '/attack',
  handler(request, reply) {
    const session = request.state.session
    if (session && session.id) {
      const position = parsePositionQuery(request.query.position)
      const valid = validatePosition(position)
      if (!valid.isValid) {
        return reply(Boom.badRequest(valid.message))
      }
      const id = session.id
      return Game
        .findOne({ id })
        .then((game) => {
          const { board, isFinish, moves, sankShipIds, ships } = game
          if (isFinish) {
            return reply('This game is finish. Start new game at "/".')
          }
          const attackAt = makeAttacker(board, moves, sankShipIds, ships)
          const result = attackAt(...position)
          if (isWin(sankShipIds)) {
            reply(`${result}\n${getWinMessage(moves)}`)
            return Game.update({ id }, { $set: { isFinish: true } })
          }
          reply(result)
          return Game.update({ id }, { $set: { ships, moves, sankShipIds } })
        })
        .catch((err) => {
          console.error(err)
        })
    }
    return reply('No active game')
  },
  config: {
    validate: {
      query: {
        position: Joi.string().required(),
      },
    },
  },
}

module.exports = attackRoute
