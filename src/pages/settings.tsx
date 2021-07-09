import React, { useCallback } from 'react';
import { PageIntroText } from '../components/atoms/PageIntroText';
import { Layout } from '../components/organisms/Layout';
import { SettingsCards } from '../components/organisms/SettingsCards';
import { useStore } from '../controllers/store';

export default function Settings() {
  const activeGuild = useStore(useCallback((state) => state.activeGuild, []));
  if (!activeGuild) return null;
  return (
    <Layout>
      <PageIntroText>Various settings for your server.</PageIntroText>
      <SettingsCards activeGuild={activeGuild} />
    </Layout>
  );
}
