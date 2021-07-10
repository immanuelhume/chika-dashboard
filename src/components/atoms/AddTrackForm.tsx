import { createStyles, makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import PlaylistAddRoundedIcon from '@material-ui/icons/PlaylistAddRounded';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { Field, FieldProps, Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import React from 'react';
import * as yup from 'yup';
import {
  Guild,
  TracksDocument,
  useAddTrackMutation,
} from '../../graphql/generated';
import { IconButtonSpinner } from './IconButtonSpinner';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
    },
    input: {
      flexGrow: 1,
    },
  }),
);

const validationSchema = yup.object({
  url: yup
    .string()
    .matches(
      /^(https?:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$/,
      'I can only fetch music from YouTube',
    )
    .required("Please don't leave me blank"),
});

interface IAddTrackForm {
  activeGuild: Guild;
}

interface IYouTubeFormik {
  url: string;
}

export const AddTrackForm: React.FC<IAddTrackForm> = ({ activeGuild }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [addTrack] = useAddTrackMutation({
    refetchQueries: [
      { query: TracksDocument, variables: { guildId: activeGuild.id } },
    ],
  });

  const formik = useFormik<IYouTubeFormik>({
    initialValues: { url: '' },
    validationSchema,
    onSubmit: async ({ url }, { setSubmitting, resetForm }) => {
      try {
        await addTrack({
          variables: { input: { guildId: activeGuild.id, youtubeUrl: url } },
        });
      } catch (e) {
        enqueueSnackbar("Couldn't find that video", { variant: 'error' });
      }
      resetForm();
      setSubmitting(false);
    },
  });

  return (
    <FormikProvider value={formik}>
      <Form className={classes.root}>
        <Field name="url">
          {({ field, meta }: FieldProps) => (
            <TextField
              {...field}
              className={classes.input}
              id="youtube-url"
              label="Add a track"
              helperText={meta.error || 'A YouTube link'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <YouTubeIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        </Field>
        <IconButton
          edge="end"
          size="medium"
          type="submit"
          disabled={formik.isSubmitting}
        >
          <PlaylistAddRoundedIcon />
          <IconButtonSpinner size="medium" loading={formik.isSubmitting} />
        </IconButton>
      </Form>
    </FormikProvider>
  );
};
