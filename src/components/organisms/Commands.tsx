import { makeStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import React from 'react';
import {
  CommandCategory,
  Guild,
  SimpleCommandFragment,
  useCommandsQuery,
} from '../../graphql/generated';
import { splitCommands } from '../../lib/splitCommands';
import { CommandCard } from '../molecules/CommandCard';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(4),
  },
}));

interface ICommandGroup {
  group: string;
  commands: SimpleCommandFragment[];
}

const CommandGroup: React.FC<ICommandGroup> = ({ group, commands }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography variant="h4" gutterBottom>
        {_.capitalize(group)}
      </Typography>

      <Grid container spacing={3}>
        {commands.map((command) => (
          <Grid item xs={12} sm={6} md={4} key={command.id}>
            <CommandCard {...command} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

interface ICommands {
  // this prop needs to be pushed upstream because h00ks
  activeGuild: Guild;
}

export const Commands: React.FC<ICommands> = ({ activeGuild }) => {
  console.log(activeGuild);
  const { data, loading } = useCommandsQuery({
    variables: { guildId: activeGuild.id },
  });
  if (loading) {
    // TODO: add loading spinner
    return null;
  }
  // TODO: handle error
  if (!data) {
    return null;
  }
  console.log(data);
  const categorized = splitCommands(data.getCommandsUnderGuildCtx);
  return (
    <>
      {Object.keys(categorized).map((group) => (
        <CommandGroup
          key={`${activeGuild.id}:${group}`}
          group={group}
          commands={categorized[group as CommandCategory]}
        />
      ))}
    </>
  );
};
