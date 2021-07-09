import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { useSnackbar } from 'notistack';
import React from 'react';
import {
  TracksDocument,
  useShuffleTracksMutation,
} from '../../graphql/generated';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(1),
    },
  }),
);

interface IShuffleConfirm extends React.ComponentProps<typeof Popover> {
  guildId: string;
  closePopover: () => void;
}

export const ShuffleConfirm: React.FC<IShuffleConfirm> = ({
  guildId,
  closePopover,
  ...props
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [shuffle] = useShuffleTracksMutation({
    refetchQueries: [{ query: TracksDocument, variables: { guildId } }],
  });

  async function handleConfirm() {
    closePopover();
    await shuffle({ variables: { guildId } });
    enqueueSnackbar('Tracks shuffled!', { variant: 'success' });
  }

  return (
    <Popover {...props}>
      <Box className={classes.container}>
        <Typography variant="body1" color="textSecondary">
          Shuffle tracks?
        </Typography>
        <Button variant="text" color="default" onClick={handleConfirm}>
          Yee
        </Button>
        <Button variant="text" color="default" onClick={() => closePopover()}>
          Nope
        </Button>
      </Box>
    </Popover>
  );
};
