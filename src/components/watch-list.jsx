import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';

import Time from './time';

const WatchList = (attempts) => {
  return attempts.map((attempt, idx) => (
    <ListItem>
      <ListItemText primary={`Vuelta ${idx +  1 }`}  secondary={Time(attempt)} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <DeleteForeverTwoToneIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
))}

export default WatchList;