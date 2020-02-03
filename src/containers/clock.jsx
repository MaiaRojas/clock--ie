import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';

import TimelineIcon from '@material-ui/icons/Timeline';
import { Typography } from '@material-ui/core';

import WatchList from '../components/watch-list';
import Stopwatch from '../components/time';
import sortByTime from '../utils/sort';


const styles = theme => ({
  bebe: {
    fontSize: 32,
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#333',
    textAlign: 'center',
    flexDirection: 'column',
  },
  paper: {
    margin: theme.spacing(4),
    padding: `${theme.spacing(3)}px ${theme.spacing(4)}px ${theme.spacing(4)}px`,
    width: '100%',
    maxWidth: theme.leftDrawerWidth,
  },
  contentLogo: {
    width: '100%',
    maxWidth: theme.leftDrawerWidth,
  },
  logo: {
    width: '100%',
    display: 'block',
    margin: `0 auto ${theme.spacing(1)}px`,
  },
});

const StopwatchControls = ({ onToggle, running}) =>
  <Fab onClick={onToggle}>
    {running ? 'STOP' : 'START'}
  </Fab>

const bestTime = (attempts) => {
  if (attempts.length === 0){
    return '00:00:00';
  }
  return Stopwatch(attempts.sort(sortByTime)[0])
}

const AverageTime = (attempts) => {
  if (attempts.length === 0){
    return '00:00:00';
  }
  const average = attempts.reduce((acc, current) => acc + current.time, 0) / attempts.length;
  return Stopwatch({ time: average });
}


class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      running: false,
      date: '',
    };
    this.toggle = this.toggle.bind(this);
    this.tick = this.tick.bind(this);
  }
  toggle() {
    if (!this.state.running) {
      this.startTime = +new Date();
      this.tick();
    } else {
      const dataLocal = JSON.parse(localStorage.getItem('attempts'));
      if (dataLocal){
        dataLocal.push({ time: this.state.time, date: new Date() })
        localStorage.setItem('attempts', JSON.stringify(dataLocal));
      } else{
        localStorage.setItem('attempts', JSON.stringify([{ time: this.state.time, date: new Date() }]))
      }
      this.update(false);
      this.setState({ time: 0 });
      clearTimeout(this.timeout);
    }
  }
  tick() {
    this.update(true);
    this.timeout = setTimeout(this.tick);
  }
  update(running) {
    this.setState({
      time: +new Date() - this.startTime,
      running
    });
  }
  render() {
    const { classes } = this.props;
    const attempts = JSON.parse(localStorage.getItem('attempts')) || [];
    return (
      <div className={classes.root}>
        <div className="stopwatch">
          <Stopwatch time={this.state.time} done='time' />
          <StopwatchControls onToggle={this.toggle} running={this.state.running} />
          <Paper>
            <List
              component="nav"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Intento de Vueltas
                </ListSubheader>
              }
            >
              {WatchList(attempts)}
            </List>
          </Paper>
          <Paper>
            <Link to={`/history`}>
              <Chip
                icon={<TimelineIcon />}
                label="History"
                clickable
                color="primary"
                variant="outlined"
              />
            </Link>
            <>
              <Card>
                <CardContent className={classes.content}>
                  <Typography component="h5" variant="h5">
                    Best Time
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {bestTime(attempts)}
                  </Typography>
                </CardContent>
              </Card>
              <Card>
                <CardContent className={classes.content}>
                  <Typography component="h5">
                    Average Time
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {AverageTime(attempts)}
                  </Typography>
                </CardContent>
              </Card>
            </>
          </Paper>
        </div>
      </div>
    );
  }
}

// Clock.propTypes = {

// };


export default withStyles(styles)(Clock);
