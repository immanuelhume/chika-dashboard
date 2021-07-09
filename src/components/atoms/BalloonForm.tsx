import { TextField } from '@material-ui/core';
import { Field, FieldProps, Form, useFormikContext } from 'formik';
import React from 'react';
import { DivGutterBottom } from './DivGutterBottom';
import { SaveButton } from './SaveButton';

interface IBalloonForm {}

export const BalloonForm: React.FC<IBalloonForm> = () => {
  const formik = useFormikContext();
  return (
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
              helperText={
                meta.error || 'The balloon will pop within this range'
              }
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
  );
};
