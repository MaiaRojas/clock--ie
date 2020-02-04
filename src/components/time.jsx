import React from 'react';
import moment from 'moment';

function padNumber(value) {
  return value > 9 ? String(value) : "0" + value;
}

const Time = ({ time, date, format }) => {
  const hours = padNumber(Math.floor(time / 3600000));
  const minutes = padNumber(Math.floor(time / 60000) % 60);
  const seconds = padNumber(Math.floor(time / 1000) % 60); // Tip: 1000 ms = 1 second
  const c = padNumber(Math.round(time / 10) % 100);

  if (format === 'time') {
    return (
    <p className={format}>
      {hours}:{minutes}:{seconds}.<small>{c}</small>
    </p>
  )}

  if (format === 'home') {
    return (
    <p>
      {hours}:{minutes}:{seconds}.<small>{c}</small>
    </p>
  )}

  return (
    <div>
      <small>{moment(date).calendar()}</small>
      <p>
        {hours}:{minutes}:{seconds}.<small>{c}</small>
      </p>
    </div>
  );
};

export default Time;