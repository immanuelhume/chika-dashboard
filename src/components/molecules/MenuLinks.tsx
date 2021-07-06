import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AnnouncementTwoToneIcon from '@material-ui/icons/AnnouncementTwoTone';
import React from 'react';
import { useLayoutStyles } from '../../lib/useLayoutStyles';

export const MenuLinks: React.FC = () => {
  const classes = useLayoutStyles();

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <AnnouncementTwoToneIcon />
          </ListItemIcon>
          <ListItemText primary="Commands" />
        </ListItem>
      </List>
    </div>
  );
};
