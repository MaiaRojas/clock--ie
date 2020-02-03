import React from 'react';

function padNumber(value) {
  return value > 9 ? String(value) : "0" + value;
}

const Time = ({ time, done}) => {
  const hours = padNumber(Math.floor(time / 3600000));
  const minutes = padNumber(Math.floor(time / 60000) % 60);
  const seconds = padNumber(Math.floor(time / 1000) % 60); // Tip: 1000 ms = 1 second
  const c = padNumber(Math.round(time / 10) % 100);
  return (
    <p className={done ? done : ''} style={{ margin: 0 }}>
      {hours}:{minutes}:{seconds}.<small>{c}</small>
    </p>
  );
};

export default Time;