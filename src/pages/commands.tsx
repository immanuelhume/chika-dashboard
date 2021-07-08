import React, { useCallback } from 'react';
import { LoginPrompt } from '../components/molecules/LoginPrompt';
import { Commands } from '../components/organisms/Commands';
import { Layout } from '../components/organisms/Layout';
import { useStore } from '../controllers/store';
import { useMeQuery } from '../graphql/generated';

export default function CommandsP() {
  const activeGuild = useStore(useCallback((state) => state.activeGuild, []));
  const { error, loading } = useMeQuery();
  if (loading) {
    // TODO: loading spinner
    return null;
  }
  return (
    <>
      <Layout>
        {activeGuild ? (
          <Commands activeGuild={activeGuild} />
        ) : (
          <div>no guild</div>
        )}
      </Layout>
      <LoginPrompt open={!!error} />
    </>
  );
}
