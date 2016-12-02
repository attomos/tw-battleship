const { Game } = require('../models/game')

const attackRoute = {
  method: 'GET',
  path: '/attack',
  handler(request, reply) {
    const session = request.state.session
    if (session && session.id) {
      console.log(request.query)
      const id = session.id
      Game
      .findOne({ id })
      .then((game) => {
        console.log(game)
      })
      .catch((err) => {
        console.error(err)
      })
      reply('Hello, world!')
    } else {
      reply('No active game')
    }
  },
}

module.exports = attackRoute
