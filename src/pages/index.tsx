import { useCallback, useEffect } from 'react';
import { GuildBars } from '../components/organisms/GuildBars';
import { Layout } from '../components/organisms/Layout';
import { useStore } from '../controllers/store';
import { useMeQuery } from '../graphql/generated';

export default function Home() {
  const { data, loading, error } = useMeQuery();
  const { setUser, setGuilds, setActiveGuild } = useStore(
    useCallback(
      // eslint-disable-next-line no-shadow
      ({ setUser, setGuilds, setActiveGuild }) => ({
        setUser,
        setGuilds,
        setActiveGuild,
      }),
      [],
    ),
  );
  useEffect(() => {
    setActiveGuild();
  }, [setActiveGuild]);
  useEffect(() => {
    setUser(data?.getUser);
    setGuilds(data?.getUser.guilds || []);
  }, [data, setUser, setGuilds]);

  // TODO: loading spinner
  if (loading) return null;
  // TODO: handle error
  if (error) return null;
  if (!data) return null;

  return (
    <Layout>
      <GuildBars />
    </Layout>
  );
}
