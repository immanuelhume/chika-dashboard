import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';
import NoSsr from '@material-ui/core/NoSsr';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useCallback, useState } from 'react';
import { useStore } from '../../controllers/store';
import { avatar } from '../../lib/discord';
import { AvatarMenu } from '../molecules/AvatarMenu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    expand: {
      alignSelf: 'end',
    },
  }),
);

export const UserAvatar: React.FC = () => {
  const user = useStore(useCallback((state) => state.user, []));
  const classes = useStyles();
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
        <ExpandMoreIcon />
      </ButtonBase>
      <AvatarMenu anchorEl={anchorEl} handleClose={handleClose} />
    </>
  );
};
