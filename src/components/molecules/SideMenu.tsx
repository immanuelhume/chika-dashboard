import { useTheme } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import NoSsr from '@material-ui/core/NoSsr';
import clsx from 'clsx';
import React, { useCallback } from 'react';
import { useStore } from '../../controllers/store';
import { useLayoutStyles } from '../../lib/useLayoutStyles';
import { ToggleDrawerMiniButton } from '../atoms/ToggleDrawerMiniButton';
import { GuildMenu } from './GuildMenu';

interface ISideMenu {}

export const SideMenu: React.FC<ISideMenu> = ({ children }) => {
  const classes = useLayoutStyles();
  const theme = useTheme();
  const { mobileOpen, toggleMobileOpen, isDrawerMinified } = useStore(
    useCallback(
      // eslint-disable-next-line no-shadow
      ({ mobileOpen, toggleMobileOpen, isDrawerMinified }) => ({
        mobileOpen,
        toggleMobileOpen,
        isDrawerMinified,
      }),
      [],
    ),
  );

  return (
    <nav
      className={clsx(
        isDrawerMinified && classes.drawerMini,
        !isDrawerMinified && classes.drawer,
      )}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={toggleMobileOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div className={classes.toolbar} />
          <GuildMenu isMini={false} />
          <NoSsr>{children}</NoSsr>
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: clsx(
              isDrawerMinified && classes.drawerPaperMini,
              !isDrawerMinified && classes.drawerPaper,
            ),
          }}
          variant="permanent"
          open
        >
          <div className={classes.toolbar} />
          <GuildMenu isMini={isDrawerMinified} />
          <NoSsr>{children}</NoSsr>
          <ToggleDrawerMiniButton />
        </Drawer>
      </Hidden>
    </nav>
  );
};
