import Typography from '@material-ui/core/Typography';
import React, { useCallback } from 'react';
import { Layout } from '../components/organisms/Layout';
import { SettingsCards } from '../components/organisms/SettingsCards';
import { useStore } from '../controllers/store';

export default function Settings() {
  const activeGuild = useStore(useCallback((state) => state.activeGuild, []));
  if (!activeGuild) return null;
  return (
    <Layout>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Various settings for your server.
      </Typography>
      <SettingsCards activeGuild={activeGuild} />
    </Layout>
  );
}
