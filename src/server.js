const Hapi = require('hapi')

const attackRoute = require('./routes/attack')
const mainRoute = require('./routes/main')

const server = new Hapi.Server()
server.connection({ port: process.env.PORT || 8080 })

// Routes
server.route(attackRoute)
server.route(mainRoute)

server.start((err) => {
  if (err) throw err
  // eslint-disable-next-line
  console.log(`Server running at: ${server.info.uri}`)
})
