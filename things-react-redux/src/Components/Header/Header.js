import React, { Component } from 'react';
import { cars, pets } from '/';
import { PopupHeader } from '/';
import { v4 as uuidv4 } from 'uuid';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      car: 'none',
      pet: 'none',
      custom: {},
    };
    this.handleName = this.handleName.bind(this);
    this.handleCar = this.handleCar.bind(this);
    this.handlePet = this.handlePet.bind(this);
    this.postRequest = this.postRequest.bind(this);
    this.addCustomfield = this.addCustomfield.bind(this);
    this.openPopup = this.openPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
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

  handleCustom(e, fieldName) {
    this.setState({
      custom: {
        ...this.state.custom,
        [fieldName]: e.target.value,
      },
    });
  }

  addCustomfield(name) {
    this.setState({
      popup: false,
      custom: {
        ...this.state.custom,
        [name]: '',
      },
    });
  }

  openPopup() {
    this.setState({ popup: true });
    console.log(this.state);
  }

  closePopup() {
    this.setState({ popup: false });
  }

  async postRequest() {
    const start = new Date().getTime();
    const msg = 'Post data success in';
    let newThing = {...this.state}
    delete newThing.popup;
    
    await this.props.postRequest(newThing);
    await this.props.getAll(start, msg);
  }

  render() {
    return (
      <div className="header">
        <input
          type="search"
          className="thingName"
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
        <div className="addBtn" onClick={this.openPopup}></div>
        <div className="sendBtn" onClick={this.postRequest}></div>
        {Object.keys(this.state.custom).map((field) => {
          return (
            <div key={field} className="customWrapper">
              <input type="text" value={field} disabled={true}></input>
              <input
                type="search"
                placeholder={`Add ${field} value...`}
                value={this.state.custom[field]}
                onChange={(e) => this.handleCustom(e, field)}
              ></input>
            </div>
          );
        })}
        <PopupHeader
          closePopup={this.closePopup}
          open={this.state.popup}
          addCustomfield={this.addCustomfield}
        />
      </div>
    );
  }
}
