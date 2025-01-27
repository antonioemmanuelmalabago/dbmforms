import React, { useEffect, useState } from 'react'
import Header from '/src/components/Header/Header'
import './History.css'
import Sidebar from '/src/components/Sidebar/Sidebar'
import Card from '/src/components/Card/Card'
import { useGetAllFormsQuery } from '/src/redux/slices/formApiSlice'
import { useLocation } from 'react-router-dom'
import Loader from '/src/components/Loader/Loader'

const History = () => {
  const [formType, setFormType] = useState('')
  const { data, isLoading, refetch } = useGetAllFormsQuery({
    typeQuery: formType,
  })

  const location = useLocation()

  const handleFilter = (type) => {
    setFormType(type)
  }

  useEffect(() => {
    if (location.state?.formSubmitted) {
      refetch()
    }
  }, [location, refetch])

  return (
    <>
      <Header />
      <div className="grid-divider">
        <Sidebar />

        <div className="history-section">
          <div className="history-header">
            <p className="title">Previous Responses</p>
            <div className="history-filter">
              <button
                onClick={() => handleFilter('')}
                className={`history-no-filter ${
                  formType === '' ? 'selected-filter' : ''
                }`}
              >
                <span>All</span>
              </button>
              <button
                onClick={() => handleFilter('SRI')}
                className={`history-sri-filter ${
                  formType === 'SRI' ? 'selected-filter' : ''
                }`}
              >
                <span>SRI</span>
              </button>
              <button
                onClick={() => handleFilter('Gratuity')}
                className={`history-gratuity-filter ${
                  formType === 'Gratuity' ? 'selected-filter' : ''
                }`}
              >
                <span>Gratuity</span>
              </button>
            </div>
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="card-section">
                {data?.map((form, index) => (
                  <Card key={index} form={form} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default History
