import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';
import NoSsr from '@material-ui/core/NoSsr';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import React, { useCallback, useState } from 'react';
import { useStore } from '../../controllers/store';
import { avatar } from '../../lib/discord';
import { AvatarMenu } from '../molecules/AvatarMenu';

export const UserAvatar: React.FC = () => {
  const user = useStore(useCallback((state) => state.user, []));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <>
      <ButtonBase disableRipple onClick={handleClick}>
        <NoSsr>
          <Avatar src={avatar(user?.id, user?.avatar)} />
        </NoSsr>
        <ExpandMoreRoundedIcon />
      </ButtonBase>
      <AvatarMenu anchorEl={anchorEl} handleClose={handleClose} />
    </>
  );
};
