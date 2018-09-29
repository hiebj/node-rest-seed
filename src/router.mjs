import express from 'express'
import Grade from './models/Grade'
import RESTController from './RESTController'
import SummaryController  from './SummaryController'

const router = express.Router()
const GradeController = RESTController(Grade)

router.get('/grade/', GradeController.query)
router.post('/grade/', GradeController.save)
router.post('/grade/:_id/', GradeController.update)
router.delete('/grade/:_id/', GradeController.delete)

router.get('/summary/', SummaryController.get)

export default router
