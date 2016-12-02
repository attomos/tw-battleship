const attackRoute = {
  method: 'GET',
  path: '/attack',
  handler(request, reply) {
    reply('Hello, world!')
  },
}

module.exports = attackRoute
