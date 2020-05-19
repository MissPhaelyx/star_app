/*jshint esversion: 6 */
import React, {Component} from 'react';
import ConditionIcon from './condition-icon.js';
import TemperatureDisplay from './temperature-display.js';
import DateTimeDisplay from './date-time-display.js';
import {TaskTable, TaskForm} from './tasks.js';
import { faUmbrella, faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TodoScreen extends Component{

    constructor(props){
        super(props);
        this.state = {
            activePanel:"list",
            sortOrder:""
        }
    }

    render(){
        const panelClass = this.props.show ?
            "screen flex flex-columns centre collapse show" :
            "screen flex flex-columns centre collapse hide";
        return(
            <div id="todo-panel" className={panelClass}>
                <button className="button switch-screen-button bottom" onClick={() => this.props.switchScreen("CONFIG")}><FontAwesomeIcon icon={faCog} /></button>
                <button className="button switch-screen-button top" onClick={() => this.props.switchScreen("WEATHER")}><FontAwesomeIcon icon={faUmbrella} /></button>
                <div className="status-small tiny-font flex flex-rows left"> 
                    <DateTimeDisplay
                        dateTime = {this.props.dateTime}
                        showDay = {false}
                        showDate={true}
                    />
                    <ConditionIcon 
                        conditionId = {this.props.weatherData.conditionId} 
                        conditionToolTip = {this.props.weatherData.condition}
                    />                        
                    <TemperatureDisplay
                        temperature = {this.props.weatherData.temp}
                        temperatureUnit = {this.props.config.tempUnit}
                    />     
                </div> 
                <TaskTable 
                    tasks ={this.props.filteredTasks} 
                    onDelete = {(task) => this.handleDelete(task)}
                    onUpdate = {(id) => this.handleUpdate(id)}   
                    onSort = {() => this.handleSort()}
                    onFilter = {(filter) => this.handleFilter(filter)}
                    onSearch = {(search) => this.handleSearch(search)}
                    activePanel = {this.state.activePanel}
                    activatePanel = {(panel) => this.activatePanel(panel)}
                    sortOrder = {this.state.sortOrder}
                    tags = {this.props.tags}
                    onTagFilter = {(tags) => this.handleTagFilter(tags)}
                />  
            </div>
        )
    }
}

export default TodoScreen;