/*jshint esversion: 6 */
import React, {Component} from 'react';
class DateTimeDisplay extends Component{
    
    dayOfWeekString(day){
        return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][day];
    }

    dayOfWeekShortString(day){
        return ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][day];
    }

    render(){
        return(
                <div className='flex flex-columns centre'>
                    {this.props.showDay && 
                        <a href="https://www.solitr.com/"><span>{this.dayOfWeekString(this.props.dateTime.getDay())}</span></a>
                    }
                    {this.props.showShortDate &&
                        <span>{this.dayOfWeekShortString(this.props.dateTime.getDay()) + ' ' + this.props.dateTime.getDate() + '/' + this.props.dateTime.getMonth()}</span>
                    }
                    {this.props.showDate &&
                        <span>{this.props.dateTime.toLocaleDateString()}</span>
                    }
                    <span>{this.props.dateTime.toLocaleTimeString()}</span>
                </div>
        )
    }
}

export default DateTimeDisplay;