import Button from '@material-ui/core/Button';
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

export const ResetPrefixButton: React.FC<IResetButton> = ({ guildId }) => {
  const [updatePrefix] = useUpdatePrefixMutation();
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormikContext<IPrefixFormik>();
  async function handleClick() {
    await updatePrefix({
      variables: { input: { id: guildId, prefix: DEFAULT_PREFIX } },
    });
    formik.setValues({ prefix: DEFAULT_PREFIX });
    enqueueSnackbar('Reset prefix to default!', { variant: 'success' });
  }
  return <Button onClick={handleClick}>Reset default</Button>;
};

export const ResetShiritoriButton: React.FC<IResetButton> = ({ guildId }) => {
  const [updateShiritori] = useUpdateShiritoriMutation();
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormikContext<IShiritoriFormik>();
  async function handleClick() {
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
  }
  return <Button onClick={handleClick}>Reset default</Button>;
};

export const ResetBalloonButton: React.FC<IResetButton> = ({ guildId }) => {
  const [updateBalloon] = useUpdateBalloonMutation();
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormikContext<IBalloonFormik>();
  async function handleClick() {
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
  }
  return <Button onClick={handleClick}>Reset default</Button>;
};
