const mongoose = require('mongoose')
const { database } = require('./config')

mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${database.host}/${database.db}`)

const db = mongoose.connection
db.on('error', (err) => {
  console.error(err)
})
db.once('open', () => {
  // eslint-disable-next-line
  console.log('Connection with MongoDB succeeded.')
})

exports.mongoose = mongoose
exports.db = db
