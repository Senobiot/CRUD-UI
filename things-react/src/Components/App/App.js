import React, { Component } from 'react';
import Spinner from '../../assets/spinner2.svg';
import { getData } from '../Requests';
import { Header } from '../Header';
import { StatusBar } from '../StatusBar';
import { ThingBar } from '../ThingBar';
import './App.scss';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newThingName: '',
      newThingCar: 'none',
      newThingPet: 'none',
      start: null,
      end: null,
      error: null,
      status: null,
      isLoaded: false,
      reload: false,
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
