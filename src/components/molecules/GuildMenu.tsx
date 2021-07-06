import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useState } from 'react';
import {
  activeGuildSelector,
  userGetterSelector,
  useStore,
} from '../../controllers/store';
import { Guild } from '../../graphql/generated';
import { guildIcon } from '../../lib/discord';

export const GuildMenu: React.FC = () => {
  const { activeGuild, setActiveGuild } = useStore(activeGuildSelector);
  const { guilds } = useStore(userGetterSelector);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  function handleClickItem(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }
  function handleMenuItemClick(guild: Guild) {
    setActiveGuild(guild);
    setAnchorEl(null);
  }

  return (
    <>
      <List>
        <ListItem button onClick={handleClickItem}>
          <ListItemAvatar>
            <Avatar src={guildIcon(activeGuild?.id, activeGuild?.icon)} />
          </ListItemAvatar>
          <ListItemText primary={activeGuild?.name || 'Choose a server'} />
        </ListItem>
      </List>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={handleClose}
      >
        {guilds.map((guild) => {
          const { id, name, icon } = guild;
          return (
            <MenuItem
              key={id}
              selected={activeGuild?.id === id}
              onClick={() => handleMenuItemClick(guild)}
            >
              <ListItemAvatar>
                <Avatar src={guildIcon(id, icon)} />
              </ListItemAvatar>
              {name}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};
