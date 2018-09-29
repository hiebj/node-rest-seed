const SummaryController = {
  get: function(request, response) {
    Promise.all([
        Grade.findOne().sort('score').exec(),
        Grade.findOne().sort('-score').exec(),
        Grade.aggregate()
          .group({ _id: null, avg: { $avg: '$score' } })
          .exec()
      ])
      .then(summary => {
        response.json({
          min: summary[0],
          max: summary[1],
          avg: summary[2][0] ? new Grade({
            score: Math.round(summary[2][0].avg)
          }) : null
        })
      })
      .catch(error => {
        response.writeHead(500, 'Server Error')
        response.end()
        console.error(`Error in SummaryController#get: ${error}`)
      })
  }
}

export default SummaryController
