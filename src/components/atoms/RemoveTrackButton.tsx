import IconButton from '@material-ui/core/IconButton';
import RemoveCircleRoundedIcon from '@material-ui/icons/RemoveCircleRounded';
import _ from 'lodash';
import { useSnackbar } from 'notistack';
import React from 'react';
import {
  Track,
  TracksDocument,
  useRemoveTrackMutation,
} from '../../graphql/generated';

interface IRemoveTrackButton {
  guildId: string;
  track: Pick<Track, 'id' | 'title'>;
}

export const RemoveTrackButton: React.FC<IRemoveTrackButton> = ({
  guildId,
  track,
}) => {
  const { id: trackId, title } = track;
  const [removeTrack] = useRemoveTrackMutation({
    refetchQueries: [{ query: TracksDocument, variables: { guildId } }],
  });
  const { enqueueSnackbar } = useSnackbar();

  async function handleClick() {
    await removeTrack({
      variables: {
        input: { guildId, trackId },
      },
    });
    enqueueSnackbar(
      <span>
        Removed <b>{_.truncate(title)}</b>
      </span>,
      { variant: 'warning' },
    );
  }
  // TODO: loading state
  return (
    <IconButton size="small" onClick={handleClick}>
      <RemoveCircleRoundedIcon />
    </IconButton>
  );
};
