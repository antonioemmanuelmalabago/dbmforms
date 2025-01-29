import asyncHandler from 'express-async-handler'
import SRIForm from '../models/sriFormModel.js'
import GratuityForm from '../models/gratuityFormModel.js'
import User from '../models/userModel.js'
import { sendEmail } from '../services/emailService.js'
import { matchedData, validationResult } from 'express-validator'

// @desc    Submit SRI form
// route    POST /api/forms/sri
// @access  Private
const sendSriForm = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg)
    return res.status(400).json({ errors: errorMessages })
  }

  const user = req.user._id

  const formFields = Object.keys(SRIForm.schema.paths)
  const formData = formFields.reduce((acc, field) => {
    if (field in req.body) {
      acc[field] = req.body[field]
    }
    return acc
  }, {})

  const form = await SRIForm.create({
    ...formData,
    submittedBy: user,
  })

  await User.findByIdAndUpdate(user, {
    $push: { submittedForms: form._id },
  })

  if (form) {
    sendEmail('form-submit', formData.email)
    res.status(201).json({ form: form._id })
  } else {
    res.status(400)
    throw new Error('Form not submitted')
  }
})

// @desc    Submit Gratuity form
// route    POST /api/forms/gratuity
// @access  Private
const sendGratuityForm = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg)
    return res.status(400).json({ errors: errorMessages })
  }

  const user = req.user._id

  const formFields = Object.keys(GratuityForm.schema.paths)
  const formData = formFields.reduce((acc, field) => {
    if (field in req.body) {
      acc[field] = req.body[field]
    }
    return acc
  }, {})

  const form = await GratuityForm.create({
    ...formData,
    submittedBy: user,
  })

  await User.findByIdAndUpdate(user, {
    $push: { submittedForms: form._id },
  })

  if (form) {
    sendEmail('form-submit', formData.email)
    res.status(201).json({ form: form._id })
  } else {
    res.status(400)
    throw new Error('Form not submitted')
  }
})

// @desc    Get all forms
// route    GET /api/forms
// @access  Private
const getForms = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg)
    return res.status(400).json({ errors: errorMessages })
  }

  const user = await User.findById(req.user._id)
  console.log(req.query)
  const { type, status } = req.query

  let query = {}

  if (status) {
    query.status = status
  } else {
    query.status = { $ne: 'Pending' }
  }

  if (!user.isAdmin) {
    query.submittedBy = req.user._id
  }

  let sriQueryResult
  let gratuityQueryResult
  let forms

  switch (type) {
    case 'SRI':
      sriQueryResult = SRIForm.find(query).sort({ createdAt: -1 }).lean()
      forms = await sriQueryResult
      break
    case 'Gratuity':
      gratuityQueryResult = GratuityForm.find(query)
        .sort({ createdAt: -1 })
        .lean()
      forms = await gratuityQueryResult
      break
    default:
      const [sriForms, gratuityForms] = await Promise.all([
        SRIForm.find(query).sort({ createdAt: -1 }).lean(),
        GratuityForm.find(query).sort({ createdAt: -1 }).lean(),
      ])
      forms = [...sriForms, ...gratuityForms]
  }

  if (forms) {
    res.status(200).json(forms)
  } else {
    res.status(400)
    throw new Error('Unable to fetch forms')
  }
})

// @desc    Get single form
// route    GET /api/forms/:id
// @access  Private
const getForm = asyncHandler(async (req, res) => {
  const { id } = req.params

  const [sriResult, gratuityResult] = await Promise.all([
    SRIForm.findById(id).lean(),
    GratuityForm.findById(id).lean(),
  ])

  let form

  if (sriResult) {
    form = sriResult
  } else if (gratuityResult) {
    form = gratuityResult
  }

  if (!form) {
    res.status(400)
    throw new Error('Form not found')
  }

  res.status(200).json(form)
})

// @desc    Approve/reject form
// @route   PUT /api/forms/:id
// @access  Private
const editFormStatus = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { status, reason, approverName, approverEmail } = req.body

  const [sriResult, gratuityResult] = await Promise.all([
    SRIForm.findById(id),
    GratuityForm.findById(id),
  ])

  let result

  if (sriResult) {
    result = sriResult
  } else if (gratuityResult) {
    result = gratuityResult
  }

  if (!result) {
    res.status(400)
    throw new Error('Form not found')
  }

  result.status = status

  if (status === 'Rejected') {
    result.reason = reason
    result.approverName = approverName
    result.approverEmail = approverEmail
  }

  await result.save()

  const emailData = { reason, approverName, approverEmail }

  if (status === 'Approved') {
    sendEmail('request-approve', result.email, emailData)
  } else {
    sendEmail('request-update', result.email, emailData)
  }

  res.status(200).json({ form: result })
})

export { sendSriForm, sendGratuityForm, getForms, getForm, editFormStatus }
