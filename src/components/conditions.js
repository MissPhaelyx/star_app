// src/components/conditions.js
/*jshint esversion: 6 */
import React, {Component} from 'react';
import ConditionIcon from './condition-icon.js';
import WindDisplay from './wind-display.js';
import TemperatureDisplay from './temperature-display.js';
import MoonPhase from './moon-phase.js';
import SunDisplay from './sun-display.js';

class WeatherConditions extends Component{
    constructor(props){
        super(props);
        this.state = {
            weatherData : props.weatherData,
            config: props.config,
            conditionIcon: props.coniditionIcon
        };
    }

    render(){
        return(
            <div id="main-panel" className="panel flex flex-columns centre collapse">         
                <div id="location" className="panel flex flex-rows centre">
                    <span>{this.props.weatherData.location}</span>
                </div>                
                <div id="weather-container" className="panel flex flex-columns centre min">
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
                </div>                
                <div id="time-container" className="panel flex flex-columns centre max">
                    <span className="day"></span>
                    <span className="date"></span>
                    <span className="time"></span>
                </div>  
                <div id="forecast-container" className="panel flex flex-rows centre forecast">
                    
                </div>
                <div id="sun-container" className="panel flex flex-rows centre min">
                    <div id="extras-panel" className="flex flex-columns centre extra">
                        <div>
                            Feels like: <span id="feels-like">{this.props.weatherData.feelsLike}{this.props.config.tempUnit}</span> &#9830;
                            High: <span id="temp-high">{this.props.weatherData.highTemp}{this.props.config.tempUnit}</span> &#9830;
                            Low: <span id="temp-low">{this.props.weatherData.lowTemp}{this.props.config.tempUnit}</span>
                        </div>
                        <div>
                            Humidity: <span id="humidity">{this.props.weatherData.humidity}{this.props.config.humidityUnit}</span> &#9830;
                            Pressure: <span id="pressure">{this.props.weatherData.pressure}{this.props.config.pressureUnit}</span>                                              
                        </div>
                    </div>
                    <MoonPhase
                        date = {new Date()}
                     />
                     <SunDisplay
                        isSunSet = {false}
                        time = {this.props.weatherData.sunriseTime}
                     />
                     <SunDisplay
                        isSunSet = {true}
                        time = {this.props.weatherData.sunsetTime}
                     />                    
                </div>          
            </div> 
        )
    }
}

export default WeatherConditions;