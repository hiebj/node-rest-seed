import yargs = require('yargs')
import { dbConnect } from './dbConnect'
import { server } from './server'

interface Args {
  db: string
  port: number
  host: string
}

const { db = 'test', port = 8080, host = '0.0.0.0' } = (yargs.argv as any) as Args

console.log('-------- rest-node --------\n')
console.log('valid args: --db, --host, --port\n')
const connection = `mongodb://127.0.0.1/${db}`
dbConnect(connection)
console.log(`mongoose connected to ${connection}`)
server.listen(port, host)
console.log(`REST server listening on ${host}:${port}\n\n`)

// TODO make mongodb start script runnable from anywhere; make it an npm script
// make it easier to drop everything etc for dev mode

// use yargs features to print out options, help

// convert router.ts to a factory?
// convert RESTController to async/await
// add some errors more useful than 500
