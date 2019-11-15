import React from "react";

import LockIcon from '@material-ui/icons/Lock';
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/styles/makeStyles";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles(theme => ({
  margin: {
    marginBottom: theme.spacing(2),
  },
}));

export function Input({ onChange, value, label, checkbox, locked, setLocked, readOnly }) {
  const classes = useStyles();

  const lock = {
    endAdornment: (
      <InputAdornment position="end">
        {
          locked ?
            <LockIcon onClick={setLocked} /> :
            <LockOpenIcon onClick={setLocked} />
        }
      </InputAdornment>
    ),
  };

  return (
    <TextField
      className={classes.margin}
      label={label}
      value={value}
      onChange={onChange}
      disabled={(checkbox && locked) || readOnly}
      InputProps={checkbox && !readOnly ? lock : {}}
    />
  );
}
