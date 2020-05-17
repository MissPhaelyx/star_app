/*jshint esversion: 6 */
import React, {Component} from 'react';
class DateTimeDisplay extends Component{
    
    dayOfWeekString(day){
        return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][day];
    }

    render(){
        return(
                <div className='flex flex-columns centre'>
                    {this.props.showDay && 
                        <span>{this.dayOfWeekString(this.props.dateTime.getDay())}</span>
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