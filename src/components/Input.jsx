import React from 'react';

import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  margin: {
    marginBottom: theme.spacing(2),
  },
}));

export function Input({ ...props }) {
  const classes = useStyles();

  return (
    <TextField
      {...props}
      className={classes.margin}
    />
  );
}
