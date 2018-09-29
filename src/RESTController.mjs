const RESTController = Model => ({
  query: (request, response) => {
    Model
      .find(request.params)
      .then(records => response.json(records))
      .catch(error => {
        response.writeHead(500, 'Server Error')
        response.end()
        console.error(`Error in RESTController#query: ${error}`)
      })
  },
  save: (request, response) => {
    new Model(request.body)
      .save()
      .then(record => response.json(record))
      .catch(error => {
        response.writeHead(500, 'Server Error')
        response.end()
        console.error(`Error in RESTController#save: ${error}`)
      })
  },
  update: (request, response) => {
    Model.findByIdAndUpdate(request.params._id, request.body, { new: true })
      .then(record => response.json(grade))
      .catch(error => {
        response.writeHead(500, 'Server Error')
        response.end()
        console.error(`Error in RESTController#update: ${error}`)
      })
  },
  delete: (request, response) => {
    Model
      .findByIdAndRemove(request.params._id)
      .then(() => {
        response.setHeader('Content-Type', 'text/plain')
        response.writeHead(200, 'OK')
        response.end()
      })
      .catch(error => {
        response.writeHead(500, 'Server Error')
        response.end()
        console.error(`Error in RESTController#delete: ${error}`)
      })
  }
})

export default RESTController
