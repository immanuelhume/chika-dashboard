import { createStyles, makeStyles, Theme } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import PlaylistAddRoundedIcon from '@material-ui/icons/PlaylistAddRounded';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { Field, FieldProps, Form, FormikProvider, useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import {
  Guild,
  TracksDocument,
  useAddTrackMutation,
} from '../../graphql/generated';

const useStyles = makeStyles((theme: Theme) =>
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
  const [addTrack] = useAddTrackMutation({
    refetchQueries: [
      { query: TracksDocument, variables: { guildId: activeGuild.id } },
    ],
  });

  const formik = useFormik<IYouTubeFormik>({
    initialValues: { url: '' },
    validationSchema,
    onSubmit: async ({ url }, { setSubmitting, resetForm }) => {
      await addTrack({
        variables: { input: { guildId: activeGuild.id, youtubeUrl: url } },
      });
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
              // error={!!meta.error && meta.touched}
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
        {/* TODO: loading state */}
        <IconButton edge="end" size="medium" type="submit">
          <PlaylistAddRoundedIcon />
        </IconButton>
      </Form>
    </FormikProvider>
  );
};
