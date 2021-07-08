import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import React from 'react';
import { GuildConfig } from '../../graphql/generated';
import { CardGutterBottom } from '../atoms/CardGutterBottom';
import { ShiritoriForm } from '../atoms/ShiritoriForm';

interface IShiritoriSettingsCard {
  config: GuildConfig;
}

export const ShiritoriSettingsCard: React.FC<IShiritoriSettingsCard> = ({
  config,
}) => {
  return (
    <CardGutterBottom>
      <CardHeader title="Shiritori" subheader="Settings for Shiritori." />
      <CardContent>
        <ShiritoriForm config={config} />
      </CardContent>
    </CardGutterBottom>
  );
};
