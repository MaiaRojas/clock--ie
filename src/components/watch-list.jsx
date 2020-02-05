import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Time from './time';

const styles = theme => ({
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
    fontWeight: 500,
    margin: 0,
  },
  list: {
    borderTop: '1px #97E7DB solid',
  }
});

const WatchList = ({ attempts, format, classes }) => {
  const filteredList= (format === 'home' && attempts.length > 3) ? attempts.slice(attempts.length - 3) : attempts;
  return (
    <List
      subheader={
        <ListSubheader className={classes.subHeader} >
          Attempts
        </ListSubheader>
      }
    >
      {filteredList.map((attempt, idx) => (
        <ListItem key={`key-${idx}`} className={classes.list}>
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
}

WatchList.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    primary: PropTypes.string.isRequired,
    secundary: PropTypes.string.isRequired,
    subHeader: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(WatchList);