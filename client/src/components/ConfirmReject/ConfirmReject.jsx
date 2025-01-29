import React, { useState } from 'react'
import './ConfirmReject.css'

const ConfirmReject = ({
  isUpdating,
  handleUpdateStatus,
  reason,
  setReason,
}) => {
  return (
    <>
      <h2 className="confirm-reject-title">Reject report?</h2>
      <p>State reason/s for rejection:</p>
      <textarea
        name=""
        id=""
        cols="20"
        rows="5"
        value={reason}
        onChange={() => setReason(event.target.value)}
      ></textarea>
      <div className="confirm-reject-button">
        <button
          onClick={() => handleUpdateStatus('Rejected')}
          disabled={isUpdating}
        >
          Reject
        </button>
      </div>
    </>
  )
}

export default ConfirmReject
