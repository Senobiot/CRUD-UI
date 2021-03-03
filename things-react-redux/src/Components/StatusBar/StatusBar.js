import React from 'react';

export const StatusBar = ({ state }) => {
  const { error, status, start, end } = state;
  return (
    <div className={error ? 'warning' : 'stats'}>
      {!error ? `${status} ${end - start} ms` : 'Warning! ' + status}
    </div>
  );
};
