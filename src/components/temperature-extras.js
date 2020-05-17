/*jshint esversion: 6 */
import React, {Component} from 'react';

class TemperatureExtras extends Component{
    constructor(props){
        super(props);
        this.state = {
            temperatureLow: props.temperatureLow,
            temperatureHigh: props.temperatureHigh,
            feelsLike: props.feelsLike,
            temperatureUnit: props.temperatureUnit
        };
    }

    render(){
        return(
            <div>
                <span>Feels like: {this.props.feelsLike}{this.props.tempUnit} &#9830; </span>
                <span>High: {this.props.temperatureHigh}{this.props.tempUnit} &#9830; </span>
                <span>Low: {this.props.temperatureLow}{this.props.tempUnit}</span>
            </div>   
        )
    }
}

export default TemperatureExtras;