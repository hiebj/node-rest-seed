import { Model, Document } from 'mongoose'
import { RequestHandler } from 'express'

export interface RESTController {
  query: RequestHandler
  save: RequestHandler
  update: RequestHandler
  delete: RequestHandler
}

export const queryHandlerFactory = <T extends Document>(M: Model<T>): RequestHandler => (
  request,
  response,
) => {
  M.find(request.params)
    .then(records => response.json(records))
    .catch(error => {
      response.writeHead(500, 'Server Error')
      response.end()
      console.error(`Error in RESTController#query: ${error}`)
    })
}

export const saveHandlerFactory = <T extends Document>(M: Model<T>): RequestHandler => (
  request,
  response,
) => {
  new M(request.body)
    .save()
    .then(record => response.json(record))
    .catch(error => {
      response.writeHead(500, 'Server Error')
      response.end()
      console.error(`Error in RESTController#save: ${error}`)
    })
}

export const updateHandlerFactory = <T extends Document>(M: Model<T>): RequestHandler => (
  request,
  response,
) => {
  M.findByIdAndUpdate(request.params._id, request.body, { new: true })
    .then(record => response.json(record))
    .catch(error => {
      response.writeHead(500, 'Server Error')
      response.end()
      console.error(`Error in RESTController#update: ${error}`)
    })
}

export const deleteHandlerFactory = <T extends Document>(Model: Model<T>): RequestHandler => (
  request,
  response,
) => {
  Model.findByIdAndRemove(request.params._id)
    .then(record => response.json(record))
    .catch(error => {
      response.writeHead(500, 'Server Error')
      response.end()
      console.error(`Error in RESTController#delete: ${error}`)
    })
}

export const restControllerFactory = <T extends Document>(Model: Model<T>): RESTController => ({
  query: queryHandlerFactory(Model),
  save: saveHandlerFactory(Model),
  update: updateHandlerFactory(Model),
  delete: deleteHandlerFactory(Model),
})
