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
      cities: [],
      countries: [],
      forecastItems: [],
      config: {
        tempUnit: '°C',
        windSpeedUnit: 'mph',
        pressureUnit: 'hPa',
        colourScheme: "2",
        staticColour: '#FF8080',    
        selectedCountry: 'GB' , 
        selectedCity: "2641181"
      },
      dateTime: new Date(),
      dateTimeIntervalId: 0,
      weatherIntervalId: 0,
      forecastIntervalId: 0,
      currentDynamicColour: '#000'
    };
  }

  componentDidMount(){
    this.getCountryData();
    this.getCityData(this.state.config.selectedCountry);

    this.getWeatherData(this.state.config.selectedCity);   
    
    setTimeout(() => {
      this.getForecast(this.state.config.selectedCity);
    }, 3000);

    var dateTimeIntervalId = setInterval(() => {
      this.setState({dateTime: new Date()});
      this.setDynamicColour();
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

  setDynamicColour(){
    var date = this.state.dateTime;
    var datePart = date.getDate() + '' + date.getMonth() + 1 + '' + date.getHours();
    var conditionAddition = parseInt(this.state.weatherData.conditionId) * 1000;
    var dynamicValue = datePart + conditionAddition;

     // Parse string as Base16 (hex)
    var hex = parseInt(dynamicValue, 10).toString(16);   
    
    // If it's less than six, trim it to three
    if ( hex.length < 7 ) {
        hex = hex.substring(0,3);
    }
    // Limit it to six chars for CSS styles
    var dynamicColour = '#' + hex.substring( 1, 7 );

    this.setState({currentDynamicColour: dynamicColour});
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

  getCountryData(){
    fetch('https://phaepeeeye.herokuapp.com/countries',{
      method:'GET'
    })
    .then(res => res.json())
    .then((data) => {
      this.setState(
        {  
          countries : data
        });

    })
    .catch(console.log);    
  }

  getCityData(country){
    fetch('https://phaepeeeye.herokuapp.com/cities?country='+country,{
      method:'GET'
    })
    .then(res => res.json())
    .then((data) => {
      this.setState(
        {  
          cities : data.map((city) => (
            {
              _id:city._id,
              value:city.id,
              label:city.name 
            }
          ))
        });

    })
    .catch(console.log);    
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

  setColourScheme(scheme){
    var config = this.state.config;
    config.colourScheme = scheme;
    this.setState({
      config: config
    });
  }

  setStaticColour(colour){
    var config = this.state.config;
    config.staticColour = colour;
    this.setState({
      config: config
    });
  }

  setCountry(country){
    var config = this.state.config;
    config.selectedCountry = country.country;
    config.selectedCity = "";
    this.setState({
      config: config
    });
    this.getCityData(country.country);
  }

  setCity(city){
     var config = this.state.config;
    config.selectedCity = city.city;
    this.setState({
      config: config
    });
    this.getWeatherData(city.city);
    setTimeout(() => {
      this.getForecast(city.city);
    }, 3000);
  }

  render(){
    const backgroundColor = this.state.config.colourScheme === "1" ? this.state.currentDynamicColour : this.state.config.staticColour;
    const containerStyle = { backgroundColor : backgroundColor }
    return(
      <div className='wrapper noselect'>       
        <div className='container centre' style={containerStyle}>          
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
            setColourScheme = {(scheme) => this.setColourScheme(scheme)}
            setStaticColour = {(colour) => this.setStaticColour(colour)}
            setCountry = {(country) => this.setCountry(country)}            
            setCity = {(city) => this.setCity(city)}
            countries = {this.state.countries}
            cities = {this.state.cities}
          />
        </div>
      </div>
    );
  }
}

export default App;
