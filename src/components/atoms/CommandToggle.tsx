import { makeStyles, Theme } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import { useSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { useStore } from '../../controllers/store';
import {
  SimpleCommandFragment,
  ToggleCommandInput,
  useDisabledCommandMutation,
  useEnableCommandMutation,
} from '../../graphql/generated';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: theme.palette.primary,
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: theme.palette.primary,
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}));

type ICommandToggle = Pick<
  SimpleCommandFragment,
  'commandId' | 'disabled' | 'name'
>;

export const CommandToggle: React.FC<ICommandToggle> = ({
  disabled,
  commandId,
  name,
}) => {
  const activeGuild = useStore(useCallback((state) => state.activeGuild, []));
  const [disable] = useDisabledCommandMutation();
  const [enable] = useEnableCommandMutation();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  if (!activeGuild) return null;
  const variables: { input: ToggleCommandInput } = {
    input: { commandId, guildId: activeGuild.id },
  };

  const handleToggle: React.ComponentProps<typeof Switch>['onChange'] = async (
    _,
    checked,
  ) => {
    const _disabled = !checked;
    if (_disabled) {
      await disable({ variables });
      enqueueSnackbar(`Command '${name}' disabled`, { variant: 'warning' });
    } else {
      await enable({ variables });
      enqueueSnackbar(`Command '${name}' enabled`, { variant: 'success' });
    }
  };

  return (
    <Switch
      checked={!disabled}
      onChange={handleToggle}
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
    />
  );
};
