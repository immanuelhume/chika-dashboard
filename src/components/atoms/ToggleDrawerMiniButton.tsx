import { createStyles, makeStyles, Theme } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FirstPageRoundedIcon from '@material-ui/icons/FirstPageRounded';
import LastPageRoundedIcon from '@material-ui/icons/LastPageRounded';
import React, { useCallback } from 'react';
import { useStore } from '../../controllers/store';

interface IToggleDrawerMiniButton {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 'auto',
      marginBottom: theme.spacing(2),
    },
  }),
);

export const ToggleDrawerMiniButton: React.FC<IToggleDrawerMiniButton> = () => {
  const classes = useStyles();
  const { isDrawerMinified, toggleDrawerMinified } = useStore(
    useCallback(
      // eslint-disable-next-line no-shadow
      ({ isDrawerMinified, toggleDrawerMinified }) => ({
        isDrawerMinified,
        toggleDrawerMinified,
      }),
      [],
    ),
  );
  return (
    <ListItem button className={classes.root} onClick={toggleDrawerMinified}>
      <ListItemIcon>
        {isDrawerMinified ? <LastPageRoundedIcon /> : <FirstPageRoundedIcon />}
      </ListItemIcon>
    </ListItem>
  );
};
