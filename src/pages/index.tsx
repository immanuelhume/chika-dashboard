import { useMeQuery } from '../graphql/generated';

export default function Home() {
  const { data, loading } = useMeQuery();
  // TODO: loading spinner
  if (!data || loading) return null;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
