import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import clsx from 'clsx';
import React, { useCallback } from 'react';
import { useStore } from '../../controllers/store';
import { useLayoutStyles } from '../../lib/useLayoutStyles';
import { ColorModeToggleButton } from '../atoms/ColorModeToggleButton';
import { HStack } from '../atoms/HStack';
import { UserAvatar } from '../atoms/UserAvatar';

interface IAppbar {}

export const Appbar: React.FC<IAppbar> = () => {
  const classes = useLayoutStyles();
  const { toggleMobileOpen, isDrawerMinified } = useStore(
    useCallback(
      // eslint-disable-next-line no-shadow
      ({ toggleMobileOpen, isDrawerMinified }) => ({
        toggleMobileOpen,
        isDrawerMinified,
      }),
      [],
    ),
  );

  return (
    <AppBar
      position="fixed"
      className={clsx(
        isDrawerMinified && classes.appBarMini,
        !isDrawerMinified && classes.appBar,
      )}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleMobileOpen}
          className={classes.menuButton}
        >
          <MenuRoundedIcon />
        </IconButton>
        <Typography variant="h6" noWrap className={classes.appBarTitle}>
          chika.ts
        </Typography>
        <HStack spacing="sm">
          <ColorModeToggleButton />
          <UserAvatar />
        </HStack>
      </Toolbar>
    </AppBar>
  );
};
