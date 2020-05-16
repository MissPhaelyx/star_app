/*jshint esversion: 6 */
import React, {Component} from 'react';
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class WindDisplay extends Component{
    constructor(props){
        super(props);
        this.state = {
            windSpeed: props.windSpeed,
            windDirection: props.windDirection,
            speedUnit: props.speedUnit
        };
    }

    render(){
        return(
            <div id="wind-panel" className="flex flex-rows centre">
                <FontAwesomeIcon icon={faArrowDown} transform={{rotate : this.props.windDirection}}/>
                <span id="wind-speed">{this.props.windSpeed}{this.props.speedUnit}</span>   
            </div>        
        )
    }
}

export default WindDisplay;