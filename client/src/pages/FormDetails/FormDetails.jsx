import React, { useState } from 'react'
import './FormDetails.css'
import {
  useGetSingleFormQuery,
  useUpdateFormStatusMutation,
} from '../../redux/slices/formApiSlice'
import Loader from '../../components/Loader/Loader'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import Modal from '../../components/Modal/Modal'
import ConfirmReject from '../../components/ConfirmReject/ConfirmReject'
import { useSelector } from 'react-redux'

const FileList = ({ links }) => {
  return (
    <ul className="file-links-list">
      {links.map((link, index) => (
        <li key={index}>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="file-link"
          >
            {`File ${index + 1}`}
          </a>
        </li>
      ))}
    </ul>
  )
}

const FormDetails = ({ id, setModalStatus }) => {
  const [isModalOpen, setModalState] = useState(false)
  const { data, isLoading } = useGetSingleFormQuery(id)
  const [reason, setReason] = useState('')

  const navigate = useNavigate()

  const location = useLocation()

  const [updateFormStatus, { isLoading: isUpdating }] =
    useUpdateFormStatusMutation()

  const formatField = (field) => {
    let newField = field.replace(/([A-Z])/g, ' $1')
    newField = newField.charAt(0).toUpperCase() + newField.slice(1)
    return newField
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
  }

  const { userInfo } = useSelector((state) => state.auth)
  const approverName = userInfo.name
  const approverEmail = userInfo.email

  if (isLoading) {
    return <Loader />
  }

  const { _id, updatedAt, submittedBy, __v, ...newData } = data

  const handleUpdateStatus = async (status) => {
    try {
      const result = await updateFormStatus({
        id,
        data: { status, reason, approverName, approverEmail },
      }).unwrap()
      setModalStatus(false)
      toast.success(`Request ${status}`)
      setTimeout(() => {
        navigate(location, { state: { formSubmitted: true } })
      }, 1000)
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <>
      <div className="form-details">
        <h2 className="form-details-title">Form Details</h2>
        <table>
          <tr>
            <th className="column-title">Field</th>
            <th className="column-title">Value</th>
          </tr>
          {data &&
            Object.entries(newData).map(([key, value]) => (
              <tr id={key}>
                <td className="data-field">{formatField(key)}</td>
                <td className="data-value">
                  {key === 'fileLinks' ? (
                    <FileList links={value} />
                  ) : key === 'createdAt' ? (
                    formatDate(value)
                  ) : (
                    value
                  )}
                </td>
              </tr>
            ))}
        </table>
        {isUpdating ? (
          <Loader />
        ) : (
          <div className="form-details-button">
            <button onClick={() => setModalState(true)}>Reject</button>
            <button
              onClick={() => handleUpdateStatus('Approved')}
              disabled={isUpdating}
            >
              Approve
            </button>
          </div>
        )}
      </div>
      {isModalOpen ? (
        <Modal setModalStatus={setModalState}>
          <ConfirmReject
            isUpdating={isUpdating}
            handleUpdateStatus={handleUpdateStatus}
            reason={reason}
            setReason={setReason}
          />
        </Modal>
      ) : (
        <></>
      )}
    </>
  )
}

export default FormDetails
