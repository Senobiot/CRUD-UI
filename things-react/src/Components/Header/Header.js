import React, { Component } from 'react';
import { cars, pets } from '/';
import { postData } from '/';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      car: 'none',
      pet: 'none',
    };
    this.handleName = this.handleName.bind(this);
    this.handleCar = this.handleCar.bind(this);
    this.handlePet = this.handlePet.bind(this);
    this.postRequest = this.postRequest.bind(this);
  }

  handleName(e) {
    this.setState({ name: e.target.value });
  }

  handleCar(e) {
    this.setState({ car: e.target.value });
  }

  handlePet(e) {
    this.setState({ pet: e.target.value });
  }

  postRequest() {
    postData(this.props.app, this.state);
  }

  render() {
    return (
      <div className="header">
        <input
          type="search"
          placeholder="Add new thing name..."
          value={this.state.name}
          onChange={this.handleName}
        ></input>
        <select value={this.state.car} onChange={this.handleCar}>
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
        <select value={this.state.pet} onChange={this.handlePet}>
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
        <div className="addBtn" onClick={this.postRequest}></div>
      </div>
    );
  }
}
