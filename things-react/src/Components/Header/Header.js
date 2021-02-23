import React from 'react';
import { cars, pets } from '../../dataKeys/dataKeys';
import { postData } from '../Requests';

export const Header = ({ app }) => {
  const postRequest = () => postData(app);

  const handleName = (e) => {
    app.setState({ newThingName: e.target.value });
  };

  const handleCar = (e) => {
    app.setState({ newThingCar: e.target.value });
  };

  const handlePet = (e) => {
    app.setState({ newThingPet: e.target.value });
  };

  return (
    <div className="header">
      <input
        type="search"
        placeholder="Add new thing name..."
        value={app.state.newThingName}
        onChange={handleName}
      ></input>
      <select value={app.state.newThingCar} onChange={handleCar}>
        {cars.map((e, idx) => {
          if (idx === 0) {
            return (
              <option key={idx} value="none" disabled>
                Select own car
              </option>
            );
          } else {
            return (
              <option key={idx} value={e}>
                {e}
              </option>
            );
          }
        })}
      </select>
      <select value={app.state.newThingPet} onChange={handlePet}>
        {pets.map((e, idx) => {
          if (idx === 0) {
            return (
              <option key={idx} value="none" disabled>
                Select own pet
              </option>
            );
          } else {
            return (
              <option key={idx} value={e}>
                {e}
              </option>
            );
          }
        })}
      </select>
      <div className="addBtn" onClick={postRequest}></div>
    </div>
  );
};
