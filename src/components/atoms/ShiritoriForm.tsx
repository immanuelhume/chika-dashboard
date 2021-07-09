import TextField from '@material-ui/core/TextField';
import { Field, FieldProps, Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import React from 'react';
import * as yup from 'yup';
import {
  GuildConfig,
  useUpdateShiritoriMutation,
} from '../../graphql/generated';
import { DivGutterBottom } from './DivGutterBottom';
import { SaveButton } from './SaveButton';

interface IShiritoriForm {
  config: GuildConfig;
}

const validationSchema = yup.object({
  handSize: yup
    .number()
    .min(1, 'Pls dawg just put in a normal number')
    .max(12, 'The maximum is 12')
    .required("Don't leave me empty!"),
  minLen: yup
    .number()
    .min(1, 'Seems kinda sussy to me')
    .required("Don't leave me empty!"),
});

export const ShiritoriForm: React.FC<IShiritoriForm> = ({ config }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [updateShiritori] = useUpdateShiritoriMutation();
  const { shiriHandSize, shiriMinLen, id } = config;
  const formik = useFormik({
    initialValues: {
      handSize: shiriHandSize,
      minLen: shiriMinLen,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async ({ handSize, minLen }, { setSubmitting }) => {
      if (handSize === shiriHandSize && minLen === shiriMinLen) return;
      await updateShiritori({ variables: { input: { id, handSize, minLen } } });
      enqueueSnackbar('Shiritori settings updated', { variant: 'success' });
      setSubmitting(false);
    },
  });

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off">
        <Field name="handSize">
          {({ field, meta }: FieldProps) => (
            <DivGutterBottom>
              <TextField
                type="number"
                id="handSize"
                label="Hand size"
                variant="filled"
                error={meta.touched && !!meta.error}
                helperText={
                  meta.error || 'How many cards each player starts with'
                }
                {...field}
              />
            </DivGutterBottom>
          )}
        </Field>
        <Field name="minLen">
          {({ field, meta }: FieldProps) => (
            <TextField
              type="number"
              id="minLen"
              label="Minimum word length"
              variant="filled"
              error={meta.touched && !!meta.error}
              helperText={meta.error}
              {...field}
            />
          )}
        </Field>
        <SaveButton loading={formik.isSubmitting} />
      </Form>
    </FormikProvider>
  );
};
