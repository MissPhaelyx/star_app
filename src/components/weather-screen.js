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
import TaskTable from './task-table.js';
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {isDay, getTimeString} from '../lib/util.js';

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
                    />
                </div>  
                <div id="today-panel" className="panel flex flex-rows centre">                    
                    <div id="weather-panel" className="half-panel flex flex-columns centre">                
                        <ConditionIcon 
                            conditionId = {this.props.weatherData.conditionId} 
                            conditionToolTip = {this.props.weatherData.condition}
                            showDayIcon = {isDay(getTimeString(this.props.dateTime), this.props.weatherData.sunriseTime, this.props.weatherData.sunsetTime)}
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
                        </div>
                        <div className="flex flex-rows centre small-font extra-display">
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
                        <div className="flex flex-rows centre small-font  extra-display">
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
                    {this.props.tasks.length > 0 &&
                        <div id="todays-tasks" className="half-panel flex flex-columns centre">                         
                            <TaskTable 
                                tasks ={this.props.tasks}                     
                                tags = {this.props.tags}                      
                                onDelete = {(task) => this.props.handleDelete(task)}
                                onUpdate = {(id) => this.props.handleUpdate(id)}                                   
                                onComplete = {(id) => this.props.handleComplete(id)}
                                onSelected = {(id) => this.props.handleSelect(id)}
                                switchable = {false}
                                showDate = {false}
                                showHeader = {false}
                            />  
                        </div>
                    }
                </div>
                <div id="forecast-panel" className="panel flex flex-rows centre forecast tiny-font">
                    {forecastPanel}
                </div>                    
            </div> 
        )
    }
}

export default WeatherScreen;