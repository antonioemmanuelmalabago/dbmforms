import React from 'react'
import { FaFileUpload } from 'react-icons/fa'
import './Upload.css'

const Upload = ({
  label,
  name,
  placeholder,
  onChange,
  fileCount,
  required,
  multiple,
}) => {
  return (
    <div className="upload-container">
      <label>{label}</label>
      <div className="upload-area">
        <FaFileUpload size={15} />
        {fileCount ? (
          <label htmlFor={name}>
            {fileCount} file{fileCount > 1 && 's'} selected
          </label>
        ) : (
          <label htmlFor={name}>{placeholder}</label>
        )}
      </div>

      <input
        type="file"
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        multiple={multiple}
        hidden
      />
    </div>
  )
}

export default Upload
