import { makeStyles, Theme } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
    <Accordion TransitionProps={{ unmountOnExit: true }} defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5">{_.capitalize(group)}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          {commands.map((command) => (
            <Grid item xs={12} md={6} lg={4} key={command.id}>
              <CommandCard {...command} />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

interface ICommands {
  // this prop needs to be pushed upstream because h00ks
  activeGuild: Guild;
}

export const Commands: React.FC<ICommands> = ({ activeGuild }) => {
  const { data, loading } = useCommandsQuery({
    variables: { guildId: activeGuild.id },
  });
  if (loading) {
    // TODO: add loading spinner
    return null;
  }
  if (!data) {
    return null;
  }
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
