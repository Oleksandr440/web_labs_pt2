import React from 'react';

const PrimaryButton = ({ text, isDisabled = false }) => {
  return (
    <button className="primary-btn" disabled={isDisabled}>
      {text}
    </button>
  );
};

export default PrimaryButton;