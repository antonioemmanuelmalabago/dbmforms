import React from 'react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import GratuityForm from '../../forms/GratuityForm'
import './GratuityPay.css'

const GratuityPay = () => {
  return (
    <>
      <Header />
      <div className="grid-divider">
        <Sidebar />
        <div className="gratuity-form">
          <GratuityForm />
        </div>
      </div>
    </>
  )
}

export default GratuityPay
