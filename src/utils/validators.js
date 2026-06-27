// Form validation rules for DSNOVE website

export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone) => {
  // Simple validation for international format
  const re = /^\+?[0-9\s\-()]{7,20}$/;
  return re.test(String(phone));
};

export const validatePassword = (password) => {
  // At least 6 characters
  return password && password.length >= 6;
};

export const validateNotEmpty = (val) => {
  return val !== undefined && val !== null && String(val).trim() !== '';
};

export const validateContactForm = (name, email, subject, message) => {
  const errors = {};
  if (!validateNotEmpty(name)) errors.name = 'Full name is required';
  if (!validateEmail(email)) errors.email = 'Please enter a valid email address';
  if (!validateNotEmpty(subject)) errors.subject = 'Subject is required';
  if (!validateNotEmpty(message) || message.length < 10) errors.message = 'Message must be at least 10 characters long';
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateCareerForm = (name, email, phone, role, resume) => {
  const errors = {};
  if (!validateNotEmpty(name)) errors.name = 'Full name is required';
  if (!validateEmail(email)) errors.email = 'Please enter a valid email';
  if (!validatePhone(phone)) errors.phone = 'Please enter a valid phone number';
  if (!validateNotEmpty(role)) errors.role = 'Please select a job role';
  if (!resume) errors.resume = 'Resume file upload is required';
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
