import React from "react";

const Select = ({ label, name, value, onChange, options, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        className="form-control"
        value={value}
        onChange={onChange}
        id={name}
      >
        {options.map(option => {
          return (
            <option value={option._id} key={option._id}>
              {option.name}
            </option>
          );
        })}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
