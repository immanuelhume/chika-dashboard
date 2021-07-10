import { createStyles, makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      position: 'absolute',
      display: 'flex',
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
);

interface IIconButtonSpinner {
  size: 'medium' | 'small';
  loading: boolean;
}

export const IconButtonSpinner: React.FC<IIconButtonSpinner> = ({
  size,
  loading,
}) => {
  const classes = useStyles();
  if (!loading) return null;
  let spinnerSize = 40;
  switch (size) {
    case 'small':
      spinnerSize = 24;
      break;
    case 'medium':
      spinnerSize = 40;
      break;
    default:
      spinnerSize = 40;
  }
  return (
    <div className={classes.container}>
      <CircularProgress size={spinnerSize} color="secondary" />
    </div>
  );
};
