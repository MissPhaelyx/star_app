/*jshint esversion: 6 */
import React, {Component} from 'react';

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
        const arrowTransform = {
            transform: 'rotate('+this.props.windDirection +'deg)'
        }
        return(
            <div className="flex flex-columns centre">
                <i className='wi wi-direction-down' style={arrowTransform}></i>                
                <span>{this.props.windSpeed}{this.props.speedUnit}</span>   
            </div>        
        )
    }
}

export default WindDisplay;