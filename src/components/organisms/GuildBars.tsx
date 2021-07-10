import Grid from '@material-ui/core/Grid';
import React, { useCallback } from 'react';
import { useStore } from '../../controllers/store';
import { GuildBar } from '../molecules/GuildBar';

interface IGuildBars {}

export const GuildBars: React.FC<IGuildBars> = () => {
  const { guilds } = useStore(
    // eslint-disable-next-line no-shadow
    useCallback(({ guilds }) => ({ guilds }), []),
  );

  return (
    <Grid container spacing={2}>
      {guilds.map((guild) => (
        <Grid item key={guild.id} xs={12}>
          <GuildBar guild={guild} />
        </Grid>
      ))}
    </Grid>
  );
};
