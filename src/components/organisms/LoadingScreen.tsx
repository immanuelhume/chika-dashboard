import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import { Layout } from './Layout';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
    },
  }),
);

export const LoadingScreen: React.FC = () => {
  const classes = useStyles();
  return (
    <Layout>
      <Backdrop open className={classes.backdrop}>
        <CircularProgress />
      </Backdrop>
    </Layout>
  );
};
