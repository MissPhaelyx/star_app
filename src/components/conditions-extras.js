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
            <>               
                <div className="extra-item"><label>Humidity</label><span>{this.props.humidity}% </span></div>              
                <div className="extra-item"><label>Pressure</label><span>{this.props.pressure} {this.props.pressureUnit}</span></div>
            </>   
        )
    }
}

export default ConditionsExtras;