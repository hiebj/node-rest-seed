import yargs from 'yargs'
import dbConnect from './dbConnect'
import server from './server'

// accept cli params
const { db = 'test', port = 8080, host = '0.0.0.0' } = yargs.argv
console.log('-------- node-rest --------\n')
console.log('valid args: --db, --host, --port\n')

// connect to mongodb
const dbAddress = `mongodb://127.0.0.1/${db}`
dbConnect(dbAddress)
console.log(`mongoose connected to ${connection}`)

// start the express server
server.listen(port, host)
console.log(`REST server listening on ${host}:${port}\n\n`)
