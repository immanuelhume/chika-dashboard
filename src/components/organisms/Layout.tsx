import React from 'react';
import { useLayoutStyles } from '../../lib/useLayoutStyles';
import { Appbar } from '../molecules/Appbar';
import { GuildMenu } from '../molecules/GuildMenu';
import { MenuLinks } from '../molecules/MenuLinks';
import { SideMenu } from '../molecules/SideMenu';

interface ILayout {}

export const Layout: React.FC<ILayout> = ({ children }) => {
  const classes = useLayoutStyles();

  return (
    <div className={classes.root}>
      <Appbar />
      <SideMenu>
        <GuildMenu />
        <MenuLinks />
      </SideMenu>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};
