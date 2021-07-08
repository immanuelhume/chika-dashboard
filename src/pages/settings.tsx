import Typography from '@material-ui/core/Typography';
import React from 'react';
import { PrefixSettingsCard } from '../components/molecules/PrefixSettingsCard';
import { Layout } from '../components/organisms/Layout';

export default function Settings() {
  return (
    <Layout>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Various settings for your server.
      </Typography>
      <PrefixSettingsCard />
    </Layout>
  );
}
