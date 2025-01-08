import React from 'react'
import './Radio.css'

const Radio = ({ label, name, value, onChange, options, required, error }) => {
  return (
    <div className="radio-container">
      <label htmlFor={name}>{label}</label>
      <div className="radio-buttons">
        {options.map((option) => (
          <div className="radio-button" key={option.value}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              required={required}
            />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        ))}
      </div>
      {error ? <span>{error}</span> : <span></span>}
    </div>
  )
}

export default Radio
