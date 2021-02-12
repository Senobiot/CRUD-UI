import React, { Component } from 'react';
import Image from '../../assets/spinner2.svg'

export class Input extends Component{
    constructor(props){
        super(props);
        this.state = { 
            error: null,
            isLoaded: false,
            items: Array
        }
    }
    componentDidMount() {
        fetch("http://senobiot-things-v1.herokuapp.com/api/v1/things/")
            .then((response) => response.json())
            .then((response) => {
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
            items.map((e, idx) => <div key ={idx}><span>{e.id}</span><span>{e.name}</span></div>)
        )
        if (error) return <div>{`Error: ${error.message}`}</div>;
        return <img src={Image} alt='spinner'/>
    }
}
