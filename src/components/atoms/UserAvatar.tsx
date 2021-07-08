import Avatar from '@material-ui/core/Avatar';
import NoSsr from '@material-ui/core/NoSsr';
import React, { useCallback } from 'react';
import { useStore } from '../../controllers/store';
import { avatar } from '../../lib/discord';

export const UserAvatar: React.FC = () => {
  const user = useStore(useCallback((state) => state.user, []));
  return (
    <NoSsr>
      <Avatar src={avatar(user?.id, user?.avatar)} />
    </NoSsr>
  );
};
