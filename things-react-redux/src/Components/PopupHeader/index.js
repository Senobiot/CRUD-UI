import React, { useState } from 'react';

export const PopupHeader = (props) => {
  const { addCustomfield, closePopup, open } = props;
  const [value, setValue] = useState('');

  const valueHandler = (e) => {
    setValue(e.target.value);
  };

  const createHandler = () => {
    if (!value) {
      return;
    }
    addCustomfield(value);
    setValue('');
  };

  const cancelHandler = () => {
    closePopup();
  };

  return (
    <div className={open ? 'headerPopup' : 'headerPopup hidden'}>
      <input
        type="text"
        value={value}
        placeholder="Enter field name ..."
        onChange={valueHandler}
      ></input>
      <div className="addField" onClick={createHandler}></div>
      <div className="cancelField" onClick={cancelHandler}></div>
    </div>
  );
};
