import Switch from '@material-ui/core/Switch';
import React, { useCallback } from 'react';
import { useStore } from '../../controllers/store';
import {
  SimpleCommandFragment,
  ToggleCommandInput,
  useDisabledCommandMutation,
  useEnableCommandMutation,
} from '../../graphql/generated';

type ICommandToggle = Pick<SimpleCommandFragment, 'commandId' | 'disabled'>;

export const CommandToggle: React.FC<ICommandToggle> = ({
  disabled,
  commandId,
}) => {
  const activeGuild = useStore(useCallback((state) => state.activeGuild, []));
  const [disable] = useDisabledCommandMutation();
  const [enable] = useEnableCommandMutation();

  if (!activeGuild) return null;
  const variables: { input: ToggleCommandInput } = {
    input: { commandId, guildId: activeGuild.id },
  };

  const handleToggle: React.ComponentProps<typeof Switch>['onChange'] = (
    _,
    checked,
  ) => {
    const _disabled = !checked;
    if (_disabled) {
      disable({ variables });
    } else {
      enable({ variables });
    }
  };

  return <Switch checked={!disabled} onChange={handleToggle} />;
};
