import React, { Component } from 'react';
import Spinner from '../../assets/spinner2.svg'
import './ThingContent.scss'

export class ThingContent extends Component{
    constructor(props){
        super(props);
        this.state = { 
            error: null,
            isLoaded: false,
            reload: false,
            items: null
    }
}

    send = React.createRef()

    handler () {
            fetch("http://senobiot-things-v1.herokuapp.com/api/v1/things/")
            .then((response) => response.json())
            .then((response) => {
                response.sort((a,b) => a.id - b.id);
                    this.setState({items: response});
                    this.setState({isLoaded: true});
            })
            .catch((error) => {
                this.setState({false: true});
                this.setState({error});
            })
    }

    async postData(url = '', data = {}) {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'

          },
          body: JSON.stringify(data) 
        });
        return await response.json();
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
            console.log(data); 
         }).then(response => this.setState({isLoaded: true})).then(response => this.handler())
    }

    handlerPost() {
        this.setState({isLoaded: false})
        this.postData("http://senobiot-things-v1.herokuapp.com/api/v1/things/", {'name': this.send.current.value}).then((data) => {
            console.log(data); 
         }).then(response => this.setState({isLoaded: true})).then(response => this.handler())
    }

    componentDidMount() {
        fetch("http://senobiot-things-v1.herokuapp.com/api/v1/things/")
            .then((response) => response.json())
            .then((response) => {
                response.sort((a,b) => a.id - b.id);
                    this.setState({items: response});
                    this.setState({isLoaded: true});
            })
            .catch((error) => {
                this.setState({false: true});
                this.setState({error});
            })
    }
    
    render (){
        const { items, isLoaded, error } = this.state;
        if (isLoaded) return (
            <div className='wrapper'>
                <div className='header'>
                    <input type='search' placeholder='Add new thing...' ref={this.send}></input>
                    <div className='addBtn' onClick={() => this.send.current.value ? this.handlerPost() : null}></div>
                    <div className='refreshBtn' onClick={() => this.handler()}></div>
                </div>
                <div className='subWrapper'>
                    {
                    items.map((e, idx) => <div key ={idx} className={'thingTile'}>
                        <div>{e.id}</div>
                        <div>{e.name}</div>
                        <div>{e.car}</div>
                        <div>{e.pet}</div>
                        <div className={'changeBtn'}></div>
                        <div className={'deleteBtn'} onClick={(e) => this.handlerDelete(e)} data={e.id}></div>
                    </div>)
                }
                </div>
                
            </div>
        )
        if (error) return <div>{`Error: ${error.message}`}</div>;
        return <img src={Spinner} alt='spinner'/>
    }
}
