import { createStyles, makeStyles, Theme } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Field, FieldProps, Form, FormikProvider, useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { GuildConfig } from '../../graphql/generated';
import { SaveButton } from './SaveButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputContainer: {
      marginBottom: theme.spacing(2),
    },
  }),
);

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
  const classes = useStyles();
  const { shiriHandSize, shiriMinLen, id } = config;
  const formik = useFormik({
    initialValues: {
      handSize: shiriHandSize,
      minLen: shiriMinLen,
    },
    validationSchema,
    onSubmit: (values) => alert(JSON.stringify(values, null, 2)),
  });

  return (
    <FormikProvider value={formik}>
      <Form>
        <Field name="handSize">
          {({ field, meta }: FieldProps) => (
            <div className={classes.inputContainer}>
              <TextField
                id="handSize"
                label="Hand size"
                variant="filled"
                error={meta.touched && !!meta.error}
                helperText={
                  meta.error || 'How many cards each player starts with'
                }
                {...field}
              />
            </div>
          )}
        </Field>
        <Field name="minLen">
          {({ field, meta }: FieldProps) => (
            <TextField
              id="minLen"
              label="Minimum word length"
              variant="filled"
              error={meta.touched && !!meta.error}
              helperText={meta.error}
              {...field}
            />
          )}
        </Field>
        <SaveButton />
      </Form>
    </FormikProvider>
  );
};
