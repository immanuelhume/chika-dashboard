import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
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
  return (
    <div>
      <Divider />
      <List>
        {links.map(({ primary, Icon }) => (
          <ListItem button key={primary}>
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
