import mongoose from 'mongoose'

const sriFormSchema = mongoose.Schema(
  {
    // Personal Information
    name: { type: String, required: true },
    designation: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },

    // Department / Agency Information
    year: { type: String, required: true },
    category: {
      type: String,
      enum: ['NGAs', 'GOCCs', 'LWDs', 'LGUs', 'SUCs', 'Others'],
      required: true,
    },

    // Category-specific fields
    departmentName: {
      type: String,
      required: function () {
        return this.category === 'NGAs'
      },
    },
    agencyName: {
      type: String,
      required: function () {
        return this.category === 'NGAs'
      },
    },
    goccName: {
      type: String,
      required: function () {
        return this.category === 'GOCCs'
      },
    },
    lwdName: {
      type: String,
      required: function () {
        return this.category === 'LWDs'
      },
    },
    lguProvince: {
      type: String,
      required: function () {
        return this.category === 'LGUs'
      },
    },
    lguCityMunicipal: {
      type: String,
      required: function () {
        return this.category === 'LGUs'
      },
    },
    sucName: {
      type: String,
      required: function () {
        return this.category === 'SUCs'
      },
    },
    otherDeptAgency: {
      type: String,
      required: function () {
        return this.category === 'Others'
      },
    },

    // Certification
    agencyHead: {
      type: String,
      required: true,
    },
    isGrant: {
      type: String,
      required: true,
      enum: ['YES', 'NO'],
    },
    reasonNonGrant: {
      type: String,
      required: function () {
        return this.isGrant === 'NO'
      },
    },

    // File uploads
    fileLinks: [{ type: String }],

    // Reference to user
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // Form type for sorting
    formType: {
      type: String,
      default: 'SRI',
      immutable: true,
    },

    // Form status
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },

    // Form reject reason
    reason: {
      type: String,
    },

    // Form approver name
    approverName: {
      type: String,
    },

    // Form approver email
    approverEmail: {
      type: String,
    },
  },
  { timestamps: true }
)

const SRIForm = mongoose.model('SRIForm', sriFormSchema)

export default SRIForm
