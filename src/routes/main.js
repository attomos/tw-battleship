const { createNewGame } = require('../models/game')

const mainRoute = {
  method: 'GET',
  path: '/',
  handler(request, reply) {
    const time = new Date().getTime()
    const game = createNewGame(time)

    game.save(game, (err) => {
      if (!err) {
        const session = {
          id: time,
        }
        return reply('Game on!\n').state('session', session)
      }
      return reply(err)
    })
  },
}

module.exports = mainRoute
