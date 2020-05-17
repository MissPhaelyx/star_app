/*jshint esversion: 6 */
import React, {Component} from 'react';

class TemperatureDisplay extends Component{
    constructor(props){
        super(props);
        this.state = {
            temperature: props.temperature,
            temperatureUnit: props.temperatureUnit
        };
    }

    render(){
        return(
            <div className="temperature-display flex flex-rows centre">                        
                <span>{this.props.temperature}{this.props.temperatureUnit}</span>    
            </div>     
        )
    }
}

export default TemperatureDisplay;