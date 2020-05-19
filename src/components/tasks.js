// src/components/contacts.js
/*jshint esversion: 6 */

import React from 'react';

import { faClock } from "@fortawesome/free-solid-svg-icons"; 
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faSortUp } from "@fortawesome/free-solid-svg-icons";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Tag, TagCheckBox } from './tag';

class TaskForm extends React.Component{    
    constructor(props){
        super(props);
        this.state = {
            name: "",
            due_date: new Date().toISOString().split('T')[0],  
            tags: []
        };
    }   

    getTags = () =>{               
        if(this.props.tags){
           return this.props.tags.map((tag) => (
                <TagCheckBox
                    key = {tag._id}
                    tag = {tag}
                    addTag = {(tag) => this.addTag(tag)}
                    removeTag = {(tag) => this.removeTag(tag)}
                    parent = "form"
                />
            ));
        }
        else{
            return <span>no tags</span>;
        }
    }

    submitForm = (e) =>{
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.setState({
            name: "",
            due_date: new Date().toISOString().split('T')[0],
            tags: []
        });
    }

    onNameChange = (e) =>{
        this.setState({
            name: e.target.value
        });
    }

    onDueChange = (e) =>{
        this.setState({
            due_date: e.target.value
        });
    }

    addTag = (tag) =>{
        var tags = this.state.tags;
        tags.push(tag);
        this.setState({
            tags: tags
        });
    }

    removeTag = (tag) =>{
        var tags = this.state.tags;
        var tagIndex = tags.indexOf(tag);
        if(tagIndex >= 0){
            tags.splice(tagIndex, 1);
        }
        this.setState({
            tags: tags
        });
    }

    clearForm = () =>{
         this.props.activatePanel("list");
    }


    render(){
        const minDate = new Date().toISOString().split('T')[0]; 
        const formClasses = this.props.activePanel === "form" ? 'content-panel-form collapse' : 'content-panel-form collapse hide'
        return(        
            <div className={formClasses}>
                <form onSubmit={this.submitForm} onReset={this.clearForm}>
                    <div className="form-group">
                        <label htmlFor="taskName">Task Name</label>
                        <input
                            id="taskName"
                            name="name"
                            type="text"                    
                            value={this.state.name}
                            onChange={this.onNameChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dueDate">Due Date</label>
                        <input
                            id="due_date"
                            name="due_date"
                            type="date"                    
                            value={this.state.due_date}
                            onChange={this.onDueChange}
                            min={minDate}
                        />
                    </div>
                    <div className="form-group">
                        <label>Tags</label>
                        <ul className="tag-list">
                            {this.getTags()}
                        </ul>                         
                    </div>
                    <div className="form-group">
                        <button type="submit">Submit</button>
                        <button type="reset">Cancel</button>
                    </div>
                   
                </form>
            </div>
        )
    }
}

class TaskRow extends React.Component{
    constructor(props){
        super(props);
        this.state = this.props.task;         
    }

    onDelete = (e) =>{
        this.props.onDelete(this.state._id);      
    }

    doUpateStatus = (status) =>{
        let task = {
            "_id": this.state._id,
            "name": this.state.name,
            "Create_date": this.state.Create_date,
            "status": [status]
        }

        this.props.onUpdate(task);

        this.setState(task);  
    }

    getTags = () =>{        
        if(this.props.tags){
           return this.props.tags.map((tag, i) => (
                <Tag
                    key = {i}
                    name = {tag}
                />
            ));
        }
        else{
            return <span>no tags</span>;
        }
    }

    render(){
        return(                       
            <tr>
                <td width="45%" align="left">{this.props.task.name}</td>
                <td width="20%" align="left">{this.getTags()}</td>
                <td width="10%">{this.props.task.status}</td>
                <td width="10%">{this.props.task.due_date}/>
                </td>
                <td className='button-column' width="15%">
                    <button title="start task" className="action-button" type="button" onClick={() => this.doUpateStatus("ongoing")}><FontAwesomeIcon icon={faClock} /></button>
                    <button title="complete task" className="action-button" type="button" onClick={() => this.doUpateStatus("completed")}><FontAwesomeIcon icon={faCheck} /></button>
                    <button title="delete task" className="action-button" type="button" onClick={() => this.onDelete()}><FontAwesomeIcon icon={faTimes} /></button>
                </td>
            </tr>
        )
    }
}

class TaskTable extends React.Component{    

