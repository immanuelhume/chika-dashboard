import Typography from '@material-ui/core/Typography';
import React, { useCallback } from 'react';
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
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Toggle commands for your server.
            </Typography>
            <Commands activeGuild={activeGuild} />
          </>
        ) : (
          <div>no guild</div>
        )}
      </Layout>
    </>
  );
}
