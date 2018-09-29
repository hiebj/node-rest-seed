import yargs from 'yargs'
import dbConnect from './dbConnect'
import server from './server'

const { db = 'test', port = 8080, host = '0.0.0.0' } = yargs.argv

console.log('-------- rest-node --------\n')
console.log('valid args: --db, --host, --port\n')
const connection = `mongodb://127.0.0.1/${db}`
dbConnect(connection)
console.log(`mongoose connected to ${connection}`)
server.listen(port, host)
console.log(`REST server listening on ${host}:${port}\n\n`)
