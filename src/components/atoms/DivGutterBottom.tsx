import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2),
    },
  }),
);

interface IDivGutterBottom {}

export const DivGutterBottom: React.FC<IDivGutterBottom> = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
};
