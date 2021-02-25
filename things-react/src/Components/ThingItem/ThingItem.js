import React, { Component } from 'react';
import { cars, pets } from '/';
import { v4 as uuidv4 } from 'uuid';

export class ThingItem extends Component {
  render() {
    return (
      <fieldset
        key={this.props.item.id}
        className={
          this.props.item.blink
            ? 'thingTile green blink'
            : this.props.item.edit
            ? 'thingTile green'
            : 'thingTile'
        }
        disabled={this.props.item.edit ? false : true}
      >
        <div>{this.props.item.id}</div>
        <input
          type="search"
          defaultValue={this.props.item.name}
          onChange={this.props.changeField.bind(this, this.props.index, 'name')}
        ></input>
        <div>
          <img
            className={'carLogo'}
            alt="carLogo"
            src={(
              process.env.PUBLIC_URL +
              `/cars_icons/${
                cars.indexOf(this.props.item.car.toLowerCase()) !== -1
                  ? this.props.item.car
                  : 'none'
              }.svg`
            ).toLowerCase()}
          />
        </div>
        <select
          defaultValue={this.props.item.car}
          onChange={this.props.changeField.bind(this, this.props.index, 'car')}
        >
          {this.props.currEdit === this.props.index ? (
            cars.map((e) => (
              <option
                key={uuidv4()}
                value={e}
                selected={e === this.props.item.car.toLowerCase() ? true : false}
              >
                {e}
              </option>
            ))
          ) : (
            <option key={uuidv4()} value={this.props.item.car}>
              {this.props.item.car}
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
                pets.indexOf(this.props.item.pet ? this.props.item.pet.toLowerCase() : null) !== -1
                  ? this.props.item.pet
                  : 'none'
              }.svg`
            ).toLowerCase()}
          />
        </div>
        <select
          defaultValue={this.props.item.pet}
          onChange={this.props.changeField.bind(this, this.props.index, 'pet')}
        >
          {this.props.currEdit === this.props.index ? (
            pets.map((e) => (
              <option
                key={uuidv4()}
                value={e}
                selected={
                  e === (this.props.item.pet ? this.props.item.pet.toLowerCase() : '')
                    ? true
                    : false
                }
              >
                {e}
              </option>
            ))
          ) : (
            <option key={uuidv4()} value={this.props.item.pet}>
              {this.props.item.pet}
            </option>
          )}
        </select>
        <div
          className={'changeBtn'}
          onClick={this.props.editItem.bind(this, this.props.index, this.props.item.id)}
        ></div>
        <div
          className={'deleteBtn'}
          onClick={this.props.deleteRequest.bind(this, this.props.item.id)}
        ></div>
      </fieldset>
    );
  }
}
