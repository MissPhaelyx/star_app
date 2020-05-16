/*jshint esversion: 6 */
import React, {Component} from 'react';

class SunDisplay extends Component{
    constructor(props){
        super(props);
        this.state = {
            isSunSet: props.isSunSet,
            time: props.time
        };
    }

    render(){
        const iconClass = this.props.isSunSet ? 'wi wi-sunset' : 'wi wi-sunrise';
        return(
            <div>
                <i className={iconClass}></i>
                <span id="rise-time">{this.props.time}</span>
            </div>
        )
    }
}

export default SunDisplay;