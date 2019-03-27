import { RequestHandler } from 'express'
import { GradeModel } from './models/Grade'

export const get: RequestHandler = (_request, response) =>
  Promise.all([
    GradeModel.findOne()
      .sort('score')
      .exec(),
    GradeModel.findOne()
      .sort('-score')
      .exec(),
    GradeModel.aggregate()
      .group({ _id: null, avg: { $avg: '$score' } })
      .exec(),
  ])
    .then(summary => {
      response.json({
        min: summary[0],
        max: summary[1],
        avg: summary[2][0]
          ? new GradeModel({
              score: Math.round(summary[2][0].avg),
            })
          : null,
      })
    })
    .catch(error => {
      response.writeHead(500, 'Server Error')
      response.end()
      console.error(`Error in SummaryController#get: ${error}`)
    })
