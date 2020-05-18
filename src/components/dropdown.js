/*jshint esversion: 6 */
import React, {Component} from 'react';

class DropDown extends Component{

    constructor(props){
        super(props);
        this.state =
        {
            selectedValue : props.selectedValue
        }
    }

    onChange = (e) => {
        let selectedCountry = e.target.value;
        console.log(selectedCountry);
        this.setState({
            selectedValue: selectedCountry
        });

        this.props.handleChange(selectedCountry);
    }

    render(){
        const items = this.props.items.map((item) => (
            <option key={item._id} value={item.value}>{item.label}</option>
        ));
        return(
            <select className={this.props.className} key={this.props.id} id={this.props.id} value={this.state.selectedValue} onChange={(e) => this.onChange(e)}>
                {items}
            </select>
        )
    }
}

export default DropDown;