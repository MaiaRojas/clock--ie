import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import { Typography } from '@material-ui/core';
import TimelineIcon from '@material-ui/icons/Timeline';

import Stopwatch from '../components/time';
import sortByTime from '../utils/sort';
import WatchList from '../components/watch-list';


const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#000',
    textAlign: 'center',
    flexDirection: 'column',
  },
});

const StopwatchControls = ({ onToggle, running}) =>
  <Fab onClick={onToggle}>
    {running ? 'Stop' : 'Start'}
  </Fab>

const bestTime = (attempts) => {
  if (attempts.length === 0){
    return '00:00:00';
  }
  const best = attempts.sort(sortByTime)[0];
  return Stopwatch({ ...best, format: 'home' })
}

const averageTime = (attempts) => {
  if (attempts.length === 0){
    return '00:00:00';
  }
  const average = attempts.reduce((acc, current) => acc + current.time, 0) / attempts.length;
  return Stopwatch({ time: average, format: 'home' });
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
          <h1 style={{ color: '#fff' }}>Stopwatch</h1>
          <section>
            <div style={{ color: '#fff'}}>
              <Stopwatch time={this.state.time} format='time' />
            </div>
            <StopwatchControls onToggle={this.toggle} running={this.state.running} />
          </section>
          <section>
            {attempts.length > 0 && (
              <WatchList attempts={attempts} format='home' />
            )}
          </section>
          <section style={{ display: 'flex', justifyContent: 'space-between', margin: '16px 0' }}>
            <Chip
                icon={<DeleteIcon />}
                label="Reset all"
                clickable
                color="primary"
                variant="outlined"
              />
            <Link to={`/history`}>
              <Chip
                icon={<TimelineIcon />}
                label="History"
                clickable
                color="primary"
                variant="outlined"
              />
            </Link>
          </section>
          <section style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Card style={{ background: '#333' }}>
              <CardContent className={classes.content}>
                <Typography component="h5">
                  Best Time
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  {bestTime(attempts)}
                </Typography>
              </CardContent>
            </Card>
            <Card style={{ background: '#333' }}>
              <CardContent className={classes.content}>
                <Typography component="h5">
                  Average Time
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  {averageTime(attempts)}
                </Typography>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    );
  }
}

Clock.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
};


export default withStyles(styles)(Clock);
