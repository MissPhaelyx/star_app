/*jshint esversion: 6 */
import React, {Component} from 'react';
import WeatherConditions from './components/conditions';
import ConfigScreen from './components/config-screen';
import './App.css';
import './style.css';
import './weather-icons.min.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      currentScreen : 'MAIN',
      weatherData : {},
      cities: {},
      countries: {},
      forecastItems: [],
      config: {
        tempUnit: '°C',
        windSpeedUnit: 'mph',
        pressureUnit: 'hPa',
        isDynamicColour: false,
        staticColour: '#FF8080'
      },
      dateTime: new Date(),
      dateTimeIntervalId: 0,
      weatherIntervalId: 0,
      forecastIntervalId: 0
    };
  }

  componentDidMount(){
    this.getWeatherData(2641181);   

    setTimeout(() => {
      this.getForecast(2641181);
    }, 3000);

    var dateTimeIntervalId = setInterval(() => {
      this.setState({dateTime: new Date()});
    }, 1000);

    var weatherIntervalId = setInterval(() => {
      this.getWeatherData(2641181);
    }, 60000);

    var forecastIntervalId = setInterval(() => {
      this.getForecast(2641181);
    }, 120000);

    this.setState(
      {
        dateTimeIntervalId: dateTimeIntervalId,
        weatherIntervalId: weatherIntervalId,
        forecastIntervalId: forecastIntervalId
      }
    );
  }

  kelvinToCelsius(tempInKelvin){
    return parseFloat(tempInKelvin - 273.15).toFixed(1);
  }

  metresPSToMph(windMs){
    return parseFloat(windMs * 2.237).toFixed(2);
  }

  switchScreen(screenName){
    this.setState({
      currentScreen: screenName
    });
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

  getForecast(cityId){
    fetch('https://api.openweathermap.org/data/2.5/forecast?id='+cityId+'&appid=8fd8712cd89f1836f2d4293cd9b2cc01', {
      method:'GET'
    })
    .then(res => res.json())
    .then((data) => {
      this.setState(
        {
          forecastItems : data.list.map((forecast) => (
            {
              temp: this.kelvinToCelsius(forecast.main.temp),
              highTemp: this.kelvinToCelsius(forecast.main.temp_max),
              lowTemp: this.kelvinToCelsius(forecast.main.temp_min),
              feelsLike: this.kelvinToCelsius(forecast.main.feels_like),
              windSpeed: this.metresPSToMph(forecast.wind.speed),
              windDirection: forecast.wind.deg,
              conditionId: forecast.weather[0].id,
              dateTime: forecast.dt,
              key: forecast.dt
            }
          ))
        }
      );
    });
  }

  render(){
    const backgroundColour = { backgroundColor : '#FF8080' }
    return(
      <div className='wrapper noselect'>
       
        <div className='container centre' style={backgroundColour}>          
          <WeatherConditions
            weatherData = {this.state.weatherData}
            config = {this.state.config}
            dateTime = {this.state.dateTime}
            forecastItems = {this.state.forecastItems}
            show = {this.state.currentScreen === "MAIN"}
            switchScreen = {(screenName) => this.switchScreen(screenName)}
          />
          <ConfigScreen
            config = {this.state.config}
            dateTime = {this.state.dateTime}
            show = {this.state.currentScreen === "CONFIG"}
            switchScreen = {(screenName) => this.switchScreen(screenName)}
          />
        </div>
      </div>
    );
  }
}

export default App;
