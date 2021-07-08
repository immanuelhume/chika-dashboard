import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    },
  }),
);

export const NoGuildSideMenu: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h3" color="textSecondary" gutterBottom>
        (☞ﾟ∀ﾟ)☞
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Pick a guild to get started!
      </Typography>
    </div>
  );
};
