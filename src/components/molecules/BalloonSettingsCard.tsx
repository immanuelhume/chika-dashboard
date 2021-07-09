import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import React from 'react';
import * as yup from 'yup';
import { GuildConfig, useUpdateBalloonMutation } from '../../graphql/generated';
import { BalloonForm } from '../atoms/BalloonForm';
import { CardGutterBottom } from '../atoms/CardGutterBottom';
import { ResetBalloonButton } from '../atoms/ResetButton';

interface IBalloonSettingsCard {
  config: GuildConfig;
}

export interface IBalloonFormik {
  minVol: number;
  maxVol: number;
}

const validationSchema = yup.object({
  minVol: yup
    .number()
    .min(0, 'Kinda feel like volume should be positive')
    .required("Don't leave me empty!"),
  maxVol: yup
    .number()
    .when('minVol', (minVol: number, schema: any) =>
      schema.min(minVol, 'This is lower than the minimum'),
    )
    .required("Don't leave me empty!"),
});

export const BalloonSettingsCard: React.FC<IBalloonSettingsCard> = ({
  config,
}) => {
  const { id, ballMinVol, ballMaxVol } = config;
  const { enqueueSnackbar } = useSnackbar();
  const [updateBalloon] = useUpdateBalloonMutation();
  const formik = useFormik<IBalloonFormik>({
    enableReinitialize: true,
    initialValues: { minVol: ballMinVol, maxVol: ballMaxVol },
    validationSchema,
    onSubmit: async ({ minVol, maxVol }, { setSubmitting }) => {
      if (minVol === ballMinVol && maxVol === ballMaxVol) return;
      await updateBalloon({ variables: { input: { id, minVol, maxVol } } });
      enqueueSnackbar('Balloon settings updated', { variant: 'success' });
      setSubmitting(false);
    },
  });

  return (
    <CardGutterBottom>
      <CardHeader
        title="Balloon"
        subheader="Settings for the balloon mini-game."
      />
      <FormikProvider value={formik}>
        <CardContent>
          <BalloonForm />
        </CardContent>
        <CardActions>
          <ResetBalloonButton guildId={config.id} />
        </CardActions>
      </FormikProvider>
    </CardGutterBottom>
  );
};
