import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(1),
    },
  }),
);

interface IShuffleConfirm extends React.ComponentProps<typeof Popover> {
  handleConfirm: () => void;
}

export const ShuffleConfirm: React.FC<IShuffleConfirm> = ({
  handleConfirm,
  ...props
}) => {
  const classes = useStyles();
  return (
    <Popover {...props}>
      <Box className={classes.container}>
        <Typography variant="body1" color="textSecondary">
          Shuffle tracks?
        </Typography>
        <Button variant="text" color="default" onClick={handleConfirm}>
          Yee
        </Button>
        <Button variant="text" color="default" onClick={() => handleConfirm()}>
          Nope
        </Button>
      </Box>
    </Popover>
  );
};
