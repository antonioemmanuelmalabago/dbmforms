import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdDashboard } from 'react-icons/md'
import { FaArrowTrendUp, FaCoins } from 'react-icons/fa6'
import { FaHistory } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import './Sidebar.css'
import { usersApiSlice } from '../../redux/slices/usersApiSlice'

const adminMenu = [
  { title: 'Dashboard', path: '/dashboard', icon: <MdDashboard /> },
  { title: 'History', path: '/history', icon: <FaHistory /> },
]

const employeeMenu = [
  { title: 'SRI Pay', path: '/sri', icon: <FaArrowTrendUp /> },
  { title: 'Gratuity Pay', path: '/gratuity', icon: <FaCoins /> },
  { title: 'History', path: '/history', icon: <FaHistory /> },
]

const Sidebar = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const sidebarMenu = userInfo.isAdmin ? adminMenu : employeeMenu

  return (
    <div className="sidebar-wrapper">
      <ul className="nav-list">
        {sidebarMenu.map((item, index) => {
          return (
            <li className="nav-item" key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  ['nav-link', isActive ? 'active' : null].join(' ')
                }
              >
                <div className="nav-link-icon">
                  {item.icon} <span>{item.title}</span>
                </div>
              </NavLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Sidebar
