import React from "react";

export function Button({ onClick, readOnly, label }) {
  const isDisabled = readOnly ? 'ampx-button__disabled' : '';

  return (
    <button
      className={`ampx-button ampx-button__primary ${isDisabled}`}
      onClick={readOnly ?  () => {} : onClick}
    >
      {label}
    </button>
  );
}
