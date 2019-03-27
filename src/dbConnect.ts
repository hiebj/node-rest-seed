import { connect, connection, Connection, ConnectionOptions } from 'mongoose'

require('mongoose').Promise = Promise

const defaultOptions: ConnectionOptions = { useNewUrlParser: true, useFindAndModify: false }

export const dbConnect = (db: string, options: ConnectionOptions = {}) =>
  new Promise<Connection>((resolve, reject) => {
    connect(
      db,
      { ...defaultOptions, ...options },
    )
    connection.on('error', error => {
      console.error('connection error:', error)
      reject(error)
    })
    connection.once('open', () => resolve(connection))
  })
