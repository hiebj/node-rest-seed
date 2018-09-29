import mongoose from 'mongoose'

mongoose.Promise = Promise

const connect = (db, options) =>
  new Promise((resolve, reject) => {
    mongoose.connect(
      db,
      options,
    )
    const connection = mongoose.connection
    connection.on('error', error => console.error('connection error:', error))
    connection.once('open', () => resolve(connection))
  })

export default connect
