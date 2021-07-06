import { useTheme } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import React from 'react';
import { layoutSelector, useStore } from '../../controllers/store';
import { useLayoutStyles } from '../../lib/useLayoutStyles';

interface ISideMenu {
  Contents: React.FC<any>;
}

export const SideMenu: React.FC<ISideMenu> = ({ Contents }) => {
  const classes = useLayoutStyles();
  const theme = useTheme();
  const { mobileOpen, toggleMobileOpen } = useStore(layoutSelector);

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
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
          <Contents />
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <Contents />
        </Drawer>
      </Hidden>
    </nav>
  );
};
