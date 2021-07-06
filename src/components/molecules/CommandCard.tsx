import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { SimpleCommandFragment } from '../../graphql/generated';
import { CommandToggle } from '../atoms/CommandToggle';

interface ICommandCard extends SimpleCommandFragment {}

export const CommandCard: React.FC<ICommandCard> = ({
  id,
  name,
  description,
  disabled,
}) => (
  <Card>
    <CardHeader
      title={name}
      action={<CommandToggle id={id} disabled={disabled} />}
    />
    <CardContent>
      <Typography color="textSecondary">{description}</Typography>
    </CardContent>
  </Card>
);
