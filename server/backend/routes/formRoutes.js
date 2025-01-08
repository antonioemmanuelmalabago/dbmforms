import express from 'express'
const router = express.Router()
import {
  sendSriForm,
  sendGratuityForm,
  getForms,
  getForm,
  editFormStatus,
} from '../controllers/formController.js'
import { protect } from '../middleware/authMiddleware.js'
import {
  validateFields,
  validateQuery,
} from '../middleware/validationMiddleware.js'

router.post('/sri', protect, validateFields, sendSriForm)
router.post('/gratuity', protect, validateFields, sendGratuityForm)

router.get('/', protect, validateQuery, getForms)
router.get('/:id', protect, getForm)
router.put('/:id', protect, editFormStatus)

export default router
