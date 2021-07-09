import IconButton from '@material-ui/core/IconButton';
import ShuffleRoundedIcon from '@material-ui/icons/ShuffleRounded';
import React, { useState } from 'react';
import { ShuffleConfirm } from './ShuffleConfirm';

interface IShuffleButton {
  guildId: string;
}

export const ShuffleButton: React.FC<IShuffleButton> = ({ guildId }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  function handleOpen(e: React.MouseEvent<HTMLElement>) {
    setAnchorEl(e.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <>
      <IconButton onClick={handleOpen}>
        <ShuffleRoundedIcon />
      </IconButton>
      <ShuffleConfirm
        guildId={guildId}
        open={!!anchorEl}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'center', horizontal: 'left' }}
        onClose={handleClose}
        closePopover={handleClose}
      />
    </>
  );
};
