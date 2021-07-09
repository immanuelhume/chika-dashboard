import TextField from '@material-ui/core/TextField';
import { Field, FieldProps, Form, useFormikContext } from 'formik';
import React from 'react';
import { SaveButton } from './SaveButton';

interface IPrefixForm {}

export const PrefixForm: React.FC<IPrefixForm> = () => {
  const formik = useFormikContext();

  return (
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
  );
};
