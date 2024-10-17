import React, { useState } from 'react'
import './Card.css'
import { getInitials } from '../../utils/getInitials'
import { useNavigate } from 'react-router-dom'
import Modal from '../Modal/Modal'
import FormDetails from '../../pages/FormDetails/FormDetails'

const Card = ({ form }) => {
  const [isModalOpen, setModalState] = useState(false)

  const handleClick = () => {
    setModalState(true)
  }
  return (
    <>
      <div className="card-container">
        <div className="header">
          <div className="initials">
            <p>{getInitials(form.name)}</p>
          </div>
          <div className="type-name-designation">
            <p className="type">{form.formType}</p>
            <p className="name">{form.name}</p>
            <p className="designation">{form.designation}</p>
          </div>
        </div>
        <div className="body">
          <div className="details year">
            <span>Year:</span> {form.year}
          </div>
          <div className="details category">
            <span>Category:</span> {form.category}
          </div>
          <div className="details head">
            <span>Head:</span> {form.agencyHead}
          </div>
          <div className="details status">
            <span>Status:</span> {form.status}
          </div>
        </div>
        <button className="card-button" onClick={handleClick}>
          Show Details
        </button>
      </div>
      {isModalOpen ? (
        <Modal setModalStatus={setModalState}>
          <FormDetails id={form._id} setModalStatus={setModalState} />
        </Modal>
      ) : (
        <></>
      )}
    </>
  )
}

export default Card
