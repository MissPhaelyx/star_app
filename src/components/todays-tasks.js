/*jshint esversion: 6 */
import React, {Component} from 'react';
import TaskTable from './task-table.js';

class TodaysTasks extends Component{

    constructor(props){
        super(props);      
        this.state = {
            tasks:[],
            tags:[],
        }
    }

    getTodaysTasks(){
        fetch('https://phaepeeeye.herokuapp.com/tasks?due_date=' + new Date().toISOString().split('T')[0], {
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

    componentDidMount(){
        this.getTodaysTasks();
        this.getTags();
        console.log("agenda mount");
    }  

    handleDelete(id){
        fetch('https://phaepeeeye.herokuapp.com/tasks/'+id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        })
        .then(() => this.getTodaysTasks())
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
        .then(() => this.getTodaysTasks())
        .catch(console.log);
    }

    render(){
        return(
            <div id="todays-tasks">                         
                <TaskTable 
                    tasks ={this.state.tasks}                     
                    tags = {this.state.tags}                      
                    onDelete = {(task) => this.handleDelete(task)}
                    onUpdate = {(id) => this.handleUpdate(id)}   
                    switchable = {false}
                    showDate = {false}
                />  
            </div>
        )
    }
}

export default TodaysTasks;