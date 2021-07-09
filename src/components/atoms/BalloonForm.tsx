import { TextField } from '@material-ui/core';
import { Field, FieldProps, Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import React from 'react';
import * as yup from 'yup';
import { GuildConfig, useUpdateBalloonMutation } from '../../graphql/generated';
import { DivGutterBottom } from './DivGutterBottom';
import { SaveButton } from './SaveButton';

interface IBalloonForm {
  config: GuildConfig;
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

export const BalloonForm: React.FC<IBalloonForm> = ({ config }) => {
  const { id, ballMinVol, ballMaxVol } = config;
  const { enqueueSnackbar } = useSnackbar();
  const [updateBalloon] = useUpdateBalloonMutation();
  const formik = useFormik({
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
    <FormikProvider value={formik}>
      <Form autoComplete="off">
        <Field name="minVol">
          {({ field, meta }: FieldProps) => (
            <DivGutterBottom>
              <TextField
                {...field}
                type="number"
                id="minVol"
                label="Minimum volume"
                variant="filled"
                error={meta.touched && !!meta.error}
                helperText={meta.error}
              />
            </DivGutterBottom>
          )}
        </Field>
        <Field name="maxVol">
          {({ field, meta }: FieldProps) => (
            <TextField
              {...field}
              type="number"
              id="maxVol"
              label="Maximum volume"
              variant="filled"
              error={meta.touched && !!meta.error}
              helperText={meta.error}
            />
          )}
        </Field>
        <SaveButton loading={formik.isSubmitting} />
      </Form>
    </FormikProvider>
  );
};
