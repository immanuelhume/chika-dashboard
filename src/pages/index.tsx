import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useEffect } from 'react';
import { LoginPrompt } from '../components/molecules/LoginPrompt';
import { GuildBars } from '../components/organisms/GuildBars';
import { Layout } from '../components/organisms/Layout';
import { LoadingScreen } from '../components/organisms/LoadingScreen';
import { useStore } from '../controllers/store';
import { useMeQuery } from '../graphql/generated';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);

export default function Home() {
  const { data, loading, error } = useMeQuery();
  const { setUser, setGuilds } = useStore(
    useCallback(
      // eslint-disable-next-line no-shadow
      ({ setUser, setGuilds }) => ({
        setUser,
        setGuilds,
      }),
      [],
    ),
  );
  useEffect(() => {
    setUser(data?.getUser);
    setGuilds(data?.getUser.guilds || []);
  }, [data, setUser, setGuilds]);
  const classes = useStyles();

  if (loading) {
    return <LoadingScreen />;
  }
  // TODO: handle case when there are no guilds

  return (
    <Layout>
      <Container maxWidth="sm" className={classes.root}>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          {`👋 ${data?.getUser.username}, which server are we configuring today?`}
        </Typography>
        <GuildBars />
      </Container>
      {/* <LoginPrompt open={!!error} /> */}
    </Layout>
  );
}
