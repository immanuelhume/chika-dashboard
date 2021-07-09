import { createStyles, makeStyles, Theme } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import { Layout } from './Layout';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
    },
  }),
);

export const LoadingScreen: React.FC = () => {
  const classes = useStyles();
  return (
    <Layout>
      <div className={classes.container}>
        <CircularProgress />
      </div>
    </Layout>
  );
};
