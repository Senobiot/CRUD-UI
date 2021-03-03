import React from 'react';
import './Paginator.scss';

export const Paginator = (props) => {
  const { size, getPage, currentLimit, changeLimit, activePage, infniteScroll, infinite } = props;
  const pageQty = Math.ceil(size / (currentLimit ? currentLimit : 10));

  const changePage = (idx, isInifnite) => {
    const start = new Date().getTime();
    const msg = `Get page ${idx} success in`;
    getPage(start, msg, false, idx, isInifnite);
  };

  const newLimit = (e) => {
    changeLimit(+e.target.value);
  };

  const scrollHandler = () => {
    infniteScroll();
    changePage(1, true);
  };

  const items = [];

  for (let idx = 1; idx <= pageQty; idx++) {
    items.push(
      <div
        className={idx === activePage ? 'pageQtyBtn active' : 'pageQtyBtn'}
        onClick={(e) => changePage(idx)}
        key={idx}
      >
        {idx}
      </div>,
    );
  }

  return (
    <div className="paginator">
      <div className={infinite ? 'pageQtyWrapper hidden' : 'pageQtyWrapper'}>{items}</div>
      <div className={'emitter'}>
        <input
          onChange={newLimit}
          disabled={infinite ? true : false}
          type="range"
          id="volume"
          value={currentLimit ? currentLimit : 10}
          name="volume"
          min="4"
          max="10"
          step="2"
        ></input>
        <label htmlFor="volume">
          Things on Page <b>{currentLimit ? currentLimit : 10}</b>
        </label>
      </div>
      <div className="scrollChecker">
        <input
          onChange={scrollHandler}
          checked={infinite ? true : false}
          type="checkbox"
          name="checker"
          className="osman"
        ></input>
        <label htmlFor="checker">
          Set infinite Scroll <b>{infinite ? 'ON' : 'OFF'}</b>
        </label>
      </div>
    </div>
  );
};
