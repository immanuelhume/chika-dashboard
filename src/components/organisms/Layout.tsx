import React, { useCallback } from 'react';
import { useStore } from '../../controllers/store';
import { useLayoutStyles } from '../../lib/useLayoutStyles';
import { Appbar } from '../molecules/Appbar';
import { GuildMenu } from '../molecules/GuildMenu';
import { MenuLinks } from '../molecules/MenuLinks';
import { SideMenu } from '../molecules/SideMenu';

interface ILayout {}

export const Layout: React.FC<ILayout> = ({ children }) => {
  const classes = useLayoutStyles();
  const activeGuild = useStore(useCallback((state) => state.activeGuild, []));

  return (
    <div className={classes.root}>
      <Appbar />
      <SideMenu>
        {activeGuild ? (
          <>
            <GuildMenu />
            <MenuLinks />
          </>
        ) : (
          <div>no guild </div>
        )}
      </SideMenu>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};
