import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
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
    backgroundColor: '#000',
    textAlign: 'center',
    flexDirection: 'column',
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
        <div className="stopwatch">
          <Link to={`/`}>
            <Chip
              icon={<HomeRoundedIcon />}
              label="Home"
              clickable
              color="primary"
              variant="outlined"
            />
          </Link>
          <section>
            <Graphic data={attempts} />
          </section>
          <section>
            {attempts.length > 0 && (
                <WatchList attempts={attempts}/>
            )}
          </section>
        </div>
      </div>
    );
  }
}

// History.propTypes = {

// };


export default withStyles(styles)(History);
