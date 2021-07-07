import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import React, { useCallback } from 'react';
import { useStore } from '../../controllers/store';
import { GuildBar } from '../molecules/GuildBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);

interface IGuildBars {}

export const GuildBars: React.FC<IGuildBars> = () => {
  const guilds = useStore(useCallback((state) => state.guilds, []));
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Grid container spacing={2}>
        {guilds.map((guild) => (
          <Grid item key={guild.id} xs={12}>
            <GuildBar guild={guild} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
