import React, { useEffect, useState } from 'react'
import Textbox from '../components/Textbox/Textbox'
import Button from '../components/Button/Button'
import Checkbox from '../components/Checkbox/Checkbox'
import { validateForm } from '../utils/validateForm'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useRegisterMutation } from '../redux/slices/usersApiSlice'
import { setCredentials } from '../redux/slices/authSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader/Loader'
import './Forms.css'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    retypePassword: '',
    acceptTerms: false,
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [register, { isLoading }] = useRegisterMutation()

  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard')
    }
  }, [navigate, userInfo])

  const [errors, setErrors] = useState({})

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationErrors = validateForm(formData, 'Register')
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }).unwrap()
        dispatch(setCredentials({ ...res }))
        navigate('/dashboard')
        toast.success('Your account has been created')
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  return (
    <>
      <p className="title-text">Create Your Account</p>
      <p className="subtitle-text">Welcome! Please enter your details</p>
      <form onSubmit={handleSubmit}>
        <Textbox
          type="text"
          label="Name"
          name="name"
          value={formData.name}
          placeholder="Enter your name"
          onChange={handleInputChange}
          error={errors.name}
        />
        <Textbox
          type="email"
          label="Email"
          name="email"
          value={formData.email}
          placeholder="Enter your email"
          onChange={handleInputChange}
          error={errors.email}
        />
        <Textbox
          type="password"
          label="Password"
          name="password"
          value={formData.password}
          placeholder="Enter your password"
          onChange={handleInputChange}
          error={errors.password}
        />
        <Textbox
          type="password"
          label="Retype Password"
          name="retypePassword"
          value={formData.retypePassword}
          placeholder="Retype your password"
          onChange={handleInputChange}
          error={errors.retypePassword}
        />
        <Checkbox
          name="acceptTerms"
          value={formData.acceptTerms}
          onChange={handleInputChange}
          placeholder="I accepted all"
          link="terms & agreement"
          error={errors.acceptTerms}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <Button type="submit" value="Register" name="Register" />
        )}
      </form>
    </>
  )
}

export default Register
