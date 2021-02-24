import React, { useRef } from 'react';
import { cars, pets } from '/';
import { putData, deleteData } from '/';
import { v4 as uuidv4 } from 'uuid';

export const ThingBar = ({ app }) => {
  const { items, currEdit, editMode } = app.state;
  const fieldsetRef = useRef([]);
  const body = {};

  const changeName = (e) => {
    body.name = e.target.value;
  };

  const changeCar = (e) => {
    body.car = e.target.value;
  };

  const changePet = (e) => {
    body.pet = e.target.value;
  };

  const deleteRequest = (e) => deleteData(app, e);

  const changeData = (e) => {
    if (editMode && currEdit !== +e.target.dataset.current) {
      fieldsetRef.current[currEdit].className = 'thingTile green blink';
      setTimeout(() => (fieldsetRef.current[currEdit].className = 'thingTile green'), 1000);
    } else if (!editMode) {
      const active = +e.target.dataset.current;
      fieldsetRef.current[active].className = 'thingTile green';
      e.target.className = 'sendChangeBtn';
      app.setState({ currEdit: active, editMode: true });
      fieldsetRef.current[active].disabled = false;
    } else if (editMode && currEdit === +e.target.dataset.current) {
      app.setState({ currEdit: null, editMode: false });
      e.target.className = 'changeBtn';
      fieldsetRef.current[e.target.dataset.current].className = 'thingTile';
      putData(app, body, e.target.dataset.id);
    }
  };

  return (
    <div className="subWrapper">
      {items.map((tile, index) => (
        <fieldset
          key={tile.id}
          className={'thingTile'}
          disabled={true}
          ref={(e) => (fieldsetRef.current[index] = e)}
        >
          <div>{tile.id}</div>
          <input type="search" defaultValue={tile.name} onChange={changeName}></input>
          <div>
            <img
              className={'carLogo'}
              alt="carLogo"
              src={(
                process.env.PUBLIC_URL +
                `/cars_icons/${cars.indexOf(tile.car.toLowerCase()) !== -1 ? tile.car : 'none'}.svg`
              ).toLowerCase()}
            />
          </div>
          <select defaultValue={tile.car} onChange={changeCar}>
            {currEdit === index ? (
              cars.map((e) => (
                <option
                  key={uuidv4()}
                  value={e}
                  selected={e === tile.car.toLowerCase() ? true : false}
                >
                  {e}
                </option>
              ))
            ) : (
              <option key={uuidv4()} value={tile.car}>
                {tile.car}
              </option>
            )}
          </select>
          <div>
            <img
              className={'petLogo'}
              alt="petLogo"
              src={(
                process.env.PUBLIC_URL +
                `/animals_icons/${
                  pets.indexOf(tile.pet ? tile.pet.toLowerCase() : null) !== -1 ? tile.pet : 'none'
                }.svg`
              ).toLowerCase()}
            />
          </div>
          <select onChange={changePet} defaultValue={tile.pet}>
            {currEdit === index ? (
              pets.map((e) => (
                <option
                  key={uuidv4()}
                  value={e}
                  selected={e === (tile.pet ? tile.pet.toLowerCase() : '') ? true : false}
                >
                  {e}
                </option>
              ))
            ) : (
              <option key={uuidv4()} value={tile.pet}>
                {tile.pet}
              </option>
            )}
          </select>
          <div
            className={'changeBtn'}
            onClick={changeData}
            data-id={tile.id}
            data-current={index}
          ></div>
          <div className={'deleteBtn'} onClick={deleteRequest} data-id={tile.id}></div>
        </fieldset>
      ))}
    </div>
  );
};
