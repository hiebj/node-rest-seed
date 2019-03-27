import supertest = require('supertest')
import { expect } from 'chai'
import { Connection } from 'mongoose'

import { dbConnect } from './dbConnect'
import { GradeModel, GradeDocument } from './models/Grade'
import { server } from './server'

const testDb = 'mongodb://127.0.0.1/gradesaver-test'
const request = supertest(server)

describe('/grade/', () => {
  const data = {
    student: 'billy',
    score: 84,
  }

  let connection: Connection

  const createGrade = async () => {
    return await new GradeModel(data).save()
  }

  const cleanupGrade = async (grade: GradeDocument) => {
    await grade.remove()
    expect(await GradeModel.find()).to.be.empty
  }

  before(async () => (connection = await dbConnect(testDb)))

  afterEach(() => GradeModel.remove({}))

  after(async () => {
    await connection.close()
  })

  describe('GET /grade/', () => {
    it('should send 200 with a body containing all grades', async () => {
      const grade = await createGrade()
      const result = await request
        .get('/grade/')
        .expect('Content-Type', /json/)
        .expect(200)
      expect(result.error).to.be.false
      expect(result.body.length).to.equal(1)
      expect(result.body[0]).to.containSubset(data)
      await cleanupGrade(grade)
    })
  })

  // TODO why can't I just return the promise here
  describe('POST /grade/', () => {
    it('should create and send 200 with a body containing the new grade', async () => {
      const result = await request
        .post('/grade/')
        .send(data)
        .expect('Content-Type', /json/)
        .expect(200)
      expect(result.error).to.be.false
      expect(result.body._id).not.to.be.undefined
      await GradeModel.findByIdAndRemove(result.body._id)
      expect(await GradeModel.find()).to.be.empty
    })
  })

  describe('POST /grade/:_id/', () => {
    it('should update and send 200 with a body containing the updated grade', async () => {
      const grade = await createGrade()
      const updated = { ...data, student: 'test2' }
      const result = await request
        .post(`/grade/${grade._id}/`)
        .send(updated)
        .expect('Content-Type', /json/)
        .expect(200)
      expect(result.error).to.be.false
      expect(result.body).to.containSubset(updated)
      await cleanupGrade(grade)
    })
  })

  describe('DELETE /grade/:_id/', () => {
    it('should remove the grade from the database and send 200', async () => {
      const grade = await createGrade()
      const result = await request.del(`/grade/${grade._id}/`).expect(200)
      expect(result.error).to.be.false
      expect(await GradeModel.findById(grade._id)).to.be.null
      await cleanupGrade(grade)
    })
  })
})
