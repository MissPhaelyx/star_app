/*jshint esversion: 6 */
import React, {Component} from 'react';
import WeatherConditions from './components/conditions';
import './App.css';
import './weather-icons.min.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      weatherData : {},
      cities: {},
      countries: {},
      config: {
        tempUnit: '°C',
        windSpeedUnit: 'mph',
        humidityUnit: '%',
        pressureUnit: 'hPa'
      }
    };
  }

  componentDidMount(){
    this.getWeatherData(2641181);
  }

  kelvinToCelsius(tempInKelvin){
    return parseFloat(tempInKelvin - 273.15).toFixed(1);
  }

  metresPSToMph(windMs){
    return parseFloat(windMs * 2.237).toFixed(2);
  }

  unixToTimeString(unixTimeStamp){
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unixTimeStamp*1000);
    // Hours part from the timestamp
    var hours = "0" + date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    return hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  }

  getWeatherData(cityId){

    fetch('https://api.openweathermap.org/data/2.5/weather?id='+cityId+'&appid=8fd8712cd89f1836f2d4293cd9b2cc01',{
      method:'GET'
    })
    .then(res => res.json())
    .then((data) => {
      this.setState(
        {  
          weatherData : {
            temp: this.kelvinToCelsius(data.main.temp),
            highTemp: this.kelvinToCelsius(data.main.temp_max),
            lowTemp: this.kelvinToCelsius(data.main.temp_min),
            feelsLike: this.kelvinToCelsius(data.main.feels_like),
            windSpeed: this.metresPSToMph(data.wind.speed),
            windDirection: data.wind.deg,
            conditionId: data.weather[0].id,
            location: data.name,
            sunriseTime: this.unixToTimeString(data.sys.sunrise),
            sunsetTime: this.unixToTimeString(data.sys.sunset),
            pressure: data.main.pressure,
            humidity: data.main.humidity,
          }
        });

    })
    .catch(console.log);    
  }

  render(){

    return(
      <div>
        <WeatherConditions
          weatherData = {this.state.weatherData}
          config = {this.state.config}
        />
      </div>
    );
  }
}

export default App;
