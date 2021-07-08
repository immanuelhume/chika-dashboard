import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from '@material-ui/core';

interface IAvatarMenu {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
}

export const AvatarMenu: React.FC<IAvatarMenu> = ({
  anchorEl,
  handleClose,
}) => {
  function handleLogout() {
    // TODO: log out!
  }
  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={!!anchorEl}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      getContentAnchorEl={null}
    >
      <MenuItem onClick={handleLogout}>
        <Link>Logout</Link>
      </MenuItem>
    </Menu>
  );
};
