export const validateForm = (formData, mode) => {
  let errors = {}

  // Checks if email is empty or email format is invalid
  if (!formData.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Email is invalid.'
  }

  // Checks if password is empty or at least 8 chars long
  if (!formData.password.trim()) {
    errors.password = 'Password is required.'
  } else if (formData.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.'
  } else if (!/^(?=.*[a-z])/.test(formData.password)) {
    errors.password = 'Password must contain at least one lowercase letter.'
  } else if (!/^(?=.*[A-Z])/.test(formData.password)) {
    errors.password = 'Password must contain at least one uppercase letter.'
  } else if (!/^(?=.*\d)/.test(formData.password)) {
    errors.password = 'Password must contain at least one digit.'
  } else if (!/^(?=.*[@$!%*?&])/.test(formData.password)) {
    errors.password = 'Password must contain at least one special character.'
  }

  if (mode === 'Register') {
    // Checks if name field is empty or only contains whitespace
    if (!formData.name.trim()) {
      errors.name = 'Name is required.'
    }

    // Checks if passwords match
    if (formData.password !== formData.retypePassword) {
      errors.retypePassword = 'Passwords do not match.'
    }

    // Checks if accepted terms and agreement
    if (!formData.acceptTerms) {
      errors.acceptTerms = 'You must accept the terms and agreement.'
    }
  }

  return errors
}
