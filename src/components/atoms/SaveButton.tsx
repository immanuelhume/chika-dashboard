import IconButton from '@material-ui/core/IconButton';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import React from 'react';

interface ISaveButton {}

export const SaveButton: React.FC<ISaveButton> = () => {
  return (
    <IconButton aria-label="submit da form" type="submit">
      <SaveRoundedIcon />
    </IconButton>
  );
};
