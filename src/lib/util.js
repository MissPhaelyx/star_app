/*jshint esversion: 6 */

var removeByAttr = function(arr, attr, value){
    var i = arr.length;
    while(i--){
       if( arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && arr[i][attr] === value ) ){ 

           arr.splice(i,1);

       }
    }
    return arr;
}

var kelvinToCelsius = (tempInKelvin) => {
    return parseFloat(tempInKelvin - 273.15).toFixed(1);
}

var metresPSToMph = (windMs) => {
    return parseFloat(windMs * 2.237).toFixed(2);
}

var unixToTimeString = (unixTimeStamp) => {
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

export {removeByAttr, kelvinToCelsius, metresPSToMph, unixToTimeString};