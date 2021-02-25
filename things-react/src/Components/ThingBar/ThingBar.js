import React, { Component } from 'react';
import { ThingItem } from '/';
import { putData, deleteData } from '/';

export class ThingBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      newData: {},
      editMode: false,
      currEdit: null,
    };
    this.changeField = this.changeField.bind(this);
    this.editItem = this.editItem.bind(this);
    this.deleteRequest = this.deleteRequest.bind(this);
    this.putRequest = this.putRequest.bind(this);
  }

  async deleteRequest(id) {
    const start = new Date().getTime();
    const msg = 'Delete data success in';
    try {
      await deleteData(id);
      await this.props.getAll(start, msg);
    } catch (error) {
      this.props.getAll(start, error, error);
    }
  }

  async putRequest(e, data) {
    const start = new Date().getTime();
    const msg = 'Put data success in';
    try {
      await putData(e, data);
      await this.props.getAll(start, msg);
    } catch (error) {
      this.props.getAll(start, error, error);
    }
  }

  editItem(index, id, e) {
    if (index !== this.state.currEdit && this.state.editMode) {
      const items = this.state.items;
      items[this.state.currEdit].blink = true;
      this.setState({ items: items });
      return;
    }
    if (index === this.state.currEdit && this.state.editMode) {
      const items = this.state.items;
      items[index].edit = false;
      items[index].blink = false;
      e.target.className = 'changeBtn';
      this.setState({ items: items, editMode: false, currEdit: null });
      this.putRequest(id, this.state.newData);
      return;
    }
    e.target.className = 'sendChangeBtn';
    const items = this.state.items;
    items[index].edit = true;
    this.setState({ editMode: true, currEdit: index, items: items });
  }

  changeField(index, fieldName, e) {
    const items = this.state.items;
    const newData = {};
    items[index][fieldName] = e.target.value;
    newData[fieldName] = e.target.value;
    this.setState({ newData: newData, items: items });
  }

  render() {
    return (
      <div className="subWrapper">
        {this.state.items.map((item, index) => {
          return (
            <ThingItem
              key={item.id}
              index={index}
              item={item}
              changeField={this.changeField}
              deleteRequest={this.deleteRequest}
              editItem={this.editItem}
              currEdit={this.state.currEdit}
            />
          );
        })}
      </div>
    );
  }
}
