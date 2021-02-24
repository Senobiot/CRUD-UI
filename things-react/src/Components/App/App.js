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
    this.state = {
      start: null,
      end: null,
      error: null,
      status: null,
      isLoaded: false,
      items: null,
      editMode: false,
      currEdit: null,
    };
  }

  componentDidMount() {
    this.setState({ start: new Date().getTime() });
    getData(this);
  }

  render() {
    return (
      <div className="wrapper">
        <header className="title">Things BE UI Task</header>
        {this.state.isLoaded ? (
          <>
            <Header app={this} />
            <StatusBar app={this} />
            <ThingBar app={this} />
          </>
        ) : (
          <img src={Spinner} alt="spinner" />
        )}
      </div>
    );
  }
}
