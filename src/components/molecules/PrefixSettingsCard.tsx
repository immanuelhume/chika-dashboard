import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import { PrefixForm } from '../atoms/PrefixForm';

interface IPrefixSettingsCard {
  guildId: string;
  prefix: string;
}

export const PrefixSettingsCard: React.FC<IPrefixSettingsCard> = ({
  guildId,
  prefix,
}) => {
  return (
    <Card>
      <CardHeader
        title="Bot prefix"
        subheader="These characters will trigger Chika."
      />
      <CardContent>
        <PrefixForm guildId={guildId} prefix={prefix} />
      </CardContent>
    </Card>
  );
};
