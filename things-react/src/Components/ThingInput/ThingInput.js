import React, {Component} from 'react';
import { postData } from '../requests/requests'
import { cars, pets } from '../../dataKeys/dataKeys'

export class ThingInput extends Component {
    send = React.createRef();
    carsRef = React.createRef();
    petRef = React.createRef();

    // const handler = () => {
    //         fetch("http://senobiot-things-v1.herokuapp.com/api/v1/things/")
    //         .then((response) => response.json())
    //         .then((response) => {
    //             response.sort((a,b) => a.id - b.id);
    //             context.state.setState({items: response});
    //             context.state.setState({isLoaded: true});
    //         })
    //         .catch((error) => {
    //             context.state.setState({false: true});
    //             context.state.setState({error});
    //         })
    // }


    handlerPost = () => {
        const car = this.carsRef.current.options[this.carsRef.current.selectedIndex].value;
        const pet = this.petRef.current.options[this.petRef.current.selectedIndex].value;
        console.log(this.props.action)

        this.props.state.setState({isLoaded: false})
        
        postData({
            'name': this.send.current.value,
            'car': car,
            'pet': pet})
            .then((data) => {
                console.log(data)})
            .then(this.props.state.setState({isLoaded: true}))
            .then(this.props.action)
    }

    render (){
         return (
        <div className='header'>
            <input type='search' placeholder='Add new thing...' ref={this.send}></input>
            <select ref={this.carsRef}>
                {cars.map((e, idx)=> <option key={idx} value={e}>{e}</option>)}
            </select>
            <select ref={this.petRef}>
                {pets.map((e, idx)=> <option key={idx} value={e}>{e}</option>)}
            </select>
            <div className='addBtn' onClick={() => this.send.current.value ? this.handlerPost() : null}></div>
            <div className='morehBtn'></div>
        </div>
        )
    }  
}