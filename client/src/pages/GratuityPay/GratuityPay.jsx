import React from 'react'
import Header from '/src/components/Header/Header'
import Sidebar from '/src/components/Sidebar/Sidebar'
import GratuityForm from '/src/forms/GratuityForm'
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
