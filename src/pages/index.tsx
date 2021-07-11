import { createStyles, makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import React, { useCallback, useEffect } from 'react';
import { PageIntroText } from '../components/atoms/PageIntroText';
import { NoGuildScreen } from '../components/molecules/NoGuildScreen';
import { GuildBars } from '../components/organisms/GuildBars';
import { Layout } from '../components/organisms/Layout';
import { LoadingScreen } from '../components/organisms/LoadingScreen';
import { useStore } from '../controllers/store';
import { useMeQuery } from '../graphql/generated';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);

export default function Home() {
  const { data, loading } = useMeQuery();
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
    if (!data) return;
    const {
      getUser: { guilds, ...user },
    } = data;
    setUser(user);
    setGuilds(guilds || []);
  }, [data, setUser, setGuilds]);
  const classes = useStyles();

  if (loading) {
    return <LoadingScreen />;
  }

  if (data?.getUser.guilds.length === 0) {
    return (
      <Layout>
        <NoGuildScreen />
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="sm" className={classes.root}>
        <PageIntroText>
          {data?.getUser.username &&
            `👋 ${data?.getUser.username}, which server are we checking out today?`}
        </PageIntroText>
        <GuildBars />
      </Container>
    </Layout>
  );
}
