import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React from 'react';
import { useUpdatePrefixMutation } from '../../graphql/generated';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  }),
);

interface IResetButton {}

export const ResetPrefixButton: React.FC<IResetButton> = () => {
  const [updatePrefix] = useUpdatePrefixMutation();
  const classes = useStyles();
  async function handleClick() {
    // TODO:
  }
  return (
    <Button className={classes.root} onClick={handleClick}>
      Reset default
    </Button>
  );
};
