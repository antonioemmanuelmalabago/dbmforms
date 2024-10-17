import React from 'react'
import './Dropdown.css'

const Dropdown = ({
  label,
  name,
  placeholder,
  onChange,
  options,
  required,
  error,
}) => {
  return (
    <div className="dropdown-container">
      <label htmlFor={name}>{label}</label>
      <select name={name} onChange={onChange} required={required}>
        <option selected disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option value={option.value}>{option.value}</option>
        ))}
      </select>
      {error ? <span>{error}</span> : <span></span>}
    </div>
  )
}

export default Dropdown
