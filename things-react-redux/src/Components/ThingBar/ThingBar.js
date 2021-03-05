import React, { Component } from 'react';
import { ThingItem } from '/';

export class ThingBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      newData: {},
      editMode: false,
      currEdit: null,
      addingMode: false,
      addNewField: 'New field',
    };
    this.changeField = this.changeField.bind(this);
    this.changeCustomField = this.changeCustomField.bind(this);
    this.editItem = this.editItem.bind(this);
    this.infoItem = this.infoItem.bind(this);
    this.deleteRequest = this.deleteRequest.bind(this);
    this.putRequest = this.putRequest.bind(this);
    this.scrollWrapper = this.scrollWrapper.bind(this);
    this.addCustomField = this.addCustomField.bind(this);
    this.addingMode = this.addingMode.bind(this);
    this.changeNewField = this.changeNewField.bind(this);
  }

  async deleteRequest(id) {
    const start = new Date().getTime();
    const msg = 'Delete data success in';

    await this.props.deleteRequest(id);
    if (!this.props.error) {
      await this.props.getAll(start, msg);
    }
  }

  async putRequest(e, data) {
    const start = new Date().getTime();
    const msg = 'Put data success in';

    await this.props.putRequest(e, data);
    if (!this.props.error) {
      await this.props.getAll(start, msg);
    }
  }

  infoItem(index) {
    const items = this.state.items;
    if (items[index].info) {
      items[index].info = false;
      this.setState({ items: items });
      return;
    }
    for (let index = 0; index < items.length; index++) {
      items[index].info = false;
    }
    items[index].info = true;
    this.setState({ items: items });
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
      this.setState({ items: items, editMode: false, currEdit: null, editMode: false });
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
    const fieldData = this.state.newData;
    items[index][fieldName] = e.target.value;
    fieldData[fieldName] = e.target.value;
    this.setState({ newData: fieldData, items: items });
  }

  changeCustomField(index, fieldName, e) {
    const items = this.state.items;
    const fieldData = this.state.newData;
    fieldData.custom = {};
    items[index].custom[fieldName] = e.target.value;
    fieldData.custom[fieldName] = e.target.value;
    this.setState({ newData: fieldData, items: items });
  }

  changeNewField(e) {
    this.setState({ addNewField: e.target.value });
  }

  addingMode() {
    this.setState({ addingMode: !this.state.addingMode });
  }

  addCustomField(index) {
    const items = this.state.items;
    if (!items[index].custom) {
      items[index].custom = {};
    }
    items[index].custom[this.state.addNewField] = 'Enter Value';
    this.setState({ items: items, addingMode: false });
  }

  scrollWrapper(e) {
    if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
      this.props.scroll();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.items !== prevProps.items) {
      this.setState({ items: this.props.items });
    }
  }

  render() {
    return (
      <div
        className={!this.props.infinite ? 'subWrapper' : 'subWrapper infinite'}
        onScroll={this.scrollWrapper}
      >
        {this.state.items.map((item, index) => {
          if (index + 1 > this.props.limit && !this.props.infinite) {
            return;
          }
          return (
            <ThingItem
              key={item._id}
              index={index}
              item={item}
              changeField={this.changeField}
              changeCustomField={this.changeCustomField}
              addCustomField={this.addCustomField}
              deleteRequest={this.deleteRequest}
              infoItem={this.infoItem}
              editItem={this.editItem}
              currEdit={this.state.currEdit}
              addingMode={this.state.addingMode}
              addingModeHandler={this.addingMode}
              changeNewField={this.changeNewField}
            />
          );
        })}
      </div>
    );
  }
}
