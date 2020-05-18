/*jshint esversion: 6 */
import React, {Component, Fragment} from 'react';

class RadioButtons extends Component{
    constructor(props){
        super(props);
        this.state = {            
            name: props.name,
            options: props.options,
            selectedValue: props.selectedValue,
            handleOptionChange: props.onChange           
        };
    }

    onChange = (e) =>{
        let value = e.target.value;
        this.setState({selectedValue: value});
        this.state.handleOptionChange(value);
    }

    render(){
        return(
            this.props.options.map((option) => (
                <Fragment key={option.key}>
                    <label htmlFor={option.label + '_' + this.state.name}>{option.label}</label>
                    <input 
                        key={option.key}
                        id={option.label + '_' + this.state.name}
                        type="radio" 
                        name={this.state.name}
                        value={option.value}
                        checked={this.state.selectedValue === option.value}
                        onChange={(e) => this.onChange(e)}
                    />
                </Fragment>
            ))
        )
    }    
}

export default RadioButtons;