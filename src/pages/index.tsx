import { useCallback, useEffect } from 'react';
import { GuildBars } from '../components/organisms/GuildBars';
import { Layout } from '../components/organisms/Layout';
import { useStore } from '../controllers/store';
import { useMeQuery } from '../graphql/generated';

export default function Home() {
  const { data, loading } = useMeQuery();
  const { setUser, setGuilds } = useStore(
    // eslint-disable-next-line no-shadow
    useCallback(({ setUser, setGuilds }) => ({ setUser, setGuilds }), []),
  );
  useEffect(() => {
    setUser(data?.getUser);
    setGuilds(data?.getUser.guilds || []);
  }, [data, setUser, setGuilds]);

  // TODO: loading spinner
  if (loading) return null;
  // TODO: handle error
  if (!data) return null;

  return (
    <Layout>
      <GuildBars />
    </Layout>
  );
}
