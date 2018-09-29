import express from 'express'
import Grade from './models/Grade'
import Diagnostics from './models/Diagnostics'
import RESTController from './RESTController'
import SummaryController from './SummaryController'

const router = express.Router()

const GradeController = RESTController(Grade)
router.get('/grade/', GradeController.query)
router.post('/grade/', GradeController.save)
router.post('/grade/:_id/', GradeController.update)
router.delete('/grade/:_id/', GradeController.delete)

const DiagnosticsController = RESTController(Diagnostics)
router.get('/diagnostics/', DiagnosticsController.query)
router.post('/diagnostics/', DiagnosticsController.save)

router.get('/summary/', SummaryController.get)

export default router
