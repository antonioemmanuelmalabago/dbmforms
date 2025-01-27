import React from 'react'
import Header from '/src/components/Header/Header'
import Sidebar from '/src/components/Sidebar/Sidebar'
import SriForm from '/src/forms/SRIForm'
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
