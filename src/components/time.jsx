import React from 'react';
import moment from 'moment';

import padNumber from '../utils/padNumber';


const Time = ({ time, date, format }) => {
  const minutes = padNumber(Math.floor(time / 60000) % 60);
  const seconds = padNumber(Math.floor(time / 1000) % 60); // Tip: 1000 ms = 1 second
  const c = padNumber(Math.round(time / 10) % 100);

  if (format === 'time') {
    return (
    <p className={format}>
      {minutes}:{seconds}.<small>{c}</small>
    </p>
  )}

  if (format === 'home') {
    return (
    <p style={{ margin: 0 }}>
      {minutes}:{seconds}.<small>{c}</small>
    </p>
  )}

  return (
    <div>
      <small>{moment(date).calendar()}</small>
      <p style={{ margin: 0 }}>
        {minutes}:{seconds}.<small>{c}</small>
      </p>
    </div>
  );
};

export default Time;