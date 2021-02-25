import React, { Component } from 'react';
import { Spinner } from '/';
import { getData } from '/';
import { Header } from '/';
import { StatusBar } from '/';
import { ThingBar } from '/';
import './App.scss';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getAll = this.getAll.bind(this);
  }

  async getAll(external, msg, error) {
    this.setState({ isLoaded: false });
    if (error) {
      this.setState({ isLoaded: true, error: true, status: error });
      return;
    }
    try {
      const startTime = external ? external : new Date().getTime();
      const response = await getData();
      response.sort((a, b) => a.id - b.id);
      this.setState({
        items: response,
        isLoaded: true,
        status: msg ? msg : 'Get data success in',
        start: startTime,
        end: new Date().getTime(),
        error: false,
        editMode: false,
        currEdit: null,
      });
    } catch (error) {
      this.setState({ items: [], isLoaded: true, error: true, status: error });
    }
  }

  async componentDidMount() {
    await this.getAll();
  }

  render() {
    return (
      <div className="wrapper">
        <header className="title">Things BE UI Task</header>
        {this.state.isLoaded ? (
          <>
            <Header getAll={this.getAll} />
            <StatusBar state={this.state} />
            <ThingBar getAll={this.getAll} items={this.state.items} />
          </>
        ) : (
          <img src={Spinner} alt="spinner" />
        )}
      </div>
    );
  }
}
