import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles<Theme, IHStack>((theme: Theme) =>
  createStyles({
    root: ({ spacing }) => {
      let marginLeft;
      switch (spacing) {
        case 'xs':
          marginLeft = theme.spacing(0.5);
          break;
        case 'sm':
          marginLeft = theme.spacing(1);
          break;
        case 'md':
          marginLeft = theme.spacing(2);
          break;
        case 'lg':
          marginLeft = theme.spacing(4);
          break;
        case 'xl':
          marginLeft = theme.spacing(6);
          break;
        default:
          marginLeft = theme.spacing(2);
      }
      return {
        display: 'flex',
        '& > *:not(:first-child)': { marginLeft },
      };
    },
  }),
);

interface IHStack {
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const HStack: React.FC<IHStack> = ({ spacing, children }) => {
  const classes = useStyles({ spacing });
  return <div className={classes.root}>{children}</div>;
};
