/*jshint esversion: 6 */
import React, {Component} from 'react';
var iconCollection = [
    {"ConditionId": 200, "DayIcon": "wi-day-storm-showers", "NightIcon" : "wi-night-alt-storm-showers"},
    {"ConditionId": 201, "DayIcon": "wi-day-thunderstorm", "NightIcon" : "wi-night-alt-thunderstorm"},
    {"ConditionId": 202, "DayIcon": "wi-day-thunderstorm", "NightIcon" : "wi-night-alt-thunderstorm"},
    {"ConditionId": 210, "DayIcon": "wi-day-thunderstorm", "NightIcon" : "wi-night-alt-thunderstorm"},
    {"ConditionId": 211, "DayIcon": "wi-day-thunderstorm", "NightIcon" : "wi-night-alt-thunderstorm"},    
    {"ConditionId": 212, "DayIcon": "wi-day-thunderstorm", "NightIcon" : "wi-night-alt-thunderstorm"},   
    {"ConditionId": 221, "DayIcon": "wi-day-thunderstorm", "NightIcon" : "wi-night-alt-thunderstorm"},   
    {"ConditionId": 230, "DayIcon": "wi-day-storm-showers", "NightIcon" : "wi-night-alt-storm-showers"},    
    {"ConditionId": 231, "DayIcon": "wi-day-storm-showers", "NightIcon" : "wi-night-alt-storm-showers"},    
    {"ConditionId": 232, "DayIcon": "wi-day-storm-showers", "NightIcon" : "wi-night-alt-storm-showers"},
    {"ConditionId": 300, "DayIcon": "wi-day-sprinkle", "NightIcon" : "wi-night-alt-sprinkle"},
    {"ConditionId": 301, "DayIcon": "wi-day-sprinkle", "NightIcon" : "wi-night-alt-sprinkle"},
    {"ConditionId": 302, "DayIcon": "wi-day-sprinkle", "NightIcon" : "wi-night-alt-sprinkle"},
    {"ConditionId": 310, "DayIcon": "wi-day-sprinkle", "NightIcon" : "wi-night-alt-sprinkle"},    
    {"ConditionId": 311, "DayIcon": "wi-day-sprinkle", "NightIcon" : "wi-night-alt-sprinkle"},   
    {"ConditionId": 312, "DayIcon": "wi-day-sprinkle", "NightIcon" : "wi-night-alt-sprinkle"},   
    {"ConditionId": 313, "DayIcon": "wi-day-sprinkle", "NightIcon" : "wi-night-alt-sprinkle"},    
    {"ConditionId": 314, "DayIcon": "wi-day-sprinkle", "NightIcon" : "wi-night-alt-sprinkle"},    
    {"ConditionId": 321, "DayIcon": "wi-day-sprinkle", "NightIcon" : "wi-night-alt-sprinkle"},
    {"ConditionId": 500, "DayIcon": "wi-day-rain", "NightIcon" : "wi-night-alt-rain"},
    {"ConditionId": 501, "DayIcon": "wi-day-rain", "NightIcon" : "wi-night-alt-rain"},
    {"ConditionId": 502, "DayIcon": "wi-day-rain", "NightIcon" : "wi-night-alt-rain"},
    {"ConditionId": 503, "DayIcon": "wi-day-rain", "NightIcon" : "wi-night-alt-rain"},
    {"ConditionId": 504, "DayIcon": "wi-day-rain", "NightIcon" : "wi-night-alt-rain"},    
    {"ConditionId": 511, "DayIcon": "wi-day-rain", "NightIcon" : "wi-night-alt-rain"},   
    {"ConditionId": 520, "DayIcon": "wi-day-showers", "NightIcon" : "wi-night-alt-showers"},   
    {"ConditionId": 521, "DayIcon": "wi-day-showers", "NightIcon" : "wi-night-alt-showers"},    
    {"ConditionId": 522, "DayIcon": "wi-day-showers", "NightIcon" : "wi-night-alt-showers"},    
    {"ConditionId": 531, "DayIcon": "wi-day-showers", "NightIcon" : "wi-night-alt-showers"},
    {"ConditionId": 600, "DayIcon": "wi-day-snow", "NightIcon" : "wi-night-alt-snow"},
    {"ConditionId": 601, "DayIcon": "wi-day-snow", "NightIcon" : "wi-night-alt-snow"},
    {"ConditionId": 602, "DayIcon": "wi-day-snow", "NightIcon" : "wi-night-alt-snow"},
    {"ConditionId": 611, "DayIcon": "wi-day-sleet", "NightIcon" : "wi-night-alt-sleet"},
    {"ConditionId": 612, "DayIcon": "wi-day-sleet", "NightIcon" : "wi-night-alt-sleet"},
    {"ConditionId": 613, "DayIcon": "wi-day-sleet", "NightIcon" : "wi-night-alt-sleet"},    
    {"ConditionId": 615, "DayIcon": "wi-day-sleet", "NightIcon" : "wi-night-alt-sleet"},   
    {"ConditionId": 616, "DayIcon": "wi-day-rain-mix", "NightIcon" : "wi-night-alt-rain-mix"},   
    {"ConditionId": 620, "DayIcon": "wi-day-rain-mix", "NightIcon" : "wi-night-alt-rain-mix"},    
    {"ConditionId": 621, "DayIcon": "wi-day-rain-mix", "NightIcon" : "wi-night-alt-rain-mix"},    
    {"ConditionId": 622, "DayIcon": "wi-day-rain-mix", "NightIcon" : "wi-night-alt-rain-mix"},
    {"ConditionId": 701, "DayIcon": "wi-day-fog", "NightIcon" : "wi-night-alt-fog"},
    {"ConditionId": 711, "DayIcon": "wi-smoke", "NightIcon" : "wi-smoke"},
    {"ConditionId": 721, "DayIcon": "wi-day-haze", "NightIcon" : "wi-day-haze"},
    {"ConditionId": 731, "DayIcon": "wi-dust", "NightIcon" : "wi-dust"},
    {"ConditionId": 741, "DayIcon": "wi-day-fog", "NightIcon" : "wi-night-alt-fog"},
    {"ConditionId": 751, "DayIcon": "wi-sandstorm", "NightIcon" : "wi-sandstorm"},    
    {"ConditionId": 761, "DayIcon": "wi-dust", "NightIcon" : "wi-dust"},   
    {"ConditionId": 771, "DayIcon": "wi-meteor", "NightIcon" : "wi-meteor"},   
    {"ConditionId": 781, "DayIcon": "wi-tornado", "NightIcon" : "wi-tornado"},   
    {"ConditionId": 800, "DayIcon": "wi-day-sunny", "NightIcon" : "wi-stars"} ,    
    {"ConditionId": 801, "DayIcon": "wi-day-sunny-overcast", "NightIcon" : "wi-night-alt-partly-cloudy"},   
    {"ConditionId": 802, "DayIcon": "wi-day-cloudy", "NightIcon" : "wi-night-cloudy"},   
    {"ConditionId": 803, "DayIcon": "wi-cloud", "NightIcon" : "wi-cloud"},   
    {"ConditionId": 804, "DayIcon": "wi-cloudy", "NightIcon" : "wi-cloudy"}
];

class ConditionIcon extends Component{
    constructor(props){
        super(props);
        this.state = {
            conditionId: props.conditionId
        };
    }
    getIcon(conditionId){
        if(conditionId == null)
            return 'not found';

        var currentIcon = iconCollection.filter(function(icon){
            return icon.ConditionId === conditionId;
        })[0];

        return currentIcon.DayIcon;
    }

    render(){        
        const iconClass = 'wi ' + this.getIcon(this.props.conditionId);

        return(
            <i className={iconClass}></i>
        )
    }
}

export default ConditionIcon;

