import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BubbleChartRoundedIcon from '@material-ui/icons/BubbleChartRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import { useRouter } from 'next/dist/client/router';
import React, { useCallback } from 'react';
import QueueMusicRoundedIcon from '@material-ui/icons/QueueMusicRounded';
import { useStore } from '../../controllers/store';

interface MenuLink {
  primary: string;
  href: string;
  Icon: React.FC;
}

const links: MenuLink[] = [
  {
    primary: 'Home',
    href: '/',
    Icon: HomeRoundedIcon,
  },
  {
    primary: 'Commands',
    href: '/commands',
    Icon: BubbleChartRoundedIcon,
  },
  {
    primary: 'Settings',
    href: '/settings',
    Icon: SettingsRoundedIcon,
  },
  {
    primary: 'Music',
    href: '/music',
    Icon: QueueMusicRoundedIcon,
  },
];

interface IMenuLinks {}

export const MenuLinks: React.FC<IMenuLinks> = () => {
  const router = useRouter();
  const { mobileOpen, toggleMobileOpen } = useStore(
    useCallback(
      // eslint-disable-next-line no-shadow
      ({ mobileOpen, toggleMobileOpen }) => ({
        mobileOpen,
        toggleMobileOpen,
      }),
      [],
    ),
  );
  return (
    <div>
      <Divider />
      <List>
        {links.map(({ primary, Icon, href }) => (
          <ListItem
            button
            key={primary}
            onClick={() => {
              if (mobileOpen) {
                toggleMobileOpen();
              }
              router.push(href);
            }}
            selected={router.route === href}
          >
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={primary} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};
