import React from 'react'
import './Button.css'

const Button = ({ type, value, name }) => {
  return (
    <div className="button-container">
      <input type={type} name={name} value={value} />
    </div>
  )
}

export default Button
