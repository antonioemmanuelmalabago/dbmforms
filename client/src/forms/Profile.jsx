import React, { useEffect, useState } from 'react'
import Textbox from '../components/Textbox/Textbox'
import Button from '../components/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { useUpdateMutation } from '../redux/slices/usersApiSlice'
import { setCredentials } from '../redux/slices/authSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader/Loader'
import './Forms.css'

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    retypePassword: '',
    acceptTerms: false,
  })

  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth)

  const [updateProfile, { isLoading }] = useUpdateMutation()

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      name: userInfo.name,
      email: userInfo.email,
    }))
  }, [userInfo.name, userInfo.email])

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (formData.password === formData.retypePassword) {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }).unwrap()
        dispatch(setCredentials({ ...res }))
        toast.success('Profile updated')
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    } else {
      toast.error('Passwords do not match')
    }
  }

  return (
    <>
      <p className="title-text">Update Profile</p>
      <p className="subtitle-text">Please save changes before leaving</p>
      <form onSubmit={handleSubmit}>
        <Textbox
          type="text"
          label="Name"
          name="name"
          value={formData.name}
          placeholder="Enter your name"
          onChange={handleInputChange}
        />
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
        <Textbox
          type="password"
          label="Retype Password"
          name="retypePassword"
          value={formData.retypePassword}
          placeholder="Retype your password"
          onChange={handleInputChange}
        />

        {isLoading ? (
          <Loader />
        ) : (
          <Button type="submit" value="Update" name="Update" />
        )}
      </form>
    </>
  )
}

export default Profile
