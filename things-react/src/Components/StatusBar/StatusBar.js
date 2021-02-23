import React from 'react';

export const StatusBar = ({ app }) => {
  const { error, status, start, end } = app.state;
  return (
    <div className={error ? 'warning' : 'stats'}>
      {!error && !status
        ? `Get data success in ${end - start} ms`
        : !error && status
        ? `${status} ${end - start} ms`
        : 'Warning! ' + status}
    </div>
  );
};
