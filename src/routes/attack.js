const { Game } = require('../models/game')
const { isWin, getWinMessage, makeAttacker } = require('../helpers/ocean')

const attackRoute = {
  method: 'GET',
  path: '/attack',
  handler(request, reply) {
    const session = request.state.session
    if (session && session.id) {
      if (!request.query.position) {
        return reply('You need to provide position query, e.g., ?position=1,5')
      }
      try {
        const safePosition = decodeURIComponent(request.query.position)
        const position = safePosition.split(',').map(Number)
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
      } catch (e) {
        reply(e)
      }
    }
    return reply('No active game')
  },
}

module.exports = attackRoute
