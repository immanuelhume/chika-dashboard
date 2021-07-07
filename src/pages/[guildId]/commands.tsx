import React, { useCallback } from 'react';
import { Commands } from '../../components/organisms/Commands';
import { Layout } from '../../components/organisms/Layout';
import { useStore } from '../../controllers/store';

export default function CommandsP() {
  const activeGuild = useStore(useCallback((state) => state.activeGuild, []));
  return (
    <Layout>
      {activeGuild ? (
        <Commands activeGuild={activeGuild} />
      ) : (
        <div>no guild</div>
      )}
    </Layout>
  );
}
