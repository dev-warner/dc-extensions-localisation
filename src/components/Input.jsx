import React from "react";

export function Input({ onChange, value, label, checkbox, locked, setLocked, readOnly }) {
  const disabled = (checkbox && locked) || readOnly ? 'ampx-input__container--disabled' : '';

  return (
    <div className={`ampx-input__container ${disabled}`}>
      <label className="ampx-input__label">{label}</label>
      <div style={{ display: "flex" }}>
        <input
          className="ampx-input"
          type="text"
          value={value}
          onChange={onChange}
        />
        <input
          type="checkbox"
          name="lock"
          value={locked}
          onChange={setLocked}
          style={{ display: checkbox && !readOnly ? '' : 'none' }} />
      </div>
    </div>
  );
}
