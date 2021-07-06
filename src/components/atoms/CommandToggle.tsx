import Switch from '@material-ui/core/Switch';
import React from 'react';
import { activeGuildSelector, useStore } from '../../controllers/store';
import {
  SimpleCommandFragment,
  ToggleCommandInput,
  useDisabledCommandMutation,
  useEnableCommandMutation,
} from '../../graphql/generated';

type ICommandToggle = Pick<SimpleCommandFragment, 'id' | 'disabled'>;

export const CommandToggle: React.FC<ICommandToggle> = ({ disabled, id }) => {
  const { activeGuild } = useStore(activeGuildSelector);
  const [disable] = useDisabledCommandMutation();
  const [enable] = useEnableCommandMutation();

  if (!activeGuild) return null;
  const variables: { input: ToggleCommandInput } = {
    input: { commandId: id, guildId: activeGuild?.id },
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
