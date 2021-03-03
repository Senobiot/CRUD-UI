import React, { Component } from 'react';
import { cars, pets } from '/';
import { postData } from '/';
import { v4 as uuidv4 } from 'uuid';

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

  async postRequest() {
    const start = new Date().getTime();
    const msg = 'Post data success in';
    try {
      await postData(this.state);
      await this.props.getAll(start, msg);
    } catch (error) {
      this.props.getAll(start, error, error);
    }
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
                <option key={uuidv4()} value="none" disabled>
                  Select own car
                </option>
              );
            } else {
              return (
                <option key={uuidv4()} value={e}>
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
                <option key={uuidv4()} value="none" disabled>
                  Select own pet
                </option>
              );
            } else {
              return (
                <option key={uuidv4()} value={e}>
                  {e}
                </option>
              );
            }
          })}
        </select>
        <div className="addBtn"></div>
        <div className="sendBtn" onClick={this.postRequest}></div>
      </div>
    );
  }
}
