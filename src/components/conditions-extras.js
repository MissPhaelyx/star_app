/*jshint esversion: 6 */
import React, {Component} from 'react';

class ConditionsExtras extends Component{
    constructor(props){
        super(props);
        this.state = {
            humidity: props.humidity,
            pressure: props.pressure,
            pressureUnit: props.pressureUnit,
        };
    }

    render(){
        return(
            <div>               
                <span>Humidity: {this.props.humidity}% &#9830; </span>                
                <span>Pressure: {this.props.pressure} {this.props.pressureUnit}</span>                                     
            </div>   
        )
    }
}

export default ConditionsExtras;