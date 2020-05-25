/*jshint esversion: 6 */
import React, {Component} from 'react';

class MoonPhase extends Component{
    constructor(props){
        super(props);
        this.state = {
            date: props.date
        };
    }

    getPhase(){
        var year = this.props.date.getFullYear(),
            month = this.props.date.getMonth(),
            date = this.props.date.getDate(),
            c,e,jd,b;

        if (month < 3) {
            year--;
            month += 12;
        }

        month++;

        c = 365.25 * year;
        e = 30.6 * month;
        jd = c + e + date - 694039.09;
        jd /= 29.5305882;
        b = parseInt(jd);
        jd -= b;
        b = Math.round(jd * 8);               

        if (b >= 8 ) {
            b = 0;
        }

        switch (b) {
            case 0:
                return {"icon":"wi-moon-new", "tooltip":"New Moon"};
            case 1:
                return {"icon":"wi-moon-waxing-crescent-2", "tooltip":"Waxing Crescent"};
            case 2:
                return {"icon":"wi-moon-first-quarter", "tooltip":"First Quarter"};
            case 3:
                return {"icon":"wi-moon-waxing-gibbous-2", "tooltip":"Waxing Gibbous"};
            case 4:
                return {"icon":"wi-moon-full", "tooltip":"Full Moon"};
            case 5:
                return {"icon":"wi-moon-waning-gibbous-2", "tooltip":"Waning Gibbous"};
            case 6:
                return {"icon":"wi-moon-third-quarter", "tooltip":"Third Quarter"};
            case 7:
                return {"icon":"wi-moon-waning-crescent-2", "tooltip":"Waning Crescent"};
            default:
                console.log('Error');
        }
    }
    
    render(){
        const phase = this.getPhase();
        const iconClass = "moon wi " + phase.icon;

        return(           
            <div className="extra-item">
                <i className={iconClass} title={phase.tooltip}></i>
            </div>
            
        )
    }
}

export default MoonPhase;