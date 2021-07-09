import TextField from '@material-ui/core/TextField';
import { Field, FieldProps, Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import React from 'react';
import * as yup from 'yup';
import { useUpdatePrefixMutation } from '../../graphql/generated';
import { SaveButton } from './SaveButton';

const validationSchema = yup.object({
  prefix: yup
    .string()
    .max(10, "That's too long homie, 10 max")
    .required("Please don't leave this blank owo"),
});

interface IPrefixForm {
  guildId: string;
  prefix: string;
}

export const PrefixForm: React.FC<IPrefixForm> = ({
  guildId,
  prefix: initialPrefix,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [updatePrefix] = useUpdatePrefixMutation();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { prefix: initialPrefix },
    validationSchema,
    // eslint-disable-next-line no-shadow
    onSubmit: async ({ prefix }, { setSubmitting }) => {
      if (prefix === initialPrefix) return;
      await updatePrefix({
        variables: { input: { id: guildId, prefix } },
      });
      enqueueSnackbar(
        <div>
          Prefix set to <b>{prefix}</b>
        </div>,
        { variant: 'success' },
      );
      setSubmitting(false);
    },
  });

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off">
        <Field name="prefix">
          {({ field, meta }: FieldProps) => (
            <TextField
              id="prefix"
              label="Anything you fancy"
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
