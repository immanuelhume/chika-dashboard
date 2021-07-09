import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { activeGuildSelector, useStore } from '../../controllers/store';
import { useTracksLazyQuery } from '../../graphql/generated';
import { AddTrackForm } from '../atoms/AddTrackForm';
import { RemoveTrackButton } from '../atoms/RemoveTrackButton';
import { ShuffleButton } from '../atoms/ShuffleButton';

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
  const { enqueueSnackbar } = useSnackbar();
  const activeGuild = useStore(activeGuildSelector);
  const [getTracks, { data, loading, previousData }] = useTracksLazyQuery({
    pollInterval: 5000,
  });
  useEffect(() => {
    if (!activeGuild) return;
    getTracks({ variables: { guildId: activeGuild.id } });
  }, [activeGuild, getTracks]);
  useEffect(() => {
    // snackbar if song was added
    if (!previousData || !data) return;
    const added = _.differenceBy(data.getTracks, previousData.getTracks, 'id');
    added.forEach(({ title }) => {
      enqueueSnackbar(
        <span>
          Added <b>{_.truncate(title)}</b>
        </span>,
        { variant: 'success' },
      );
    });
  }, [previousData, data, enqueueSnackbar]);
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
    const track = data.getTracks[index];
    const { title, duration } = track;
    return (
      <ListItem divider button style={style} className={classes.root}>
        <ListItemText
          disableTypography
          primary={
            <Typography variant="body1" color="textPrimary" noWrap>
              {title}
            </Typography>
          }
          secondary={
            <Typography variant="body2" color="textSecondary" noWrap>
              {duration}
            </Typography>
          }
        />
        <ScopedCssBaseline>
          <ListItemSecondaryAction>
            <RemoveTrackButton guildId={activeGuild.id} track={track} />
          </ListItemSecondaryAction>
        </ScopedCssBaseline>
      </ListItem>
    );
  };

  return (
    <Card>
      <CardHeader
        action={<ShuffleButton guildId={activeGuild.id} />}
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
