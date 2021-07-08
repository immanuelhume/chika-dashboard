import Typography from '@material-ui/core/Typography';
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
    return null;
  }
  return (
    <>
      <Layout>
        {activeGuild ? (
          <>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Toggle commands for your server.
            </Typography>
            <Commands activeGuild={activeGuild} />
          </>
        ) : (
          <div>no guild</div>
        )}
      </Layout>
      <LoginPrompt open={!!error} />
    </>
  );
}
