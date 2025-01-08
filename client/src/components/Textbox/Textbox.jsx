import React from 'react'
import './Textbox.css'

const Textbox = ({
  label,
  type,
  name,
  value,
  placeholder,
  onChange,
  required,
  error,
}) => {
  return (
    <div className="textbox-container">
      <label htmlFor={name}>{label}</label>
      <input
        type={type || 'text'}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      />
      {error ? <span>{error}</span> : <span></span>}
    </div>
  )
}

export default Textbox
