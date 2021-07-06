import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import { useLayoutStyles } from '../../lib/useLayoutStyles';
import { Appbar } from '../molecules/Appbar';
import { MenuLinks } from '../molecules/MenuLinks';
import { SideMenu } from '../molecules/SideMenu';

interface ILayout {}

export const Layout: React.FC<ILayout> = ({ children }) => {
  const classes = useLayoutStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Appbar />
      <SideMenu Contents={MenuLinks} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};
