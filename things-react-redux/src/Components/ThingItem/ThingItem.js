import React, { Component } from 'react';
import { cars, pets } from '/';
import { v4 as uuidv4 } from 'uuid';

export class ThingItem extends Component {
  render() {
    return (
      <fieldset
        key={this.props.item._id}
        className={
          this.props.item.blink
            ? 'thingTile green blink'
            : this.props.item.edit
            ? 'thingTile green'
            : 'thingTile'
        }
        disabled={this.props.item.edit ? false : true}
      >
        <div>{this.props.index + 1}</div>
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
        <div className="infoBtn" onClick={this.props.infoItem.bind(this, this.props.index)}></div>
        <div
          className="changeBtn"
          onClick={this.props.editItem.bind(this, this.props.index, this.props.item._id)}
        ></div>
        <div
          className="deleteBtn"
          onClick={this.props.deleteRequest.bind(this, this.props.item._id)}
        ></div>
        <div
          className={this.props.currEdit === this.props.index ? 'addBtn' : 'addBtn hidden'}
          onClick={this.props.addingModeHandler}
        ></div>
        <div className={this.props.item.info ? 'expand' : 'collapse'}>
          <div>
            <b>ID</b>: {this.props.item._id}
          </div>
          {this.props.item.custom && !this.props.addingMode ? (
            Object.keys(this.props.item.custom).map((field, idx) => {
              return (
                <div key={field}>
                  <div className="fieldName">
                    Field {idx + 1} : {field}
                  </div>
                  <input
                    type="search"
                    defaultValue={this.props.item.custom[field]}
                    onChange={this.props.changeCustomField.bind(this, this.props.index, field)}
                  ></input>
                </div>
              );
            })
          ) : this.props.addingMode ? (
            <div className="editWrapper">
              <input
                type="search"
                defaultValue={'Enter Field Name'}
                onChange={this.props.changeNewField}
              ></input>
              <div className="cancelBtn" onClick={this.props.addingModeHandler}></div>
              <div
                className="applyBtn"
                onClick={this.props.addCustomField.bind(this, this.props.index)}
              ></div>
            </div>
          ) : null}
        </div>
      </fieldset>
    );
  }
}
