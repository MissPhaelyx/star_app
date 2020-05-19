// src/components/conditions.js
/*jshint esversion: 6 */
import React, {Component} from 'react';
import ConditionIcon from './condition-icon.js';
import WindDisplay from './wind-display.js';
import TemperatureDisplay from './temperature-display.js';
import TemperatureExtras from './temperature-extras.js';
import ConditionsExtras from './conditions-extras.js';
import MoonPhase from './moon-phase.js';
import SunDisplay from './sun-display.js';
import DateTimeDisplay from './date-time-display.js';
import ForecastItem from './forecast-item.js';
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class WeatherScreen extends Component{   

    render(){
        const forecastPanel = this.props.forecastItems.map((forecast) => (
            <ForecastItem 
                key={forecast.key} 
                weatherData = {forecast}
                config = {this.props.config}
            />
        ));
        const panelClass = this.props.show ?
            "screen flex flex-columns centre collapse show" :
            "screen flex flex-columns centre collapse hide";
        return(
            <div id="main-panel" className={panelClass}> 
                <button className="button switch-screen-button bottom" onClick={() => this.props.switchScreen("CONFIG")}><FontAwesomeIcon icon={faCog} /></button>
                <button className="button switch-screen-button top" onClick={() => this.props.switchScreen("TODO")}><FontAwesomeIcon icon={faCalendar} /></button>
                <span>{this.props.weatherData.location}</span>
                <div id="date-time-panel" className="panel large-font">
                    <DateTimeDisplay
                        dateTime = {this.props.dateTime}
                        showDay = {true}
                        showDate={true}
                    />
                </div>  
                <div id="weather-panel" className="panel flex flex-columns centre">
                    <ConditionIcon 
                        conditionId = {this.props.weatherData.conditionId} 
                        conditionToolTip = {this.props.weatherData.condition}
                    />                        
                    <TemperatureDisplay
                        temperature = {this.props.weatherData.temp}
                        temperatureUnit = {this.props.config.tempUnit}
                    />                  
                    
                    <div className="flex flex-columns centre small-font">   
                        <WindDisplay
                            windSpeed={this.props.weatherData.windSpeed}
                            windDirection={this.props.weatherData.windDirection}
                            speedUnit={this.props.config.windSpeedUnit}
                        /> 
                        <TemperatureExtras
                            tempUnit = {this.props.config.tempUnit}
                            feelsLike = {this.props.weatherData.feelsLike}
                            temperatureLow = {this.props.weatherData.lowTemp}
                            temperatureHigh = {this.props.weatherData.highTemp}
                        />     
                        <ConditionsExtras
                            humidity = {this.props.weatherData.humidity}
                            pressure = {this.props.weatherData.pressure}                
                            pressureUnit = {this.props.config.pressureUnit}
                        />  
                    </div>
                    <div className="flex flex-rows centre small-font">
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
                <div id="forecast-panel" className="panel flex flex-rows centre forecast tiny-font">
                    {forecastPanel}
                </div>                    
            </div> 
        )
    }
}

export default WeatherScreen;