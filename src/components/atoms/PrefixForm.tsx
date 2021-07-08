import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import { useFormik, FormikProvider, Form, Field, FieldProps } from 'formik';
import { useSnackbar } from 'notistack';
import React from 'react';
import * as yup from 'yup';
import { useUpdatePrefixMutation } from '../../graphql/generated';

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
    initialValues: { prefix: initialPrefix },
    validationSchema,
    // eslint-disable-next-line no-shadow
    onSubmit: async ({ prefix }) => {
      if (prefix === initialPrefix) return;
      await updatePrefix({
        variables: { input: { guildId, prefix } },
      });
      enqueueSnackbar(
        <div>
          Prefix set to <b>{prefix}</b>
        </div>,
        { variant: 'success' },
      );
    },
  });

  return (
    <FormikProvider value={formik}>
      <Form>
        <Field name="prefix">
          {({ field, meta }: FieldProps) => (
            <TextField
              id="prefix"
              label="Anything you like"
              variant="filled"
              error={meta.touched && !!meta.error}
              helperText={meta.error}
              {...field}
            />
          )}
        </Field>
        {/* TODO: loading indicator for this button */}
        <IconButton aria-label="submit da form" type="submit">
          <PublishRoundedIcon />
        </IconButton>
      </Form>
    </FormikProvider>
  );
};
