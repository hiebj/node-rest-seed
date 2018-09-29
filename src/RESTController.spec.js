import dbConnect from './dbConnect'
import Grade from './models/Grade'
import { isEqual } from 'lodash'
import supertest from 'supertest'
import server from './server'

const request = supertest(server)
const testDb = 'mongodb://127.0.0.1/test'

describe('/grade/', () => {
  const data = {
      student: 'billy',
      score: 84
    }
  let connection
  let grade
  let json

  beforeAll((done) => {
    jasmine.addMatchers({
      toDeepEqual: () => ({ compare: (actual, expected) => ({ pass: isEqual(actual, expected) }) })
    })
    dbConnect(testDb).then((c) => {
      connection = c
      done()
    })
  })

  afterAll((done) => {
    Grade.remove({})
      .then(() => connection.close().then(done))
  })

  beforeEach((done) => {
    grade = new Grade(data)
    grade.save().then((g) => {
      json = JSON.parse(JSON.stringify(g))
      done()
    })
  })

  afterEach((done) => {
    grade.remove().then(done)
  })

  describe('GET /grade/', () => {
    it('should send 200 with a body containing all grades', (done) => {
      request
        .get('/grade/')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((error, response) => {
          if (error) { return done(error) }
          expect(response.body).toDeepEqual([ json ])
          done()
        })
    })
  })

  describe('POST /grade/', () => {
    it('should create and send 200 with a body containing the new grade', (done) => {
      request
        .post('/grade/')
        .send(data)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((error, response) => {
          if (error) { return done(error) }
          expect(response.body._id).toBeDefined()
          Grade
            .findByIdAndRemove(response.body._id)
            .then(done)
        })
    })
  })

  describe('POST /grade/:_id/', () => {
    it('should update and send 200 with a body containing the updated grade', (done) => {
      json.student = 'test2'
      request
        .post(`/grade/${json._id}/`)
        .send(json)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((error, response) => {
          if (error) { return done(error) }
          expect(response.body._id).toBe(json._id)
          expect(response.body.student).toBe(json.student)
          done()
        })
    })
  })

  describe('DELETE /grade/:_id/', () => {
    it('should remove the grade from the database and send 200', (done) => {
      request
        .del(`/grade/${json._id}/`)
        .expect(200)
        .end((error, response) => {
          if (error) { return done(error) }
          Grade
            .findById(json._id)
            .then((found) => {
              expect(found).toBe(null)
              done()
            })
        })
    })
  })
})
