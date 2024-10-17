import React, { useState } from 'react'
import Textbox from '../components/Textbox/Textbox'
import Dropdown from '../components/Dropdown/Dropdown'
import {
  yearOptions,
  categoryOptions,
  grantOptions,
  departmentOptions,
  agencyOptions,
} from '../utils/sampleData'
import { uploadFile } from '../utils/uploadFile'
import { useSubmitSriFormMutation } from '../redux/slices/sriFormApiSlice'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Radio from '../components/Radio/Radio'
import Button from '../components/Button/Button'
import Upload from '../components/Upload/Upload'
import Loader from '../components/Loader/Loader'

const SRIForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    contactNumber: '',
    email: '',
    year: '',
    category: '',
    agencyHead: '',
    isGrant: null,
  })

  const [files, setFiles] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const [submitSriForm] = useSubmitSriFormMutation()

  const { userInfo } = useSelector((state) => state.auth)

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleFileChange = (event) => {
    setFiles(event.target.files)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Upload files in Firebase
    setIsLoading(true)
    const uploadPromises = Array.from(files).map((file) => uploadFile(file))
    const uploadedLinks = await Promise.all(uploadPromises)

    // Upload form data in MongoDB
    try {
      const res = await submitSriForm({
        ...formData,
        fileLinks: uploadedLinks,
        submittedBy: userInfo._id,
      }).unwrap()
      toast.success('Form submitted successfully')
      setIsLoading(false)
      setTimeout(() => {
        navigate('/dashboard', { state: { formSubmitted: true } })
      }, 2000)
    } catch (err) {
      toast.error(err?.data?.message || err.error)
      setIsLoading(false)
    }
  }

  return (
    <>
      <p className="title-text">Service Recognition Incentive (SRI) Pay</p>
      <p className="subtitle-text">
        Please complete all details before submitting.
      </p>
      <form onSubmit={handleSubmit}>
        <section className="personal-information">
          <p className="section-label">Personal Information</p>
          <Textbox
            type="text"
            label="Name"
            name="name"
            value={formData.name}
            placeholder="Enter your name"
            onChange={handleInputChange}
            required={true}
          />
          <Textbox
            type="text"
            label="Designation"
            name="designation"
            value={formData.designation}
            placeholder="Enter your position"
            onChange={handleInputChange}
            required={true}
          />
          <Textbox
            type="text"
            label="Contact Number"
            name="contactNumber"
            value={formData.contactNumber}
            placeholder="Enter your contact number"
            onChange={handleInputChange}
            required={true}
          />
          <Textbox
            type="email"
            label="Email"
            name="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={handleInputChange}
            required={true}
          />
        </section>

        <section className="department-agency-information">
          <p className="section-label">Department / Agency Information</p>
          <Dropdown
            label="Year"
            name="year"
            placeholder="Select a year"
            onChange={handleInputChange}
            options={yearOptions}
            required={true}
          />
          <Radio
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            options={categoryOptions}
            required={true}
          />
          <p className="section-label">{formData.category}</p>
          {formData.category === 'NGAs' && (
            <>
              <Dropdown
                label="Department Name"
                name="departmentName"
                placeholder="Select a department"
                onChange={handleInputChange}
                options={departmentOptions}
                required={true}
              />
              <Dropdown
                label="Agency Name"
                name="agencyName"
                placeholder="Select an agency"
                onChange={handleInputChange}
                options={agencyOptions}
                required={true}
              />
            </>
          )}
          {formData.category === 'GOCCs' && (
            <>
              <Textbox
                type="text"
                label="Name of GOCCs"
                name="goccName"
                value={formData.goccName}
                placeholder="Enter name"
                onChange={handleInputChange}
                required={true}
              />
            </>
          )}
          {formData.category === 'LWDs' && (
            <>
              <Textbox
                type="text"
                label="Name of LWDs"
                name="lwdName"
                value={formData.lwdName}
                placeholder="Enter name"
                onChange={handleInputChange}
                required={true}
              />
            </>
          )}
          {formData.category === 'LGUs' && (
            <>
              <Textbox
                type="text"
                label="Province"
                name="lguProvince"
                value={formData.lguProvince}
                placeholder="Enter province"
                onChange={handleInputChange}
                required={true}
              />
              <Textbox
                type="text"
                label="City / Municipality"
                name="lguCityMunicipal"
                value={formData.lguCityMunicipal}
                placeholder="Enter city or municipality"
                onChange={handleInputChange}
                required={true}
              />
            </>
          )}
          {formData.category === 'SUCs' && (
            <>
              <Dropdown
                label="Name of SUCs"
                name="sucName"
                placeholder="Select a university"
                onChange={handleInputChange}
                options={agencyOptions}
                required={true}
              />
            </>
          )}
          {formData.category === 'Others' && (
            <>
              <Textbox
                type="text"
                label="Name of department or agency"
                name="otherDeptAgency"
                value={formData.otherDeptAgency}
                placeholder="Enter department or agency"
                onChange={handleInputChange}
                required={true}
              />
            </>
          )}
        </section>

        <section className="certified-by">
          <p className="section-label">Certified by:</p>
          <Textbox
            type="text"
            label="Agency Head"
            name="agencyHead"
            value={formData.agencyHead}
            placeholder="Enter agency head"
            onChange={handleInputChange}
            required={true}
          />
          <Radio
            label="Did your Department/Agency/Institution grant the SRI?"
            name="isGrant"
            value={formData.isGrant}
            onChange={handleInputChange}
            options={grantOptions}
            required={true}
          />
          {formData.isGrant === 'NO' && (
            <>
              <Textbox
                type="text"
                label="Please state reason/s for non-grant"
                name="reasonNonGrant"
                value={formData.reasonNonGrant}
                placeholder="Enter your reasons"
                onChange={handleInputChange}
                required={true}
              />
            </>
          )}
        </section>

        <section className="upload-report">
          <p className="section-label">Upload Report</p>
          <Upload
            label="File name should be <deptname><agencyname>"
            name="files"
            placeholder="Choose a file..."
            onChange={handleFileChange}
            fileCount={files.length}
            required={true}
            multiple={true}
          />
        </section>
        {isLoading ? (
          <Loader />
        ) : (
          <Button type="submit" value="Submit" name="Submit" />
        )}
      </form>
    </>
  )
}

export default SRIForm
