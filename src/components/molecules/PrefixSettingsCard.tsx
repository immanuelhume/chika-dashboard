import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import { PrefixForm } from '../atoms/PrefixForm';

interface IPrefixSettingsCard {}

export const PrefixSettingsCard: React.FC<IPrefixSettingsCard> = () => {
  return (
    <Card>
      <CardHeader
        title="Bot prefix"
        subheader="These characters will trigger Chika."
      />
      <CardContent>
        <PrefixForm />
      </CardContent>
    </Card>
  );
};
