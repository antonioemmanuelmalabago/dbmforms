import React, { useState } from 'react'
import './FormDetails.css'
import {
  useGetSingleFormQuery,
  useUpdateFormStatusMutation,
} from '/src/redux/slices/formApiSlice'
import Loader from '/src/components/Loader/Loader'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'

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
  const { data, isLoading } = useGetSingleFormQuery(id)

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

  if (isLoading) {
    return <Loader />
  }

  const { _id, updatedAt, submittedBy, __v, ...newData } = data

  const handleUpdateStatus = async (status) => {
    try {
      const result = await updateFormStatus({ id, data: { status } }).unwrap()
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
            <button
              onClick={() => handleUpdateStatus('Rejected')}
              disabled={isUpdating}
            >
              Reject
            </button>
            <button
              onClick={() => handleUpdateStatus('Approved')}
              disabled={isUpdating}
            >
              Approve
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default FormDetails
