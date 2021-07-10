import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Center } from '../atoms/Center';

export const NoGuildScreen: React.FC = () => {
  return (
    <Center>
      <Typography variant="h2" color="textSecondary" gutterBottom>
        ( ⚆ _ ⚆ )
      </Typography>
      <Typography variant="h6" color="textSecondary" align="center">
        Well this is awkward...
      </Typography>
      <Typography variant="h6" color="textSecondary" align="center">
        Looks like you&apos;re not an admin in any servers.
      </Typography>
    </Center>
  );
};
