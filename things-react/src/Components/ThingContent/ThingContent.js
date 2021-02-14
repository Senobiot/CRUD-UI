import React, { Component } from 'react';
import Spinner from '../../assets/spinner2.svg';
import { cars, pets } from '../../dataKeys/dataKeys';
import './ThingContent.scss';

export class ThingContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carsOptions: [],
      petsOptions: [],
      start: null,
      end: null,
      error: null,
      status: null,
      isLoaded: false,
      reload: false,
      items: null,
    };
  }

  send = React.createRef();
  carsRef = React.createRef();
  petRef = React.createRef();
  tileRef = React.createRef();
  currentEdition = null;
  API_URL = 'http://senobiot-things-v1.herokuapp.com/api/v1/things/';

  getData() {
    fetch(this.API_URL)
      .then((response) => response.json())
      .then((response) => {
        response.sort((a, b) => a.id - b.id);
        this.setState({ items: response });
        this.setState({ isLoaded: true });
        this.setState({ end: new Date().getTime() });
      })
      .catch((error) => {
        this.setState({ false: true });
        this.setState({ error });
      });
  }

  deleteData(e) {
    this.currentEdition = null;
    const id = e.target.getAttribute('data');
    this.setState({ isLoaded: false, error: null, status: null, start: new Date().getTime() });
    fetch(`${this.API_URL}${id}`, { method: 'DELETE' })
      .then((response) => this.getData())
      .then(this.setState({ status: 'Delete data success in' }))
      .then((response) => this.setState({ isLoaded: true }))
      .catch((error) => {
        this.setState({ error: error });
      });
  }

  postData() {
    this.currentEdition = null;
    const car = this.carsRef.current.options[this.carsRef.current.selectedIndex].value;
    const pet = this.petRef.current.options[this.petRef.current.selectedIndex].value;
    this.setState({ isLoaded: false, status: null, error: null, start: new Date().getTime() });

    const data = {
      name: this.send.current.value,
      car: car,
      pet: pet,
    };

    fetch(this.API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          response.json().then((data) => this.setState({ status: data.msg }));
          this.setState({ error: true });
          return;
        }
      })
      .then((response) => this.getData())
      .then(this.setState({ status: 'Post data success in' }))
      .then((response) => this.setState({ isLoaded: true }))
      .catch((error) => {
        this.setState({ error: error });
      });
  }

  putData(e, data = {}) {
    this.setState({ isLoaded: false, status: null, error: null, start: new Date().getTime() });
    const id = e.target.getAttribute('data');

    fetch(`${this.API_URL}${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => this.setState({ isLoaded: true }))
      .then((response) => this.getData())
      .then(this.setState({ status: 'Put data success in' }));
  }

  wrapForbid(event) {
    if (!event.shiftKey && event.which === 13) {
      event.preventDefault();
    }
  }

  carPopup(e) {
    if (e.target.contentEditable === 'true') {
      this.setState({ carsOptions: cars });
      e.target.childNodes[1].className = 'popup active';
    }
  }

  petPopup(e) {
    if (e.target.contentEditable === 'true') {
      this.setState({ petsOptions: pets });
      e.target.childNodes[1].className = 'popup active';
    }
  }

  selectOption(e) {
    if (e.target.tagName === 'OPTION') {
      e.target.parentNode.className = 'popup';
      e.target.parentNode.parentNode.childNodes[0].textContent = e.target.textContent;
    }
  }

  changeData(e) {
    this.setState({ carsOptions: [], petsOptions: [] });

    if (this.currentEdition && this.currentEdition !== e.target.parentNode) {
      this.currentEdition.className = 'thingTile green';
      this.currentEdition.className = 'thingTile green blink';
      this.currentEdition.childNodes[1].focus();
      setTimeout(
        () => (this.currentEdition ? (this.currentEdition.className = 'thingTile green') : null),
        1000,
      );
      return;
    } else {
      this.currentEdition = e.target.parentNode;
      e.target.className = 'sendChangeBtn';
    }

    const parent = e.target.parentNode;
    const nameFileld = e.target.parentNode.childNodes[1];
    const carField = e.target.parentNode.children[3];
    const petField = e.target.parentNode.children[5];

    if (nameFileld.contentEditable === 'true') {
      parent.className = 'thingTile';
      petField.contentEditable = 'inherit';
      carField.contentEditable = 'inherit';
      nameFileld.contentEditable = 'inherit';
      const data = {
        name: nameFileld.textContent,
        car: carField.childNodes[0].textContent,
        pet: petField.childNodes[0].textContent,
      };
      this.currentEdition = null;
      e.target.className = 'changeBtn';
      this.putData(e, data);
    } else {
      parent.className = 'thingTile green';
      petField.contentEditable = 'true';
      carField.contentEditable = 'true';
      nameFileld.contentEditable = 'true';
      nameFileld.focus();
    }
  }

  componentDidMount() {
    this.setState({ status: null, start: new Date().getTime() });
    this.getData();
  }

  render() {
    const { items, isLoaded, error, status, start, end } = this.state;
    return (
      <div className="wrapper">
        <header className="title">Things BE UI Task</header>
        {isLoaded ? (
          <div className="header">
            <input type="search" placeholder="Add new thing name..." ref={this.send}></input>
            <select ref={this.carsRef} defaultValue={'none'}>
              {cars.map((e, idx) => {
                if (idx === 0) {
                  return (
                    <option key={idx} value="none" disabled>
                      Select own car
                    </option>
                  );
                } else {
                  return (
                    <option key={idx} value={e}>
                      {e}
                    </option>
                  );
                }
              })}
            </select>
            <select ref={this.petRef} defaultValue={'none'}>
              {pets.map((e, idx) => {
                if (idx === 0) {
                  return (
                    <option key={idx} value="none" disabled>
                      Select own pet
                    </option>
                  );
                } else {
                  return (
                    <option key={idx} value={e}>
                      {e}
                    </option>
                  );
                }
              })}
            </select>
            <div className="addBtn" onClick={() => this.postData()}></div>
          </div>
        ) : null}
        {isLoaded ? (
          <div className={error ? 'warning' : 'stats'}>
            {!error && !status
              ? `Get data success in ${end - start} ms`
              : !error && status
              ? `${status} ${end - start} ms`
              : 'Warning! ' + status}
          </div>
        ) : null}

        <div className="subWrapper">
          {isLoaded ? (
            items.map((e, idx) => (
              <div key={idx} className={'thingTile'} ref={this.tileRef}>
                <div>{e.id}</div>
                <div onKeyPress={(e) => this.wrapForbid(e)}>{e.name}</div>
                <div>
                  <img
                    className={'carLogo'}
                    alt="carLogo"
                    src={(
                      process.env.PUBLIC_URL +
                      `/cars_icons/${cars.indexOf(e.car.toLowerCase()) !== -1 ? e.car : 'none'}.svg`
                    ).toLowerCase()}
                  />
                </div>
                <div onClick={(e) => this.carPopup(e)} onKeyPress={(e) => this.wrapForbid(e)}>
                  {e.car === 'none' ? '---' : !e.car ? '---' : e.car}
                  <select size="5" className={'popup'} onClick={(e) => this.selectOption(e)}>
                    {this.state.carsOptions.map((e, idx) => (
                      <option key={idx}>{e}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <img
                    className={'petLogo'}
                    alt="petLogo"
                    src={(
                      process.env.PUBLIC_URL +
                      `/animals_icons/${
                        pets.indexOf(e.pet ? e.pet.toLowerCase() : null) !== -1 ? e.pet : 'none'
                      }.svg`
                    ).toLowerCase()}
                  />
                </div>
                <div onClick={(e) => this.petPopup(e)} onKeyPress={(e) => this.wrapForbid(e)}>
                  {e.pet === 'none' ? '---' : !e.pet ? '---' : e.pet}
                  <select size="5" className={'popup'} onClick={(e) => this.selectOption(e)}>
                    {this.state.petsOptions.map((e, idx) => (
                      <option key={idx}>{e}</option>
                    ))}
                  </select>
                </div>
                <div className={'changeBtn'} onClick={(e) => this.changeData(e)} data={e.id}></div>
                <div className={'deleteBtn'} onClick={(e) => this.deleteData(e)} data={e.id}></div>
              </div>
            ))
          ) : (
            <img src={Spinner} alt="spinner" />
          )}
        </div>
      </div>
    );
  }
}
