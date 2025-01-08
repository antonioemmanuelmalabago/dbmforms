import React, { useEffect, useState } from 'react'
import Textbox from '../components/Textbox/Textbox'
import Button from '../components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../redux/slices/usersApiSlice'
import { setCredentials } from '../redux/slices/authSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader/Loader'
import './Forms.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard')
    }
  }, [navigate, userInfo])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const res = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate('/dashboard')
      toast.success('Login Successfull!')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <>
      <p className="title-text">Login to Your Account</p>
      <p className="subtitle-text">
        Welcome back! Please enter your credentials
      </p>
      <form onSubmit={handleSubmit}>
        <Textbox
          type="email"
          label="Email"
          name="email"
          value={formData.email}
          placeholder="Enter your email"
          onChange={handleInputChange}
        />
        <Textbox
          type="password"
          label="Password"
          name="password"
          value={formData.password}
          placeholder="Enter your password"
          onChange={handleInputChange}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <Button type="submit" value="Login" name="Login" />
        )}
      </form>
    </>
  )
}

export default Login
