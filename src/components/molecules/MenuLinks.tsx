import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import { useRouter } from 'next/dist/client/router';
import React, { useCallback } from 'react';
import { useStore } from '../../controllers/store';

interface MenuLink {
  primary: string;
  href: string;
  Icon: React.FC;
}

const links: MenuLink[] = [
  {
    primary: 'Commands',
    href: 'commands',
    Icon: BubbleChartIcon,
  },
];

interface IMenuLinks {}

export const MenuLinks: React.FC<IMenuLinks> = () => {
  const router = useRouter();
  const activeGuild = useStore(useCallback((state) => state.activeGuild, []));
  return (
    <div>
      <Divider />
      <List>
        {links.map(({ primary, Icon, href }) => (
          <ListItem
            button
            key={primary}
            onClick={() =>
              router.push({
                pathname: `/[guildId]/${href}`,
                query: { guildId: activeGuild?.id },
              })
            }
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
