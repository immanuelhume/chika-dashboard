import { createStyles, makeStyles, Theme } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginLeft: theme.spacing(2),
    },
    progress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginLeft: -20,
      marginTop: -20,
    },
  }),
);

interface ISaveButton {
  loading: boolean;
}

export const SaveButton: React.FC<ISaveButton> = ({ loading }) => {
  const classes = useStyles();
  return (
    <Fab
      aria-label="submit da form"
      type="submit"
      size="small"
      className={classes.root}
    >
      <SaveRoundedIcon />
      {loading && (
        <CircularProgress className={classes.progress} color="secondary" />
      )}
    </Fab>
  );
};
