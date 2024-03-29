import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import { grey } from '@material-ui/core/colors';
import React, { useEffect } from 'react';
import { activeGuildSelector, useStore } from '../../controllers/store';
import { useNowPlayingLazyQuery } from '../../graphql/generated';
import { CardGutterBottom } from '../atoms/CardGutterBottom';
import { Center } from '../atoms/Center';

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
    emoji: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: theme.palette.grey.A200,
      cursor: 'default',
    },
  }),
);

interface INowPlayingCard {}

export const NowPlayingCard: React.FC<INowPlayingCard> = () => {
  const classes = useStyles();
  const activeGuild = useStore(activeGuildSelector);
  const [getNowPlaying, { data, loading }] = useNowPlayingLazyQuery({
    pollInterval: 3000,
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
    return (
      <Center>
        <CircularProgress />
      </Center>
    );
  }
  if (!data) {
    return null;
  }
  return (
    <CardGutterBottom>
      <CardHeader title="Now Playing" subheader={data.getNowPlaying?.title} />
      <div className={classes.container}>
        {!data.getNowPlaying && (
          <div className={classes.emoji}>
            <Typography variant="h2" gutterBottom>
              ᕦ(ò_óˇ)ᕤ
            </Typography>
            <Typography variant="h5">...nothing is playing</Typography>
          </div>
        )}
        <CardMedia
          title="Now playing"
          image={data.getNowPlaying?.thumbnailURL}
          className={classes.media}
        />
      </div>
    </CardGutterBottom>
  );
};
