import React from 'react';

const PrimaryButton = ({ text, onClick, type = "button" }) => {
  return (
    <button className="primary-btn" onClick={onClick} type={type}>
      {text}
    </button>
  );
};

export default PrimaryButton;