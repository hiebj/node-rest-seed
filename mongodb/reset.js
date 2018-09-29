load('./diagnostics.js')
var conn = new Mongo()
var db = conn.getDB('test')

db.dropDatabase()
db.createCollection('diagnostics')
db.diagnostics.insertMany(diagnostics)
