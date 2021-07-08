import Button from '@material-ui/core/Button';
import { useRouter } from 'next/dist/client/router';
import React, { useCallback } from 'react';
import { useStore } from '../../controllers/store';
import { Guild } from '../../graphql/generated';

interface IGuildBarButton {
  guild: Guild;
}

export const GoToDashboardButton: React.FC<IGuildBarButton> = ({ guild }) => {
  const setActiveGuild = useStore(
    useCallback((state) => state.setActiveGuild, []),
  );
  const router = useRouter();
  function handleClick() {
    setActiveGuild(guild);
    router.push('/commands');
  }
  return (
    <Button variant="text" color="default" onClick={handleClick}>
      Open Dashboard
    </Button>
  );
};

export const InviteChikaButton: React.FC = () => {
  return (
    <Button
      variant="text"
      color="default"
      href={process.env.NEXT_PUBLIC_INVITE_URL}
      target="_blank"
    >
      Invite Chika
    </Button>
  );
};