    sortDateDescending(a,b) 
    {
        return new Date(b.due_date) - new Date(a.due_date);
    }

    sortDateAscending(a,b){
        return new Date(a.due_date) - new Date(b.due_date);
    }

    getTags = () =>{        
        if(this.props.tags){
           return this.props.tags.map((tag) => (
                <TagCheckBox
                    key = {tag._id}
                    tag = {tag}
                    addTag = {(tag) => this.addTag(tag)}
                    removeTag = {(tag) => this.removeTag(tag)}
                    parent = 'list'
                />
            ));
        }
    }

    onSort = () =>{
        
        ;
    }

    onFilter = (e) =>{
        let filter = e.target.value;
        this.props.onFilter(filter);        
    }

    submitSearch = (e) =>{
        e.preventDefault();
        let search = e.target[0].value;
        this.props.onSearch(search);
    }

    resetSearch = (e) => {
        this.props.onSearch("");
    }

    onAddNew = (e) => {
        this.props.activatePanel("form");
    }

    addTag = (tag) =>{
        var tags = this.state.tags;
        tags.push(tag);
        this.setState({
            tags: tags
        });

        this.props.onTagFilter(tags);
    }

    removeTag = (tag) =>{
        var tags = this.state.tags;
        var tagIndex = tags.indexOf(tag);
        if(tagIndex >= 0){
            tags.splice(tagIndex, 1);
        }
        this.setState({
            tags: tags
        });

        this.props.onTagFilter(tags);
    }
     
    render(){       
        const toolRowClasses = 'content-panel-table table-tools-row'
        const tableClasses = 'table table-striped'
        const listClasses= this.props.activePanel === "list" ? 'collapse small show small-font' : 'collapse small hide small-font'
        const taskRows = this.props.tasks.map((task) => (
            <TaskRow 
                key={task._id} 
                task={task}
                onDelete={(id) => this.props.onDelete(id)}
                onUpdate={(task) => this.props.onUpdate(task)}
                tags={task.tags}
            />
        ))
        return(
            <div className={listClasses}>
                <div className={toolRowClasses}>
                    <div className="tools-wrapper">
                        <div className="form-group">
                            <button type="button" onClick={(e) => this.onAddNew(e)}>Add New <FontAwesomeIcon icon={faPlus} /></button>
                        </div>
                        <div className="form-group">                  
                            <ul className="tag-list">
                                {this.getTags()}
                            </ul>                         
                        </div>
                        <div className="form-group">
                            <label htmlFor="status-select">Status</label>
                            <select id="status-select" onChange={(e) => this.onFilter(e)}>
                                <option value="All">All</option>
                                <option value="pending">Pending</option>
                                <option value="ongoing">On going</option>
                                <option value="completed">Completed</option>
                            </select> 
                        </div>
                        <div className="form-group">
                            <form onSubmit={this.submitSearch} onReset={this.resetSearch}>
                                <label htmlFor="search-textbox">Search</label>
                                <input type="text" id="search-textbox" />
                                <button type="submit" >Search <FontAwesomeIcon icon={faSearch} /></button>
                                <button type="reset" >Clear</button>
                            </form>
                        </div>
                        
                    </div>
                </div>        
                <div className="content-panel-table">                  
                    <div className="table-responsive-xl"> 
                        <table className={tableClasses}>            
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Tags</th>
                                    <th>Status</th>
                                    <th>Due <button className="sortButton" onClick={() => this.props.onSort()}><FontAwesomeIcon icon={this.props.sortOrder === "asc" ? faSortUp : faSortDown} /></button></th>
                                    <th></th>
                                </tr>                
                            </thead>
                            <tbody>        
                                {taskRows}
                            </tbody>
                            <tfoot>
                               <tr>
                               <td>Task count: {taskRows.length}</td>
                               </tr>
                            </tfoot>
                        </table>  
                    </div>      
                            
                </div>
            </div>
        )
    }
}

export {
    TaskTable,
    TaskForm
}