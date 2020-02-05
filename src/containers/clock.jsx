import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


import Stopwatch from '../components/time';
import sortByTime from '../utils/sort';
import WatchList from '../components/watch-list';


const styles = (theme)=> ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#000',
    textAlign: 'center',
    flexDirection: 'column',
  },
  list: {
    textAlign: 'center',
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
  delete: {
    backgroundColor: '#E7A997',
    '&:hover': {
      backgroundColor: '#E7A997 !important',
    },
  },
  history: {
    backgroundColor: '#97E7DB',
    '&:hover': {
      backgroundColor: '#97E7DB !important',
    },
  },
  section: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#333',
  },
  button: {
    width: 80,
    height: 80,
    textTransform: 'none',
    backgroundColor: '#97E7DB',
  }
});

const bestTime = (attempts) => attempts.sort(sortByTime)[0].time;

const averageTime = (attempts) => attempts
    .reduce((acc, current) => acc + current.time, 0) / attempts.length

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
      this.startTime = Date.now();
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
      time: Date.now() - this.startTime,
      running
    });
  }
  resetAll () {
    localStorage.removeItem('attempts')
  }
  render() {
    const { classes } = this.props;
    const attempts = JSON.parse(localStorage.getItem('attempts')) || [];
    return (
      <div className={classes.root}>
        <div className="stopwatch">
          <h2 style={{ color: '#97E7DB' }}>Cronomium</h2>
          <section style={{ height: 200 }}>
            <div style={{ color: '#fff'}}>
              <Stopwatch time={this.state.time} format='time' />
            </div>
            <Fab className={classes.button} onClick={this.toggle}>
              {this.state.running ? 'Stop' : 'Start'}
            </Fab>
          </section>

          <section className={classes.section}>
            <ListItem style={{ padding: 0 }}>
              <ListItemText
                classes={{
                  root: classes.list,
                  primary: classes.primary,
                  secondary: classes.secondary,
                }}
                primary='Best Time'
                secondary={attempts.length > 0
                  ? <Stopwatch time={bestTime(attempts)} format='home' />
                  : '00:00:00'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                classes={{
                  root: classes.list,
                  primary: classes.primary,
                  secondary: classes.secondary,
                }}
                primary='Average Time'
                secondary={attempts.length > 0
                  ? <Stopwatch time={averageTime(attempts)} format='home' />
                  : '00:00:00'
                }
              />
            </ListItem>
          </section>

          <section>
            {attempts.length > 0 && (
              <WatchList attempts={attempts} format='home' />
            )}
          </section>

          <section className={classes.section}>
            <Link to={`/`}>
              <Chip
                label="Reset all"
                clickable
                onClick={this.resetAll}
                classes={{
                  root: classes.delete
                }}
                variant="outlined"
              />
            </Link>
            <Link to={`/history`}>
              <Chip
                label="History"
                clickable
                classes={{
                  root: classes.history
                }}
                variant="outlined"
              />
            </Link>
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
