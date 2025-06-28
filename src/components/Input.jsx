import React from "react";

/**
 *
 * @param {string} value
 * @returns
 */
const Input = ({ value, placeholder, onChange, type = "text" }) => {
  return (
    <div className="form-group">
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Input;
