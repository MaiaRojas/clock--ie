import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import Chip from '@material-ui/core/Chip';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';

import Graphic from '../components/graphic';
import WatchList from '../components/watch-list';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#F7F7F7',
    textAlign: 'center',
    flexDirection: 'column',
  },
  paper: {
    margin: theme.spacing(4),
    padding: `${theme.spacing(3)}px ${theme.spacing(4)}px ${theme.spacing(4)}px`,
    width: '100%',
    maxWidth: theme.leftDrawerWidth,
  },
});


class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: 0, running: false };
  }

  render() {
    const { classes } = this.props;
    const attempts = JSON.parse(localStorage.getItem('attempts')) || [];
    return (
      <div className={classes.root}>
        <Link to={`/`}>
          <Chip
            icon={<HomeRoundedIcon />}
            label="Home"
            clickable
            color="primary"
            variant="outlined"
          />
            </Link>
        <Graphic data={attempts} />
        <div className="stopwatch">
          <Paper>
            <List
              component="nav"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Lista de intentos
                </ListSubheader>
              }
            >
            {WatchList(attempts)}
            </List>
          </Paper>
        </div>
      </div>
    );
  }
}

// History.propTypes = {

// };


export default withStyles(styles)(History);
