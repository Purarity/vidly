import React from "react";

const SearchBox = ({ onChange, value }) => {
  return (
    <input
      onChange={e => onChange(e.currentTarget.value)}
      value={value}
      className="form-control"
      placeholder="Search..."
    />
  );
};

export default SearchBox;
