import React from "react";
import MiButton from '@material-ui/core/Button';

export function Button({ onClick, readOnly, label }) {
  return (
    <MiButton
      variant="contained"
      color="primary"
      style={{ marginBottom: '20px' }}
      disabled={readOnly}
      onClick={readOnly ?  () => {} : onClick}
    >
      {label}
    </MiButton>
  );
}
