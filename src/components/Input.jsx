import React from 'react';

export function Input({ onChange, value, label }) {
  return (
    <div className="ampx-input__container">
      <label className="ampx-input__label">{ label }</label>
      <input
        className="ampx-input"
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
