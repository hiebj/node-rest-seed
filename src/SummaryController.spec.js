import dbConnect from './dbConnect'
import Grade from './models/Grade'
import supertest from 'supertest'

import server from './server'

const request = supertest(server)
const testDb = 'mongodb://127.0.0.1/test'

describe('/summary/', () => {
  const grades = [
    { student: 'michelle', score: 96 },
    { student: 'perry', score: 66 },
    { student: 'alex', score: 84 }
  ]
  const summary = {
    max: grades[0],
    min: grades[1],
    avg: { score: Math.round((grades[0].score + grades[1].score + grades[2].score) / 3) }
  }
  let connection

  beforeAll((done) => {
    dbConnect(testDb).then((c) => {
      connection = c
      done()
    })
  })

  afterAll((done) => {
    connection.close().then(done)
  })

  beforeEach((done) => {
    Grade.insertMany(grades).then(done)
  })

  afterEach((done) => {
    Grade.remove({}).then(done)
  })

  describe('GET /summary/', () => {
    it('should send 200 with a correct summary', (done) => {
      request
        .get('/summary/')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((error, response) => {
          if (error) { return done(error) }
          expect(response.body.max.score).toBe(summary.max.score)
          expect(response.body.min.score).toBe(summary.min.score)
          expect(response.body.avg.score).toBe(summary.avg.score)
          done()
        })
    })
  })
})
