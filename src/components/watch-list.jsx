import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Time from './time';

const styles = theme => ({
  text: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 0,
  },
  primary: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: theme.typography.fontSize,
    lineHeight: '125%',
  },
  secondary: {
    color: '#FFF',
    fontSize: '14px',
  },
  subHeader: {
    color: '#fff',
    fontWeight: 700,
  }
});

const WatchList = ({ attempts, format, classes }) => (
  <List
    subheader={
      <ListSubheader component="h2" className={classes.subHeader} >
        ATTEMPTS
      </ListSubheader>
    }
  >
    {attempts.map((attempt, idx) => (
      <ListItem key={attempt} style={{ padding: 0, borderTop: '1px #fff solid' }}>
        <ListItemText
          classes={{
            root: classes.root,
            primary: classes.primary,
            secondary: classes.secondary,
          }}
          primary={`Round ${attempts.length - idx}`}
          secondary={Time({ ...attempt, format})}
        />
      </ListItem>
    ))}
  </List>
)


export default withStyles(styles)(WatchList);