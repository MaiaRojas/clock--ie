import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';

import Graphic from '../components/graphic';
import WatchList from '../components/watch-list';
import Grid from '@material-ui/core/Grid';

const styles = () => ({
  chip: {
    backgroundColor: '#97E7DB',
    '&:hover': {
      backgroundColor: '#97E7DB !important',
    },
  }
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
      <Grid container justify='center'>
        <Grid item xs={12} sm={12} md={5} lg={5} >
          <Link to={`/`} style={{ textDecoration: 'none' }}>
            <Chip
              label="< Back"
              clickable
              classes={{
                root: classes.chip
              }}
              variant="outlined"
            />
          </Link>
          <Graphic data={attempts} />
          {attempts.length > 0 && (
            <WatchList attempts={attempts}/>
          )}
        </Grid>
      </Grid>
    );
  }
}

History.propTypes = {
  classes: PropTypes.shape({
    chip: PropTypes.string.isRequired,
  }).isRequired,
};


export default withStyles(styles)(History);
