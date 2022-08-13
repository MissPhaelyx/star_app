// src/components/contacts.js
/*jshint esversion: 6 */

import React from 'react';

import { TagCheckBox } from './tag';

class TaskForm extends React.Component{    
    constructor(props){
        super(props);
        this.state = {
            content: "",
            due_string:  "",  
            label_ids: []
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
            content: "",
            due_string:  "",
            label_ids: []
        });
    }

    onNameChange = (e) =>{
        this.setState({
            content: e.target.value
        });
    }

    onDueChange = (e) =>{
        this.setState({
            due_string:  e.target.value,
        });
    }

    addTag = (tag) =>{
        var tags = this.state.label_ids;
        tags.push(tag);
        this.setState({
            label_ids: tags
        });
    }

    removeTag = (tag) =>{
        var tags = this.state.label_ids;
        var tagIndex = tags.indexOf(tag);
        if(tagIndex >= 0){
            tags.splice(tagIndex, 1);
        }
        this.setState({
            label_ids: tags
        });
    }

    clearForm = () =>{
         this.props.activatePanel("list");
    }


    render(){
        const minDate = new Date().toISOString().split('T')[0]; 
        const formClasses = this.props.activePanel === "form" ? 'collapse small show tiny-font' : 'collapse small hide small-font'
        return(        
            <div className={formClasses}>
                <form onSubmit={this.submitForm} onReset={this.clearForm}>
                    <div className="form-group">
                        <label htmlFor="taskName">Task Name</label>
                        <input
                            id="taskName"
                            name="name"
                            type="text"                    
                            value={this.state.content}
                            onChange={this.onNameChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dueDate">Due Date</label>
                        <input
                            id="due_string"
                            name="due_string"            
                            value={this.state.due_string}
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

export default TaskForm;