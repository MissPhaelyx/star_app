// src/components/conditions.js
/*jshint esversion: 6 */
import React, {Component} from 'react';
import ConditionIcon from './condition-icon.js';
import WindDisplay from './wind-display.js';
import TemperatureDisplay from './temperature-display.js';
import MoonPhase from './moon-phase.js';
import DateTimeDisplay from './date-time-display.js';
import {isDay,unixToTimeString} from '../lib/util.js';

class ForecastItem extends Component{        

    render(){
        return(
            <div className='forecast-day'>
                <DateTimeDisplay
                    dateTime = {new Date(this.props.weatherData.dateTime*1000)}                    
                    showShortDate = {true}
                /> 
                <ConditionIcon 
                    conditionId = {this.props.weatherData.conditionId} 
                    conditionToolTip = {this.props.weatherData.condition}                       
                    showDayIcon = {isDay(unixToTimeString(this.props.weatherData.dateTime), '05:59:59', '17:59:59' )} 
                />                        
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