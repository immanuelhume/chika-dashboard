import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import React from 'react';
import { GuildConfig } from '../../graphql/generated';
import { BalloonForm } from '../atoms/BalloonForm';
import { CardGutterBottom } from '../atoms/CardGutterBottom';

interface IBalloonSettingsCard {
  config: GuildConfig;
}

export const BalloonSettingsCard: React.FC<IBalloonSettingsCard> = ({
  config,
}) => {
  return (
    <CardGutterBottom>
      <CardHeader
        title="Balloon"
        subheader="Settings for the balloon mini-game."
      />
      <CardContent>
        <BalloonForm config={config} />
      </CardContent>
    </CardGutterBottom>
  );
};
