/*jshint esversion: 6 */
import React, {Component} from 'react';
import RadioButtons from './radio-buttons.js';
import ColourPicker from './colour-picker.js';
import DropDown from './dropdown.js';
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ConfigScreen extends Component{   

    onColourSchemeChange(scheme){
        this.setState({colourScheme:scheme});
        this.props.setColourScheme(scheme);
    }

    onStaticColourChange(colour){
        this.setState({staticColour: colour});
        this.props.setStaticColour(colour);
    }

    onCountryChange(country){
        this.setState({selectedCountry:country});
        this.props.setCountry({country});
    }

    onCityChange(city){
        this.setState({selecteCity:city});
        this.props.setCity({city});
    }

    render(){
        const panelClass = this.props.show ?
            "screen flex flex-columns centre collapse show" :
            "screen flex flex-columns centre collapse hide";
        return(
            <div id="config-panel" className={panelClass}>                
                <div className="panel flex flex-columns centre min">
                    <span>Colour Scheme</span> 
                    <div className="flex flex-rows centre min small-font">
                        <RadioButtons                            
                            name = "colour-scheme-radio"
                            options = {[
                                        {key: "colour-scheme-radio-1", label: "Dynamic", value: "1"},
                                        {key: "colour-scheme-radio-2", label: "Static", value: "2"}
                                      ]}
                            selectedValue = {this.props.config.colourScheme}
                            onChange = {(scheme) => this.onColourSchemeChange(scheme)}
                        />                        
                    </div> 
                </div>
                <div className="panel flex flex-columns centre min"> 
                    <span>Static Colour</span> 
                    <ColourPicker
                        selectedValue={this.props.config.staticColour}
                        onChange = {(colour) => this.onStaticColourChange(colour)}
                        className = "colour-picker"
                    />               
                </div>   
                <button id="save-config" className="button" onClick={() => this.props.switchScreen(this.props.previousScreen)}><FontAwesomeIcon icon={faSave} /></button>                
            </div>
        )
    }
}

export default ConfigScreen;