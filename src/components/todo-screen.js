/*jshint esversion: 6 */
import React, {Component} from 'react';
import ConditionIcon from './condition-icon.js';
import TemperatureDisplay from './temperature-display.js';
import DateTimeDisplay from './date-time-display.js';
import TaskTable from './task-table.js';
import TaskForm from './task-form.js';
import { faUmbrella, faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TodoScreen extends Component{

    constructor(props){
        super(props);      
        this.state = {
            activePanel:"list",   
            currentTask:props.currentTask         
        };
    }   

    doSelectTask(id){
        this.props.handleSelect(id);        
        this.activatePanel('form');
    }

    activatePanel(panel){
        this.setState({
            activePanel: panel
        });
    }

    doSubmit(){
        let task = this.props.currentTask;
        if(task.id === 0){
            this.props.handleSubmit(task);
        }
        else{
            this.props.handleUpdate(task);
        }
        this.setState({
            activePanel:"list"
        });
    }

    render(){
        const panelClass = this.props.show ?
            "screen flex flex-columns centre collapse show" :
            "screen flex flex-columns centre collapse hide";
        return(
            <div id="todo-panel" className={panelClass}>
                <button className="button switch-screen-button bottom" onClick={() => this.props.switchScreen("CONFIG")}><FontAwesomeIcon icon={faCog} /></button>
                <button className="button switch-screen-button top" onClick={() => this.props.switchScreen("WEATHER")}><FontAwesomeIcon icon={faUmbrella} /></button>
                <div className="status-small tiny-font flex flex-rows centre"> 
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
                <TaskForm
                    onSubmit={(task) => this.doSubmit(task) } 
                    tags ={this.props.tags}          
                    activePanel = {this.state.activePanel}
                    activatePanel = {(panel) => this.activatePanel(panel)}
                    currentTask = {this.props.currentTask}
                />             
                <TaskTable 
                    tasks ={this.props.tasks}                     
                    tags = {this.props.tags}   
                    activePanel = {this.state.activePanel}
                    activatePanel = {(panel) => this.activatePanel(panel)}
                    onDelete = {(task) => this.props.handleDelete(task)}
                    onUpdate = {(id) => this.props.handleUpdate(id)}   
                    onComplete = {(id) => this.props.handleComplete(id)}
                    onSelected = {(id) => this.doSelectTask(id)}
                    switchable = {true}
                    showDate = {true}
                    showHeader = {true}
                />  
            </div>
        )
    }
}

export default TodoScreen;