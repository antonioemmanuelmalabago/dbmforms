import React from 'react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import SriForm from '../../forms/SriForm'
import './SriPay.css'

const SriPay = () => {
  return (
    <>
      <Header />
      <div className="grid-divider">
        <Sidebar />
        <div className="sri-form">
          <SriForm />
        </div>
      </div>
    </>
  )
}

export default SriPay
