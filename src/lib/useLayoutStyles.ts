import { createStyles, makeStyles, Theme } from '@material-ui/core';

const drawerWidth = 240;

export const useLayoutStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    appBarTitle: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      [theme.breakpoints.up('xs')]: {
        padding: theme.spacing(4),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
      },
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(3),
      },
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(4),
      },
    },
  }),
);
