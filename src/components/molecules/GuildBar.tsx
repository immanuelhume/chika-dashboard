import { createStyles, makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import React from 'react';
import { Guild } from '../../graphql/generated';
import { guildIcon } from '../../lib/discord';
import {
  GoToDashboardButton,
  InviteChikaButton,
} from '../atoms/GuildBarButton';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
    },
    card: {
      flexGrow: 1,
    },
  }),
);

interface IGuildBar {
  guild: Guild;
}

export const GuildBar: React.FC<IGuildBar> = ({ guild }) => {
  const { id, name, icon } = guild;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar src={guildIcon(id, icon)} />}
        title={name}
        action={
          guild.isChikaIn ? (
            <GoToDashboardButton guild={guild} />
          ) : (
            <InviteChikaButton />
          )
        }
      />
    </Card>
  );
};
