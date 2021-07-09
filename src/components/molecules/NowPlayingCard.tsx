import { createStyles, makeStyles, Theme } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { grey } from '@material-ui/core/colors';
import React, { useEffect } from 'react';
import { activeGuildSelector, useStore } from '../../controllers/store';
import { useNowPlayingLazyQuery } from '../../graphql/generated';
import { CardGutterBottom } from '../atoms/CardGutterBottom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: 'relative',
    },
    media: {
      [theme.breakpoints.up('xs')]: {
        height: 160,
      },
      [theme.breakpoints.up('sm')]: {
        height: 200,
      },
      backgroundColor: grey.A700,
      backgroundBlendMode: 'soft-light',
    },
    icon: {
      fontSize: 100,
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
  }),
);

interface INowPlayingCard {}

export const NowPlayingCard: React.FC<INowPlayingCard> = () => {
  const classes = useStyles();
  const activeGuild = useStore(activeGuildSelector);
  const [getNowPlaying, { data, loading }] = useNowPlayingLazyQuery({
    pollInterval: 2000,
  });
  useEffect(() => {
    if (!activeGuild) return;
    getNowPlaying({ variables: { guildId: activeGuild.id } });
  }, [activeGuild, getNowPlaying]);
  if (!activeGuild) {
    // TODO: do sth about this
    return null;
  }
  if (loading) {
    // TODO: loading component
    return null;
  }
  if (!data) {
    return null;
  }
  return (
    <CardGutterBottom>
      <CardHeader title="Now Playing" subheader={data.getNowPlaying?.title} />
      <CardMedia
        title="Now playing"
        image={data.getNowPlaying?.thumbnailURL}
        className={classes.media}
      />
    </CardGutterBottom>
  );
};
