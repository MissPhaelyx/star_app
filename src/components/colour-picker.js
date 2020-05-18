/*jshint esversion: 6 */
import React, {Component} from 'react';

class ColourPicker extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedValue : props.selectedValue
        };
    }

    onChange = (e) =>{
        let value = e.target.value;
        this.setState({selectedValue: value});
        this.props.onChange(value);
    }

    render(){
        return(            
            <div className="colour-input-container">
                <input type="color" className={this.props.className} value={this.state.selectedValue} onChange={(e) => this.onChange(e)}/>  
            </div>
        )
    }
}

export default ColourPicker;
