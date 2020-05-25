/*jshint esversion: 6 */
import { kelvinToCelsius, metresPSToMph, unixToTimeString } from "./util";
var getTasks = (dataCallback) => {
    fetch('https://phaepeeeye.herokuapp.com/tasks', {
    method: 'GET'
    })
    .then(res => res.json())
    .then((data) => {dataCallback({tasks:data});})
    .catch(console.log);
};

var getTags = (dataCallback) => {
    fetch('https://phaepeeeye.herokuapp.com/tags', {
    method: 'GET'
    })
    .then(res => res.json())
    .then((data) => {dataCallback({tags:data});})
    .catch(console.log);
};

var getCountryData = (dataCallback) => {
    fetch('https://phaepeeeye.herokuapp.com/countries',{
        method:'GET'
    })
    .then(res => res.json())
    .then((data) => {dataCallback({countries:data});})
    .catch(console.log);    
};

var getCityData = (dataCallback, country) => {
    fetch('https://phaepeeeye.herokuapp.com/cities?country='+country,{
        method:'GET'
    })
    .then(res => res.json())
    .then((data) => {
        dataCallback(
            {
                cities:data.map((city) => (
                {
                    _id:city._id,
                    value:city.id,
                    label:city.name 
                }))
            }
        );
    })
    .catch(console.log);    
};

var getWeatherData = (dataCallback, cityId) => {
    fetch('https://api.openweathermap.org/data/2.5/weather?id='+cityId+'&appid=8fd8712cd89f1836f2d4293cd9b2cc01',{
        method:'GET'
    })
    .then(res => res.json())
    .then((data) => {
        dataCallback(
            {
                weatherData: {
                    temp: kelvinToCelsius(data.main.temp),
                    highTemp: kelvinToCelsius(data.main.temp_max),
                    lowTemp: kelvinToCelsius(data.main.temp_min),
                    feelsLike: kelvinToCelsius(data.main.feels_like),
                    windSpeed: metresPSToMph(data.wind.speed),
                    windDirection: data.wind.deg,
                    conditionId: data.weather[0].id,
                    condition:data.weather[0].description,
                    location: data.name,
                    sunriseTime: unixToTimeString(data.sys.sunrise),
                    sunsetTime: unixToTimeString(data.sys.sunset),
                    pressure: data.main.pressure,
                    humidity: data.main.humidity,
                }  
            }
        );
    })
    .catch(console.log);    
};

var getForecast = (dataCallback, cityId) => {
    fetch('https://api.openweathermap.org/data/2.5/forecast?id='+cityId+'&appid=8fd8712cd89f1836f2d4293cd9b2cc01', {
        method:'GET'
    })
    .then(res => res.json())
    .then((data) => {
        dataCallback(
            {
                forecastItems:data.list.map((forecast) => (
                {
                    temp: kelvinToCelsius(forecast.main.temp),
                    highTemp: kelvinToCelsius(forecast.main.temp_max),
                    lowTemp: kelvinToCelsius(forecast.main.temp_min),
                    feelsLike: kelvinToCelsius(forecast.main.feels_like),
                    windSpeed: metresPSToMph(forecast.wind.speed),
                    windDirection: forecast.wind.deg,
                    conditionId: forecast.weather[0].id,              
                    condition: forecast.weather[0].description,
                    dateTime: forecast.dt,
                    key: forecast.dt
                }))
            }
        );
    });
};

var createTask = (task, callback) => {
    fetch('https://phaepeeeye.herokuapp.com/tasks', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(task,null,2)
    })
    .then(() => getTasks(callback))
    .catch(console.log);
};

var deleteTask = (id, callback) =>{
    fetch('https://phaepeeeye.herokuapp.com/tasks/'+id, {
    method: 'DELETE',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    })
    .then(() => getTasks(callback))
    .catch(console.log);
};

var updateTask = (task, callback) => {
    fetch('https://phaepeeeye.herokuapp.com/tasks/'+task._id, {
    method: 'PUT',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(task,null,2)
    })
    .then(() => getTasks(callback))
    .catch(console.log);
};

export 
{
    getTasks,
    getTags,
    getCountryData,
    getForecast,
    getWeatherData,
    getCityData,
    createTask,
    deleteTask,
    updateTask
};