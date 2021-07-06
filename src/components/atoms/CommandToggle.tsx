import Switch from '@material-ui/core/Switch';
import React from 'react';
import { guildIdSelector, useStore } from '../../controllers/store';
import {
  SimpleCommandFragment,
  ToggleCommandInput,
  useDisabledCommandMutation,
  useEnableCommandMutation,
} from '../../graphql/generated';

type ICommandToggle = Pick<SimpleCommandFragment, 'id' | 'disabled'>;

export const CommandToggle: React.FC<ICommandToggle> = ({ disabled, id }) => {
  const guildId = useStore(guildIdSelector);
  const variables: { input: ToggleCommandInput } = {
    input: { commandId: id, guildId },
  };
  const [disable] = useDisabledCommandMutation({ variables });
  const [enable] = useEnableCommandMutation({ variables });

  const handleToggle: React.ComponentProps<typeof Switch>['onChange'] = (
    _,
    checked,
  ) => {
    const _disabled = !checked;
    if (_disabled) {
      disable();
    } else {
      enable();
    }
  };

  return <Switch checked={!disabled} onChange={handleToggle} />;
};
