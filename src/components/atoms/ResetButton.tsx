import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useFormikContext } from 'formik';
import { useSnackbar } from 'notistack';
import React from 'react';
import {
  useUpdateBalloonMutation,
  useUpdatePrefixMutation,
  useUpdateShiritoriMutation,
} from '../../graphql/generated';
import {
  DEFAULT_MAX_BALLOON,
  DEFAULT_MIN_BALLOON,
  DEFAULT_PREFIX,
  DEFAULT_SHIRITORI_HAND,
  DEFAULT_SHIRITORI_MIN_LEN,
} from '../../lib/defaults';
import type { IBalloonFormik } from '../molecules/BalloonSettingsCard';
import type { IPrefixFormik } from '../molecules/PrefixSettingsCard';
import type { IShiritoriFormik } from '../molecules/ShiritoriSettingsCard';

interface IResetButton {
  guildId: string;
}

interface IRootButton {
  handleClick: React.ComponentProps<typeof Button>['onClick'];
  loading: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      position: 'relative',
    },
    progress: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      marginLeft: -12,
      marginTop: -12,
    },
  }),
);

const RootButton: React.FC<IRootButton> = ({ handleClick, loading }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Button onClick={handleClick} disabled={loading}>
        Reset default
      </Button>
      {loading && (
        <CircularProgress
          className={classes.progress}
          color="secondary"
          size={24}
        />
      )}
    </div>
  );
};

export const ResetPrefixButton: React.FC<IResetButton> = ({ guildId }) => {
  const [updatePrefix] = useUpdatePrefixMutation();
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormikContext<IPrefixFormik>();
  async function handleClick() {
    formik.setSubmitting(true);
    await updatePrefix({
      variables: { input: { id: guildId, prefix: DEFAULT_PREFIX } },
    });
    formik.setValues({ prefix: DEFAULT_PREFIX });
    enqueueSnackbar('Reset prefix to default!', { variant: 'success' });
    formik.setSubmitting(false);
  }
  return <RootButton handleClick={handleClick} loading={formik.isSubmitting} />;
};

export const ResetShiritoriButton: React.FC<IResetButton> = ({ guildId }) => {
  const [updateShiritori] = useUpdateShiritoriMutation();
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormikContext<IShiritoriFormik>();
  async function handleClick() {
    formik.setSubmitting(true);
    await updateShiritori({
      variables: {
        input: {
          id: guildId,
          handSize: DEFAULT_SHIRITORI_HAND,
          minLen: DEFAULT_SHIRITORI_MIN_LEN,
        },
      },
    });
    formik.setValues({
      handSize: DEFAULT_SHIRITORI_HAND,
      minLen: DEFAULT_SHIRITORI_MIN_LEN,
    });
    enqueueSnackbar('Reset Shiritori to default!', {
      variant: 'success',
    });
    formik.setSubmitting(false);
  }
  return <RootButton handleClick={handleClick} loading={formik.isSubmitting} />;
};

export const ResetBalloonButton: React.FC<IResetButton> = ({ guildId }) => {
  const [updateBalloon] = useUpdateBalloonMutation();
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormikContext<IBalloonFormik>();
  async function handleClick() {
    formik.setSubmitting(true);
    await updateBalloon({
      variables: {
        input: {
          id: guildId,
          minVol: DEFAULT_MIN_BALLOON,
          maxVol: DEFAULT_MAX_BALLOON,
        },
      },
    });
    formik.setValues({
      minVol: DEFAULT_MIN_BALLOON,
      maxVol: DEFAULT_MAX_BALLOON,
    });
    enqueueSnackbar('Reset Balloon to default!', {
      variant: 'success',
    });
    formik.setSubmitting(false);
  }
  return <RootButton handleClick={handleClick} loading={formik.isSubmitting} />;
};
