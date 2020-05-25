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
            <div className="extra-item">
                <i className={iconClass}></i>
                <span>{this.props.time}</span>
            </div>
        )
    }
}

export default SunDisplay;