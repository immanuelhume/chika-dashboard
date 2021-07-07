import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { useRouter } from 'next/dist/client/router';
import React, { useCallback } from 'react';
import { useStore } from '../../controllers/store';
import { Guild, useHasChikaMutation } from '../../graphql/generated';
import { guildIcon } from '../../lib/discord';

const useStyles = makeStyles((theme: Theme) =>
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
  const setActiveGuild = useStore(
    useCallback((state) => state.setActiveGuild, []),
  );
  const [hasChika] = useHasChikaMutation({ variables: { guildId: guild.id } });
  const router = useRouter();

  async function handleClick() {
    const res = await hasChika();
    if (!res.data?.hasChika) {
      // TODO: snackbar alert no config
      alert('guild is not in db');
    }
    setActiveGuild(guild);
    // push to /commands
    router.push({
      pathname: '/[guildId]/commands',
      query: { guildId: guild.id },
    });
  }

  return (
    <ButtonBase className={classes.root} focusRipple onClick={handleClick}>
      <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar src={guildIcon(id, icon)} />}
          title={name}
        />
      </Card>
    </ButtonBase>
  );
};
