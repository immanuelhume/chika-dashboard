import IconButton from '@material-ui/core/IconButton';
import ShuffleRoundedIcon from '@material-ui/icons/ShuffleRounded';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import {
  TracksDocument,
  useShuffleTracksMutation,
} from '../../graphql/generated';
import { IconButtonSpinner } from './IconButtonSpinner';
import { ShuffleConfirm } from './ShuffleConfirm';

interface IShuffleButton {
  guildId: string;
}

export const ShuffleButton: React.FC<IShuffleButton> = ({ guildId }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [shuffle] = useShuffleTracksMutation({
    refetchQueries: [{ query: TracksDocument, variables: { guildId } }],
  });

  function handleOpen(e: React.MouseEvent<HTMLElement>) {
    setAnchorEl(e.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }
  async function handleConfirm() {
    setIsSubmitting(true);
    setAnchorEl(null);
    await shuffle({ variables: { guildId } });
    enqueueSnackbar('Tracks shuffled!', { variant: 'info' });
    setIsSubmitting(false);
  }

  return (
    <>
      <IconButton onClick={handleOpen} disabled={isSubmitting}>
        <ShuffleRoundedIcon />
        <IconButtonSpinner size="medium" loading={isSubmitting} />
      </IconButton>
      <ShuffleConfirm
        open={!!anchorEl}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'center', horizontal: 'left' }}
        onClose={handleClose}
        handleConfirm={handleConfirm}
      />
    </>
  );
};
