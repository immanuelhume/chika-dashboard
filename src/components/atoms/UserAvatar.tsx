import Avatar from '@material-ui/core/Avatar';
import React from 'react';
import { userGetterSelector, useStore } from '../../controllers/store';
import { avatar } from '../../lib/discord';

export const UserAvatar: React.FC = () => {
  const { user } = useStore(userGetterSelector);
  return <Avatar src={avatar(user?.id, user?.avatar)} />;
};
