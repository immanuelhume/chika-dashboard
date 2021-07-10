import Container from '@material-ui/core/Container';
import React, { useCallback } from 'react';
import { PageIntroText } from '../components/atoms/PageIntroText';
import { NowPlayingCard } from '../components/molecules/NowPlayingCard';
import { TrackList } from '../components/molecules/TrackList';
import { Layout } from '../components/organisms/Layout';
import { useStore } from '../controllers/store';

export default function Music() {
  const activeGuild = useStore(useCallback((state) => state.activeGuild, []));
  if (!activeGuild) {
    return <Layout>no guild</Layout>;
  }
  return (
    <Layout>
      <Container maxWidth="sm">
        <PageIntroText>Manage them tunes.</PageIntroText>
        <NowPlayingCard />
        <TrackList />
      </Container>
    </Layout>
  );
}
