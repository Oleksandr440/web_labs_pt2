import React from 'react';

const Select = ({ label }) => {
  return (
    <select className="ui-select" disabled>
      <option>{label}</option>
    </select>
  );
};

export default Select;