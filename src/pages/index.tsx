import { useEffect } from 'react';
import { Layout } from '../components/organisms/Layout';
import { userSetterSelector, useStore } from '../controllers/store';
import { useMeQuery } from '../graphql/generated';

export default function Home() {
  const { data, loading } = useMeQuery();
  const { setUser, setGuilds } = useStore(userSetterSelector);
  useEffect(() => {
    setUser(data?.getUser);
    setGuilds(data?.getUser.guilds || []);
  }, [data, setUser, setGuilds]);

  // TODO: loading spinner
  if (loading) return null;
  // TODO: handle error
  if (!data) return null;

  return <Layout />;
}
