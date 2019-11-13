import React from "react";

export function Button({ onClick, label }) {
  return (
    <button
      className={"ampx-button ampx-button__primary"}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
