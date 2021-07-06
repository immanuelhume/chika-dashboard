import { makeStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import React from 'react';
import { activeGuildSelector, useStore } from '../../controllers/store';
import {
  CommandCategory,
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

export const Commands: React.FC = () => {
  const { activeGuild } = useStore(activeGuildSelector);
  // TODO: fix this later
  const { data, loading } = useCommandsQuery({
    variables: { guildId: activeGuild?.id || '' },
  });
  if (loading) {
    // TODO: add loading spinner
    return null;
  }
  // TODO: handle erro
  if (!data) {
    return null;
  }
  const categorized = splitCommands(data.getCommandsUnderGuildCtx);
  return (
    <>
      {Object.keys(categorized).map((group) => (
        <CommandGroup
          key={group}
          group={group}
          commands={categorized[group as CommandCategory]}
        />
      ))}
    </>
  );
};
