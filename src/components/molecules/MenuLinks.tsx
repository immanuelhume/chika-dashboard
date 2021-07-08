import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import { useRouter } from 'next/dist/client/router';
import React from 'react';

interface MenuLink {
  primary: string;
  href: string;
  Icon: React.FC;
}

const links: MenuLink[] = [
  {
    primary: 'Commands',
    href: '/commands',
    Icon: BubbleChartIcon,
  },
];

interface IMenuLinks {}

export const MenuLinks: React.FC<IMenuLinks> = () => {
  const router = useRouter();
  return (
    <div>
      <Divider />
      <List>
        {links.map(({ primary, Icon, href }) => (
          <ListItem button key={primary} onClick={() => router.push(href)}>
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
