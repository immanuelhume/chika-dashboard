import React from 'react';
import { Guild, useGuildConfigQuery } from '../../graphql/generated';
import { PrefixSettingsCard } from '../molecules/PrefixSettingsCard';
import { ShiritoriSettingsCard } from '../molecules/ShiritoriSettingsCard';
import { LoadingScreen } from './LoadingScreen';

interface ISettingsCards {
  activeGuild: Guild;
}

export const SettingsCards: React.FC<ISettingsCards> = ({ activeGuild }) => {
  const { data, loading, error } = useGuildConfigQuery({
    variables: { guildId: activeGuild.id },
  });
  if (loading) {
    return <LoadingScreen />;
  }
  if (error || !data) {
    // TODO: handle error
    return null;
  }
  return (
    <>
      <PrefixSettingsCard
        guildId={activeGuild.id}
        prefix={data.getGuildConfig.prefix}
      />
      <ShiritoriSettingsCard config={data.getGuildConfig} />
    </>
  );
};
