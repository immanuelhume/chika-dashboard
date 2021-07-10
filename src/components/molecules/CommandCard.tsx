import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { SimpleCommandFragment } from '../../graphql/generated';
import { CommandToggle } from '../atoms/CommandToggle';

interface ICommandCard extends SimpleCommandFragment {}

export const CommandCard: React.FC<ICommandCard> = ({
  name,
  description,
  disabled,
  commandId,
}) => (
  <Card>
    <CardHeader
      title={name}
      action={
        <CommandToggle commandId={commandId} disabled={disabled} name={name} />
      }
    />
    <CardContent>
      <Typography color="textSecondary">{description}</Typography>
    </CardContent>
  </Card>
);
