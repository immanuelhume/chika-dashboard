import React, { useCallback } from 'react';
import { useStore } from '../../controllers/store';
import { useLayoutStyles } from '../../lib/useLayoutStyles';
import { NoGuildSideMenu } from '../atoms/NoGuildSideMenu';
import { Appbar } from '../molecules/Appbar';
import { MenuLinks } from '../molecules/MenuLinks';
import { SideMenu } from '../molecules/SideMenu';

interface ILayout {}

export const Layout: React.FC<ILayout> = ({ children }) => {
  const classes = useLayoutStyles();
  const { activeGuild, isDrawerMinified } = useStore(
    useCallback(
      // eslint-disable-next-line no-shadow
      ({ activeGuild, isDrawerMinified }) => ({
        activeGuild,
        isDrawerMinified,
      }),
      [],
    ),
  );

  return (
    <div className={classes.root}>
      <Appbar />
      <SideMenu>
        {activeGuild && <MenuLinks />}
        {!activeGuild && !isDrawerMinified && <NoGuildSideMenu />}
      </SideMenu>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};
