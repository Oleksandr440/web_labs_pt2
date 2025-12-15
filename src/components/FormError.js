import React from 'react';

const FormError = ({ errors, touched }) => {
  const errorMessages = Object.keys(errors).filter(key => touched[key]).map(key => errors[key]);

  if (errorMessages.length === 0) return null;

  return (
    <div className="form-error-box">
      <div className="error-title">Fix these errors:</div>
      <ul>
        {errorMessages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default FormError;