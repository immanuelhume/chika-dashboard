import { Link } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { useLogoutMutation } from '../../graphql/generated';

interface IAvatarMenu {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
}

export const AvatarMenu: React.FC<IAvatarMenu> = ({
  anchorEl,
  handleClose,
}) => {
  const router = useRouter();
  const [logout] = useLogoutMutation();
  async function handleLogout() {
    await logout();
    // push to landing page
    router.push(process.env.NEXT_PUBLIC_LANDING_PAGE_URL);
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
