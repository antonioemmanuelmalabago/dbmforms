import { checkSchema } from 'express-validator'

export const validateUser = checkSchema({
  name: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Name must not be empty',
    },
  },
  email: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Email must not be empty',
    },
    isEmail: {
      errorMessage: 'Invalid email',
    },
    normalizeEmail: true,
  },
  password: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Password must not be empty',
    },
    isLength: {
      options: {
        min: 8,
      },
      errorMessage: 'Password must be at least 8 characters long',
    },
    matches: {
      options:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      errorMessage:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  },
})

export const validateFields = checkSchema({
  name: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Name must not be empty',
    },
  },
  designation: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Designation must not be empty',
    },
  },
  contactNumber: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Contact number must not be empty',
    },
  },
  email: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Email must not be empty',
    },
    isEmail: {
      errorMessage: 'Invalid email',
    },
    normalizeEmail: true,
  },
  year: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Year must not be empty',
    },
  },
  category: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Category must not be empty',
    },
    isIn: {
      options: [['NGAs', 'GOCCs', 'LWDs', 'LGUs', 'SUCs', 'Others']],
      errorMessage: 'Invalid category',
    },
  },
  departmentName: {
    in: ['body'],
    isEmpty: {
      if: (value, { req }) => req.body.category !== 'NGAs',
      errorMessage: 'Department name should be empty for non-NGAs',
    },
    notEmpty: {
      if: (value, { req }) => req.body.category === 'NGAs',
      errorMessage: 'Department name must not be empty',
    },
  },
  agencyName: {
    in: ['body'],
    isEmpty: {
      if: (value, { req }) => req.body.category !== 'NGAs',
      errorMessage: 'Agency name should be empty for non-NGAs',
    },
    notEmpty: {
      if: (value, { req }) => req.body.category === 'NGAs',
      errorMessage: 'Agency name must not be empty',
    },
  },
  goccName: {
    in: ['body'],
    isEmpty: {
      if: (value, { req }) => req.body.category !== 'GOCCs',
      errorMessage: 'GOCCs name should be empty for non-GOCCs',
    },
    notEmpty: {
      if: (value, { req }) => req.body.category === 'GOCCs',
      errorMessage: 'GOCCs name must not be empty',
    },
  },
  lwdName: {
    in: ['body'],
    isEmpty: {
      if: (value, { req }) => req.body.category !== 'LWDs',
      errorMessage: 'LWDs name should be empty for non-LWDs',
    },
    notEmpty: {
      if: (value, { req }) => req.body.category === 'LWDs',
      errorMessage: 'LWDs name must not be empty',
    },
  },
  lguProvince: {
    in: ['body'],
    isEmpty: {
      if: (value, { req }) => req.body.category !== 'LGUs',
      errorMessage: 'LGU province should be empty for non-LGUs',
    },
    notEmpty: {
      if: (value, { req }) => req.body.category === 'LGUs',
      errorMessage: 'LGU province must not be empty',
    },
  },
  lguCityMunicipal: {
    in: ['body'],
    isEmpty: {
      if: (value, { req }) => req.body.category !== 'LGUs',
      errorMessage: 'LGU city should be empty for non-LGUs',
    },
    notEmpty: {
      if: (value, { req }) => req.body.category === 'LGUs',
      errorMessage: 'LGU city must not be empty',
    },
  },
  sucName: {
    in: ['body'],
    isEmpty: {
      if: (value, { req }) => req.body.category !== 'SUCs',
      errorMessage: 'SUCs name should be empty for non-SUCs',
    },
    notEmpty: {
      if: (value, { req }) => req.body.category === 'SUCs',
      errorMessage: 'SUCs name must not be empty',
    },
  },
  otherDeptAgency: {
    in: ['body'],
    isEmpty: {
      if: (value, { req }) => req.body.category !== 'Others',
      errorMessage: 'Agency name should be empty for other categories',
    },
    notEmpty: {
      if: (value, { req }) => req.body.category === 'Others',
      errorMessage: 'Agency name must not be empty',
    },
  },
  agencyHead: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Agency head must not be empty',
    },
  },
  isGrant: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Grant status must not be empty',
    },
    isIn: {
      options: [['YES', 'NO']],
      errorMessage: 'Invalid grant status',
    },
  },
  reasonNonGrant: {
    in: ['body'],
    isEmpty: {
      if: (value, { req }) => req.body.isGrant === 'YES',
      errorMessage: 'Reason for non-grant should be empty',
    },
    notEmpty: {
      if: (value, { req }) => req.body.isGrant === 'NO',
      errorMessage: 'Reason for non-grant must not be empty',
    },
    isLength: {
      if: (value, { req }) => req.body.isGrant === 'NO' && value,
      options: { min: 25 },
      errorMessage: 'Non-grant reason should be at least 25 characters long',
    },
  },
})

export const validateQuery = checkSchema({
  type: {
    in: ['query'],
    optional: true,
    isIn: {
      options: [['SRI', 'Gratuity']],
      errorMessage: 'Invalid form type',
    },
  },
  status: {
    in: ['query'],
    isIn: {
      options: [['Pending', 'Approved', 'Rejected', '']],
      errorMessage: 'Invalid form status',
    },
  },
})
