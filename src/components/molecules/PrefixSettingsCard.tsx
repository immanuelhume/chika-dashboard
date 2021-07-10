import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import React from 'react';
import * as yup from 'yup';
import { useUpdatePrefixMutation } from '../../graphql/generated';
import { CardGutterBottom } from '../atoms/CardGutterBottom';
import { PrefixForm } from '../atoms/PrefixForm';
import { ResetPrefixButton } from '../atoms/ResetButton';

const validationSchema = yup.object({
  prefix: yup
    .string()
    .max(10, "That's too long homie, 10 max")
    .required("Please don't leave this blank owo"),
});

interface IPrefixSettingsCard {
  guildId: string;
  prefix: string;
}

export interface IPrefixFormik {
  prefix: string;
}

export const PrefixSettingsCard: React.FC<IPrefixSettingsCard> = ({
  guildId,
  prefix: initialPrefix,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [updatePrefix] = useUpdatePrefixMutation();
  const formik = useFormik<IPrefixFormik>({
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
    <CardGutterBottom>
      <CardHeader
        title="Bot prefix"
        subheader="These characters will trigger Chika."
      />
      <FormikProvider value={formik}>
        <CardContent>
          <PrefixForm />
        </CardContent>
        <CardActions>
          <ResetPrefixButton guildId={guildId} />
        </CardActions>
      </FormikProvider>
    </CardGutterBottom>
  );
};
