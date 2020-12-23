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

class TaskTable extends React.Component{   

    constructor(props){
        super(props);
        this.state = {            
            sortOrder:"asc",
            searchParam:"",
            filterParam: "All",
            filterTags:[]
        };
    }  

    sortDateDescending(a,b) 
    {
        return new Date(b.due_date) - new Date(a.due_date);
    }

    sortDateAscending(a,b){
        return new Date(a.due_date) - new Date(b.due_date);
    }    

    onSort = (e) =>{
        if(this.state.sortOrder === "asc"){
            this.setState({sortOrder: "dsc"});
        }
        else{
            this.setState({sortOrder: "asc"});
        }
    }
    
    onFilter = (e) =>{
        let filterParam = e.target.value;
        this.setState({filterParam: filterParam});       
    };

    onSearch = (e) =>{
        e.preventDefault();
        let search = e.target[0].value;
        this.setState({searchParam: search}); 
    };

    onReset = (e) =>{
        this.setState({searchParam: ""}); 
    };

    onAddTag = (e) =>{
        var tags = this.state.filterTags;
        tags.push(e);
        this.setState({filterTags: tags}); 
    }

    onRemoveTag = (e) =>{
        var tags = this.state.filterTags;
        var tagIndex = tags.indexOf(e);
        if(tagIndex >= 0){
            tags.splice(tagIndex, 1);
        }
        this.setState({filterTags: tags}); 
    }   

    onAddNew = (e) => {
        this.props.activatePanel("form");
    }

    getTaskRows(){
        let tasksClone = this.props.tasks.slice();

        if(this.state.filterParam !== "All"){
            tasksClone = tasksClone.filter(a => a.status.indexOf(this.state.filterParam) >= 0);
        }

        if(this.state.searchParam){
            tasksClone = tasksClone.filter(a => a.name.includes(this.state.searchParam));
        }

        if(this.state.filterTags.length){
            tasksClone = tasksClone.filter(a => (a.tags.filter(value => this.state.filterTags.includes(value))).length > 0);
        }

        if(this.state.sortOrder === "asc"){
            tasksClone.sort((a,b) => this.sortDateAscending(a,b)); 
        }
        else{
            tasksClone.sort((a,b) => this.sortDateDescending(a,b)); 
        }

        return tasksClone.map(task =>         
            <TaskRow 
                key={task._id} 
                task={task}
                onDelete={(id) => this.props.onDelete(id)}
                onUpdate={(task) => this.props.onUpdate(task)}
                tags={task.tags}                
                showDate = {this.props.showDate}
            />
        );
    }
     
    render(){   

        let toolRowClasses = 'hide';
        const tableClasses = 'table table-striped';
        let listClasses = 'tiny-font fill-width';

        if(this.props.switchable){
            listClasses = this.props.activePanel === "list" ? 'collapse small show tiny-font fill-width' : 'collapse small hide tiny-font fill-width';
            toolRowClasses = 'content-panel-table table-tools-row'
        }

        const tagSelectors = this.props.tags.map(tag => 
            <TagCheckBox
                key = {tag._id}
                tag = {tag}
                addTag = {(tag) => this.onAddTag(tag)}
                removeTag = {(tag) => this.onRemoveTag(tag)}
                parent = "table"
            />
        )    

        return(
            <div className={listClasses}>
                <div className={toolRowClasses}>
                    <div className="tools-wrapper">
                        <div className="form-group">
                            <button type="button" onClick={(e) => this.onAddNew(e)}>Add New <FontAwesomeIcon icon={faPlus} /></button>
                        </div>
                        <div className="form-group">                  
                            <ul className="tag-list">
                                {tagSelectors}
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
                            <form onSubmit={this.onSearch} onReset={this.onReset}>
                                <label htmlFor="search-textbox">Search</label>
                                <input type="text" id="search-textbox" />
                                <button type="submit" >Search <FontAwesomeIcon icon={faSearch} /></button>
                                <button type="reset" >Clear</button>
                            </form>
                        </div>
                        
                    </div>
                </div>        
                <div className="flex flex-columns centre"> 
                    <table className={tableClasses}>
                        {this.props.showHeader === true &&         
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Tags</th>
                                    <th>Status</th>
                                    {this.props.showDate ? <th>Due <button className="sortButton" onClick={() => this.onSort()}><FontAwesomeIcon icon={this.state.sortOrder === "asc" ? faSortUp : faSortDown} /></button></th> : <td></td>}
                                    <th></th>
                                </tr>                
                            </thead>
                        }
                        <tbody>        
                            {this.getTaskRows()}
                        </tbody>                            
                    </table>  
                </div>
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
            "tags": this.state.tags,
            "due_date": this.state.due_date,
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
                <td>{this.props.task.name}</td>
                <td>{this.getTags()}</td>
                <td>{this.props.task.status}</td>
                {this.props.showDate ? <td>{this.props.task.due_date.split('T')[0]}</td> : <td></td>}
                <td className='button-column'>
                    <button title="start task" className="action-button" type="button" onClick={() => this.doUpateStatus("ongoing")}><FontAwesomeIcon icon={faClock} /></button>
                    <button title="complete task" className="action-button" type="button" onClick={() => this.doUpateStatus("completed")}><FontAwesomeIcon icon={faCheck} /></button>
                    <button title="delete task" className="action-button" type="button" onClick={() => this.onDelete()}><FontAwesomeIcon icon={faTimes} /></button>
                </td>
            </tr>
        )
    }
}

export default TaskTable