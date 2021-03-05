import React, { Component } from 'react';
import { Spinner } from '/';
import { Header } from '/';
import { StatusBar } from '/';
import { Paginator } from '/';
import { ThingBar } from '/';
import './App.scss';
import { connect } from 'react-redux';
import { getRequest, postRequest, deleteRequest, putRequest } from '/';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInifnite: false,
      status: this.props.msg,
    };
    this.getAll = this.getAll.bind(this);
    this.changeLimit = this.changeLimit.bind(this);
    this.infniteScroll = this.infniteScroll.bind(this);
    this.getDataScroll = this.getDataScroll.bind(this);
  }

  changeLimit(newLimit) {
    this.setState({ limit: newLimit });
  }

  infniteScroll() {
    this.setState({ isInifnite: !this.state.isInifnite });
  }

  async getDataScroll() {
    if (this.state.items.length >= this.state.dbSize) {
      return;
    }
    await this.props.getRequest(this.state.scrollPage + 1);

    this.props.data.splice(-1, 1);

    this.setState({
      items: this.state.items.concat(this.props.data),
      scrollPage: this.state.scrollPage + 1,
    });
  }

  async getAll(external, msg, error, page = 1, restart) {
    if (this.props.error) {
      this.setState({ status: this.props.error, error: true });
      // return;
    }
    this.setState({ page: page, isLoaded: false });
    const startTime = external ? external : new Date().getTime();

    await this.props.getRequest(page, restart ? 10 : this.state.limit);

    if (error) {
      this.setState({ isLoaded: true, error: true, status: error });
      return;
    }

    let response = this.props.data;
    const { CollectionSize } = response.splice(-1, 1)[0];
    this.setState({
      dbSize: CollectionSize,
      isLoaded: this.props.isLoaded,
      items: response,
      status: msg ? msg : 'Get data success in',
      start: startTime,
      end: new Date().getTime(),
      error: false,
      editMode: false,
      currEdit: null,
      scrollPage: 1,
    });
  }

  async componentDidMount() {
    await this.getAll();
  }

  componentDidUpdate(prevProps) {
    if (this.props.error !== prevProps.error) {
      this.setState({ error: this.props.error, status: this.props.error });
    }
  }

  render() {
    return (
      <div className="wrapper">
        <header className="title">Things BE UI Task</header>
        {this.state.isLoaded ? (
          <>
            <Header
              postRequest={this.props.postRequest}
              getAll={this.getAll}
              error={this.state.error}
            />
            <StatusBar state={this.state} />
            <Paginator
              size={this.state.dbSize}
              infniteScroll={this.infniteScroll}
              getPage={this.getAll}
              activePage={this.state.page}
              changeLimit={this.changeLimit}
              infinite={this.state.isInifnite}
              currentLimit={this.state.limit}
            />
            <ThingBar
              getAll={this.getAll}
              items={this.state.items}
              limit={this.state.limit}
              deleteRequest={this.props.deleteRequest}
              putRequest={this.props.putRequest}
              infinite={this.state.isInifnite}
              scroll={this.getDataScroll}
              error={this.state.error}
            />
          </>
        ) : (
          <img src={Spinner} alt="spinner" />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ data = [], isLoaded = false, error = '' }) => ({
  data,
  error,
  isLoaded,
});

export default connect(mapStateToProps, { getRequest, postRequest, deleteRequest, putRequest })(
  App,
);
