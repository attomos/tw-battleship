const mainRoute = {
  method: 'GET',
  path: '/',
  handler(request, reply) {
    reply('Instruction or something...')
  },
}

module.exports = mainRoute
