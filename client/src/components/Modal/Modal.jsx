import React from 'react'
import { IoMdCloseCircle } from 'react-icons/io'
import './Modal.css'

const Modal = ({ setModalStatus, children }) => {
  const handleCloseButton = () => {
    setModalStatus(false)
  }

  return (
    <div className="modal-wrapper">
      <div className="overlay"></div>
      <div className="modal-container">
        <div className="close-button">
          <button onClick={handleCloseButton}>
            <span>
              <IoMdCloseCircle />
            </span>
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  )
}

export default Modal
