import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { IoLogOutOutline } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../../redux/slices/usersApiSlice'
import { clearCredentials } from '../../redux/slices/authSlice'
import Modal from '../Modal/Modal'
import Profile from '../../forms/Profile'
import './Avatar.css'

const Avatar = ({ initials }) => {
  const [isMenuOpen, setMenuStatus] = useState(false)
  const [isModalOpen, setModalStatus] = useState(false)

  const handleAvatarClick = () => {
    setMenuStatus((status) => !status)
  }

  const handleProfileClick = () => {
    setModalStatus((status) => !status)
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logout] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logout().unwrap()
      dispatch(clearCredentials())
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="avatar-wrapper">
        <button className="avatar" onClick={handleAvatarClick}>
          {initials}
        </button>
      </div>
      {isMenuOpen ? (
        <div className="menu-container">
          <button onClick={handleProfileClick}>
            <FaUser />
            Profile
          </button>
          <button onClick={logoutHandler}>
            <IoLogOutOutline />
            Logout
          </button>
        </div>
      ) : (
        <></>
      )}

      {isModalOpen ? (
        <Modal setModalStatus={setModalStatus}>
          <Profile />
        </Modal>
      ) : (
        <></>
      )}
    </>
  )
}

export default Avatar
