import React from "react";

export function Input({ onChange, value, label, checkbox, locked, setLocked }) {

  const style = {
    display: "flex"
  };

  const checkboxStyle = {
    display: checkbox ? '' : 'none'
  }

  return (
    <div className={`ampx-input__container ${checkbox && locked ? 'ampx-input__container--disabled' : ''}`}>
      <label className="ampx-input__label">{label}</label>
      <div style={style}>
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
          style={checkboxStyle} />
      </div>
    </div>
  );
}
