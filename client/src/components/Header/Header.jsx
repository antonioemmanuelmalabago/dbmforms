import React from 'react'
import { useSelector } from 'react-redux'
import banner from '../../images/banner.png'
import './Header.css'
import Avatar from '../Avatar/Avatar'
import { getInitials } from '../../utils/getInitials'

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth)
  console.log(userInfo)
  const firstName = userInfo.name.split(' ')[0]
  const initials = getInitials(userInfo.name)

  return (
    <div className="header-wrapper">
      <img src={banner} alt="Department of Budget and Management Banner" />
      <div className="right-section">
        <p className="welcome-banner">Welcome, {firstName}!</p>
        <Avatar initials={initials} />
      </div>
    </div>
  )
}

export default Header
