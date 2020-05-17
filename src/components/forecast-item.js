// src/components/conditions.js
/*jshint esversion: 6 */
import React, {Component} from 'react';
import ConditionIcon from './condition-icon.js';
import WindDisplay from './wind-display.js';
import TemperatureDisplay from './temperature-display.js';
import MoonPhase from './moon-phase.js';
import DateTimeDisplay from './date-time-display.js';

class ForecastItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            weatherData : props.weatherData,
            config: props.config
        };
    }

    render(){
        return(
            <div className='forecast-day'>
                <DateTimeDisplay
                    dateTime = {new Date(this.props.weatherData.dateTime*1000)}
                    showDay = {true}
                /> 
                <ConditionIcon conditionId = {this.props.weatherData.conditionId} />                        
                <TemperatureDisplay
                    temperature = {this.props.weatherData.temp}
                    temperatureUnit = {this.props.config.tempUnit}
                />                  
                <WindDisplay
                    windSpeed={this.props.weatherData.windSpeed}
                    windDirection={this.props.weatherData.windDirection}
                    speedUnit={this.props.config.windSpeedUnit}
                />                  
                <MoonPhase
                    date = {new Date(this.props.weatherData.dateTime*1000)}
                />
            </div>
        );
    }


}

export default ForecastItem;