import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import { useSnackbar } from 'notistack';
import React, { useCallback, useState } from 'react';
import { useStore } from '../../controllers/store';
import { Guild } from '../../graphql/generated';
import { guildIcon } from '../../lib/discord';

export const GuildMenu: React.FC = () => {
  const { guilds, activeGuild, setActiveGuild } = useStore(
    useCallback(
      // eslint-disable-next-line no-shadow
      ({ guilds, activeGuild, setActiveGuild }) => ({
        guilds,
        activeGuild,
        setActiveGuild,
      }),
      [],
    ),
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { enqueueSnackbar } = useSnackbar();

  function handleClickItem(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }
  function handleMenuItemClick(guild: Guild) {
    setActiveGuild(guild);
    setAnchorEl(null);
    enqueueSnackbar(`Switched to ${guild.name}`, {
      variant: 'info',
    });
  }

  return (
    <>
      <List>
        <ListItem button onClick={handleClickItem}>
          <ListItemAvatar>
            <Avatar src={guildIcon(activeGuild?.id, activeGuild?.icon)} />
          </ListItemAvatar>
          <ListItemText primary={activeGuild?.name || 'Choose a server'} />
          <ListItemIcon>
            <SwapVertIcon />
          </ListItemIcon>
        </ListItem>
      </List>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={handleClose}
      >
        {guilds
          .filter((guild) => guild.isChikaIn)
          .map((guild) => {
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
