import React from 'react'
import './Checkbox.css'

const Checkbox = ({ name, value, onChange, placeholder, link, error }) => {
  return (
    <div className="checkbox-wrapper">
      <div className="checkbox-content">
        <input type="checkbox" name={name} value={value} onChange={onChange} />
        <p className="placeholder">
          {placeholder} <button className="link-button">{link}</button>
        </p>
      </div>
      <span className="error-info">{error}</span>
    </div>
  )
}

export default Checkbox
