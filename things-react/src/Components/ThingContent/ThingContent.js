import React, { Component } from 'react';
import Spinner from '../../assets/spinner2.svg';
import { ThingInput } from '../ThingInput/ThingInput';
import { getData } from '../requests/requests'
import './ThingContent.scss'

export class ThingContent extends Component{
    constructor(props){
        super(props);
        this.state = { 
            start: null,
            end: null,
            error: null,
            status: null,
            isLoaded: false,
            reload: false,
            items: null
        };     
    }

    API_URL = 'http://senobiot-things-v1.herokuapp.com/api/v1/things/';

    handler () {
        // getData
        // .then((response) => {
        //     response.sort((a,b) => a.id - b.id);
        //         this.setState({items: response});
        //         this.setState({isLoaded: true});
        // })
        // .catch((error) => {
        //     this.setState({false: true});
        //     this.setState({error});
        // })
    }

    // async postData(url = '', data = {}) {
    //     const response = await fetch(url, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'

    //       },
    //       body: JSON.stringify(data) 
    //     });
    //     return await response.json();
    //   }

    getData() {
        this.state.start = (new Date()).getTime();
        fetch(this.API_URL)
            .then((response) => response.json())
            .then((response) => {
                response.sort((a,b) => a.id - b.id);
                    this.setState({items: response});
                    this.setState({isLoaded: true});
                    this.setState({end: (new Date()).getTime()});
            })
            .catch((error) => {
                this.setState({false: true});
                this.setState({error});
            })
      }

      async deleteData(url = '') {
        const response = await fetch(url, {
          method: 'DELETE',
        });
        return await response.json();
      }
      
      handlerDelete(e) {
        const id = e.target.getAttribute('data');
        this.setState({isLoaded: false})
        this.deleteData(`http://senobiot-things-v1.herokuapp.com/api/v1/things/${id}`).then((data) => {
         }).then(response => this.setState({isLoaded: true})).then(response => this.handler())
    }

    // handlerPost() {
    //     const car = this.carsRef.current.options[this.carsRef.current.selectedIndex].value;
    //     const pet = this.petRef.current.options[this.petRef.current.selectedIndex].value;
    //     this.setState({isLoaded: false})
    //     this.postData("http://senobiot-things-v1.herokuapp.com/api/v1/things/", {
    //         'name': this.send.current.value,
    //         'car': car,
    //         'pet': pet}).then((data) => {
    //         console.log(data); 
    //      }).then(response => this.setState({isLoaded: true})).then(response => this.handler())
    // }

    componentDidMount() {
        this.getData();
    }
    
    render (){
        const { items, isLoaded, error, status, start, end } = this.state;
        if (isLoaded) return (
            <div className='wrapper'>
                {/* <div className='header'>
                    <input type='search' placeholder='Add new thing...' ref={this.send}></input>
                    <select ref={this.carsRef}>
                        {cars.map((e, idx)=> <option key={idx} value={e}>{e}</option>)}
                    </select>
                    <select ref={this.petRef}>
                        {pets.map((e, idx)=> <option key={idx} value={e}>{e}</option>)}
                    </select>
                    <div className='addBtn' onClick={() => this.send.current.value ? this.handlerPost() : null}></div>
                    <div className='morehBtn' onClick={() => this.handler()}></div>
                </div> */}
                <ThingInput state={this} action={this.getData} />
                <div className='subWrapper'>
                    {
                    items.map((e, idx) => <div key ={idx} className={'thingTile'}>
                        <div>{e.id}</div>
                        <div>{e.name}</div>
                        <div>
                            <img className={'carLogo'} src={process.env.PUBLIC_URL + `/cars_icons/${e.car ? e.car : 'none'}.svg`}/>
                        </div>
                        <div>{e.car}</div>
                        <div>
                            <img className={'petLogo'} src={process.env.PUBLIC_URL + `/animals_icons/${e.pet ? e.pet : 'none'}.svg`}/>
                        </div>
                        <div>{e.pet}</div>
                        <div className={'changeBtn'} onClick={e => this.getData()}></div>
                        <div className={'deleteBtn'} onClick={(e) => this.handlerDelete(e)} data={e.id}></div>
                    </div>)
                }
                </div>
                <div>
                    {
                      (!error && !status) ? `Getting data success in ${end - start} ms` : (!error && status) ? status : ''
                    }
                </div>
            </div>
        )
        if (error) return <div>{`Error: ${error.message}`}</div>;
        return <img src={Spinner} alt='spinner'/>
    }
}
