import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import PublishIcon from '@material-ui/icons/Publish';
import { useFormik, FormikProvider, Form, Field, FieldProps } from 'formik';
import React from 'react';
import * as yup from 'yup';

const validationSchema = yup.object({
  prefix: yup
    .string()
    .max(10, "That's too long homie, 10 max")
    .required("Please don't leave this blank owo"),
});

interface IPrefixForm {}

export const PrefixForm: React.FC<IPrefixForm> = () => {
  const formik = useFormik({
    initialValues: { prefix: 'ck;' },
    validationSchema,
    onSubmit: (values) => alert(JSON.stringify(values, null, 2)),
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
        <IconButton aria-label="submit da form" type="submit">
          <PublishIcon />
        </IconButton>
      </Form>
    </FormikProvider>
  );
};
