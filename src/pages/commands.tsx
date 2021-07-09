import React, { useCallback } from 'react';
import { PageIntroText } from '../components/atoms/PageIntroText';
import { Commands } from '../components/organisms/Commands';
import { Layout } from '../components/organisms/Layout';
import { useStore } from '../controllers/store';

export default function CommandsP() {
  const activeGuild = useStore(useCallback((state) => state.activeGuild, []));
  return (
    <>
      <Layout>
        {activeGuild ? (
          <>
            <PageIntroText>Toggle commands for your server.</PageIntroText>
            <Commands activeGuild={activeGuild} />
          </>
        ) : (
          <div>no guild</div>
        )}
      </Layout>
    </>
  );
}
