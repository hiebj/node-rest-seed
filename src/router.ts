import { Router } from 'express'
import { GradeModel } from './models/Grade'
import { restControllerFactory } from './RESTController'
import { get as getSummary } from './SummaryController'

const router = Router()
const GradeController = restControllerFactory(GradeModel)

router.get('/grade/', GradeController.query)
router.get('/grade/:_id/', GradeController.query)
router.post('/grade/', GradeController.save)
router.post('/grade/:_id/', GradeController.update)
router.delete('/grade/:_id/', GradeController.delete)

router.get('/summary/', getSummary)

export default router
