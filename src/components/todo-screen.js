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
            tasks:[],
            tags:[],
        }
    }

     getTasks(){
        fetch('https://phaepeeeye.herokuapp.com/tasks', {
        method: 'GET'
        })
        .then(res => res.json())
        .then((data) => {
            this.setState({tasks: data});})
        .catch(console.log);
    }

    getTags(){
        fetch('https://phaepeeeye.herokuapp.com/tags', {
        method: 'GET'
        })
        .then(res => res.json())
        .then((data) => {
            this.setState({tags: data});
        })
        .catch(console.log);
    }

    handleSubmit(task){
        fetch('https://phaepeeeye.herokuapp.com/tasks', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task,null,2)
        })
        .then(() => this.getTasks())
        .then(this.setState({activePanel:"list"}))
        .catch(console.log);
    }

    handleDelete(id){
        fetch('https://phaepeeeye.herokuapp.com/tasks/'+id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        })
        .then(() => this.getTasks())
        .catch(console.log);
    }

    handleUpdate(task){
        fetch('https://phaepeeeye.herokuapp.com/tasks/'+task._id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task,null,2)
        })
        .then(() => this.getTasks())
        .catch(console.log);
    }

    componentDidMount(){
        this.getTasks();
        this.getTags();
    }  
   

    activatePanel(panel){
        this.setState({
            activePanel: panel
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
                    onSubmit={(values) => this.handleSubmit(values)} 
                    tags ={this.state.tags}          
                    activePanel = {this.state.activePanel}
                    activatePanel = {(panel) => this.activatePanel(panel)}
                />             
                <TaskTable 
                    tasks ={this.state.tasks}                     
                    tags = {this.state.tags}   
                    activePanel = {this.state.activePanel}
                    activatePanel = {(panel) => this.activatePanel(panel)}
                    onDelete = {(task) => this.handleDelete(task)}
                    onUpdate = {(id) => this.handleUpdate(id)}   
                    switchable = {true}
                    showDate = {true}
                />  
            </div>
        )
    }
}

export default TodoScreen;