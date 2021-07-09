import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';
import RemoveCircleRoundedIcon from '@material-ui/icons/RemoveCircleRounded';
import React, { useEffect } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { activeGuildSelector, useStore } from '../../controllers/store';
import { useTracksLazyQuery } from '../../graphql/generated';
import { AddTrackForm } from '../atoms/AddTrackForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingRight: theme.spacing(8),
    },
  }),
);

interface ITrackList {}

export const TrackList: React.FC<ITrackList> = () => {
  const classes = useStyles();
  const activeGuild = useStore(activeGuildSelector);
  const [getTracks, { data, loading }] = useTracksLazyQuery({
    pollInterval: 5000,
  });
  useEffect(() => {
    if (!activeGuild) return;
    getTracks({ variables: { guildId: activeGuild.id } });
  }, [activeGuild, getTracks]);
  if (loading) {
    // TODO:
    return null;
  }
  if (!data || !activeGuild) {
    // TODO:
    return null;
  }

  const TrackItem: React.FC<ListChildComponentProps<any>> = ({
    index,
    style,
  }) => {
    return (
      <ListItem divider style={style} className={classes.root}>
        <ListItemText
          disableTypography
          primary={
            <Typography variant="body1" color="textPrimary" noWrap>
              {data.getTracks[index].title}
            </Typography>
          }
          secondary={
            <Typography variant="body2" color="textSecondary" noWrap>
              {data.getTracks[index].duration}
            </Typography>
          }
        >
          <ListItemSecondaryAction>
            <IconButton size="small">
              <RemoveCircleRoundedIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItemText>
      </ListItem>
    );
  };

  return (
    <Card>
      <CardHeader
        action={
          <IconButton aria-label="">
            <MoreVertIcon />
          </IconButton>
        }
        title="Queued"
        subheader={`${data.getTracks.length} tracks`}
      />
      <FixedSizeList
        itemCount={data.getTracks.length}
        height={200}
        itemSize={50}
        width="100%"
      >
        {TrackItem}
      </FixedSizeList>
      <CardActions>
        <AddTrackForm activeGuild={activeGuild} />
      </CardActions>
    </Card>
  );
};
