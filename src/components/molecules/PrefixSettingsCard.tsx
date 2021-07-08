import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import React from 'react';
import { CardGutterBottom } from '../atoms/CardGutterBottom';
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
    <CardGutterBottom>
      <CardHeader
        title="Bot prefix"
        subheader="These characters will trigger Chika."
      />
      <CardContent>
        <PrefixForm guildId={guildId} prefix={prefix} />
      </CardContent>
    </CardGutterBottom>
  );
};
