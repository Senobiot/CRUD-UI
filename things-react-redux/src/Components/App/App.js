import React, { Component } from 'react';
import { Spinner } from '/';
import { getData } from '/';
import { Header } from '/';
import { StatusBar } from '/';
import { Paginator } from '/';
import { ThingBar } from '/';
import './App.scss';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInifnite: false,
    };
    this.getAll = this.getAll.bind(this);
    this.changeLimit = this.changeLimit.bind(this);
    this.infniteScroll = this.infniteScroll.bind(this);
    this.getDataScroll = this.getDataScroll.bind(this);
  }

  changeLimit(newLimit){
    this.setState({ limit: newLimit });
  }

  infniteScroll(){
    this.setState({ isInifnite: !this.state.isInifnite });
  }

  async getDataScroll(){
    if (this.state.items.length >= this.state.dbSize) {
      return;
    }
    try {
      let response = await getData(this.state.scrollPage + 1);
      response.splice(-1,1);
      this.setState({
        items: this.state.items.concat(response),
        scrollPage: this.state.scrollPage + 1
      });
    } catch (error) {
      this.setState({ items: [], isLoaded: true, error: true, status: error });
    }
  }

  async getAll(external, msg, error, page = 1, restart) {
    this.setState({ isLoaded: false, page: page });

    if (error) {
      this.setState({ isLoaded: true, error: true, status: error });
      return;
    }
    try {
      const startTime = external ? external : new Date().getTime();
      let response = await getData(page, restart ? 10 : this.state.limit);
      const { CollectionSize } = response.splice(-1,1)[0];
      this.setState({
        dbSize: CollectionSize,
        items: response,
        isLoaded: true,
        status: msg ? msg : 'Get data success in',
        start: startTime,
        end: new Date().getTime(),
        error: false,
        editMode: false,
        currEdit: null,
        scrollPage: 1,
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
            <Paginator size={this.state.dbSize} infniteScroll={this.infniteScroll} getPage={this.getAll} activePage={this.state.page} changeLimit={this.changeLimit} infinite={this.state.isInifnite} currentLimit={this.state.limit}/>
            <ThingBar getAll={this.getAll} items={this.state.items} limit={this.state.limit} infinite={this.state.isInifnite} scroll={this.getDataScroll}/>
          </>
        ) : (
          <img src={Spinner} alt="spinner" />
        )}
      </div>
    );
  }
}
