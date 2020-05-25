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
            <>
                <div className="extra-item"><label>Feels like</label><span>{this.props.feelsLike}{this.props.tempUnit}</span></div>
                <div className="extra-item"><label>High</label><span>{this.props.temperatureHigh}{this.props.tempUnit}</span></div>
                <div className="extra-item"><label>Low</label><span>{this.props.temperatureLow}{this.props.tempUnit}</span></div>
            </>   
        )
    }
}

export default TemperatureExtras;