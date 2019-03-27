import supertest = require('supertest')
import { expect } from 'chai'
import { describe, beforeEach, it } from 'mocha'
import { Connection } from 'mongoose'

import { dbConnect } from './dbConnect'
import { GradeModel } from './models/Grade'
import { server } from './server'

const testDb = 'mongodb://127.0.0.1/unit'
const request = supertest(server)

describe('/summary/', () => {
  const grades = [
    { student: 'michelle', score: 96 },
    { student: 'perry', score: 66 },
    { student: 'alex', score: 84 },
  ]
  const summary = {
    max: grades[0],
    min: grades[1],
    avg: { score: Math.round((grades[0].score + grades[1].score + grades[2].score) / 3) },
  }
  let connection: Connection

  before(async () => (connection = await dbConnect(testDb)))

  beforeEach(() => GradeModel.insertMany(grades))

  afterEach(() => GradeModel.remove({}))

  after(() => connection.close())

  describe('GET /summary/', () => {
    it('should send 200 with a correct summary', async () => {
      const result = await request
        .get('/summary/')
        .expect('Content-Type', /json/)
        .expect(200)
      expect(result.error).to.be.false
      expect(result.body).to.containSubset(summary)
    })
  })
})
