const Hapi = require('hapi')
const Joi = require('joi')

const attackRoute = require('./routes/attack')
const mainRoute = require('./routes/main')

const server = new Hapi.Server()
server.connection({ port: process.env.PORT || 8080 })

server.state('session', {
  domain: 'localhost',
  encoding: 'base64json',
  isHttpOnly: false,
  isSameSite: false,
  isSecure: false,
  path: '/',
})

// Routes
server.route(attackRoute)
server.route(mainRoute)

server.start((err) => {
  if (err) throw err
  // eslint-disable-next-line
  console.log(`Server running at: ${server.info.uri}`)
})
