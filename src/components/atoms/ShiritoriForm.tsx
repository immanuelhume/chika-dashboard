import TextField from '@material-ui/core/TextField';
import { Field, FieldProps, Form, useFormikContext } from 'formik';
import React from 'react';
import { DivGutterBottom } from './DivGutterBottom';
import { SaveButton } from './SaveButton';

interface IShiritoriForm {}

export const ShiritoriForm: React.FC<IShiritoriForm> = () => {
  const formik = useFormikContext();

  return (
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
  );
};
