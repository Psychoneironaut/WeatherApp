var latitude = 0;
var longitude = 0;
var indexVal = 0;
var currentLoc;


function geoFindMe() {
    var output = document.getElementById("out");
    
    // Do a few test cases where Geolocation isn't supported and make sure the error message looks good and cohesive with the rest of the page/content
    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }
    
    function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        getWeather();
    }
    
    function error() {
        output.innerHTML = "Unable to retrieve your location";
    }
    navigator.geolocation.getCurrentPosition(success, error);
}

function getTypedWeather(){
    
    var city = $('#cityText').val();
    var state = $('#stateText').val();
    var loc1 = city+", "+state;
    var u = 'f';

    var query1 = "SELECT * FROM weather.forecast WHERE woeid in (select woeid from geo.places(1) where text='" + loc1 + "') AND u='" + u + "'";
    
    var cacheBuster = Math.floor((new Date().getTime()) / 3600 / 1000);

    var url1 = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(query1) + '&format=json&_nocache=' + cacheBuster;

    window['doWeather'] = function(data) {
        var info = data.query.results.channel;
        currentLoc = info;
        
        $('#location').html(info.title);
        
        //icon
        $('conditionIcon').html(setWeatherIcon(info.forecast[0].code));
        
        $('#conditionTd').html(info.item.condition.text);
        $('#currentTemp').html(info.item.forecast[0].low + (u.toUpperCase()) + ' - ' + info.item.forecast[0].high + (u.toUpperCase()));
        $('#humidityTd').html(" "+info.atmosphere.humidity );
        
        //future info
        $('nextConditionIcon').html(setWeatherIcon(info.item.forecast[indexVal+1].code));
        
        $('#nextDate').html(currentLoc.item.forecast[indexVal+1].date);
        $('#nextDay').html(currentLoc.item.forecast[indexVal+1].day);
        $('#nextTemp').html(currentLoc.item.forecast[indexVal+1].low + (u.toUpperCase()) + ' - ' + currentLoc.item.forecast[indexVal+1].high + (u.toUpperCase()));
        $('#nextCondition').html(currentLoc.item.forecast[indexVal+1].text);
        
    };
    $.ajax({
        url: url1,
        dataType: 'jsonp',
        cache: true,
        jsonpCallback: 'doWeather'
    }); 
}

function nextDay(){
    if(indexVal === 9){
        getForcast(indexVal);
    }else{
        indexVal = indexVal+1;
        getForcast(indexVal);
    }

}

function previousDay(){
    
    if(indexVal === 0){
        getForcast(indexVal);
    }
    else{
        indexVal = indexVal -1;
        getForcast(indexVal);
    }   

}


function getForcast(indexVal){
    
        var u = 'F';
        
        //set icon
        $('conditionIcon').html(setWeatherIcon(currentLoc.item.forecast[indexVal].code));
                                
        //set forcast
        $('#nextDate').html(currentLoc.item.forecast[indexVal].date);
        $('#nextDay').html(currentLoc.item.forecast[indexVal].day);
        $('#nextTemp').html(currentLoc.item.forecast[indexVal].low + (u.toUpperCase()) + ' - ' + currentLoc.item.forecast[indexVal].high + (u.toUpperCase()));
        $('#nextCondition').html(currentLoc.item.forecast[indexVal].text);

}

function getWeather() {
 
    var u = 'F';
    var query = "SELECT * FROM weather.forecast WHERE woeid in (SELECT woeid FROM geo.places(1) WHERE text=\"(" + latitude + ","+ longitude+ ")\")";
    
    var cacheBuster = Math.floor((new Date().getTime()) / 3600 / 1000);

    var url1 = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(query) + '&format=json&_nocache=' + cacheBuster;

    window['doWeather'] = function(data) {
        var info = data.query.results.channel;
        currentLoc = info;
        
        $('#location').html(info.title);
        $('#conditionTd').html(info.item.condition.text);
        $('#currentTemp').html(info.item.forecast[0].low + (u.toUpperCase()) + ' - ' + info.item.forecast[0].high + (u.toUpperCase()));
        $('#humidityTd').html(" "+info.atmosphere.humidity );
        
        //set icon
        $('conditionIcon').html(setWeatherIcon(info.item.forecast[indexVal].code));
        
        
        //set forcast
        $('nextConditionIcon').html(setWeatherIcon(currentLoc.item.forecast[indexVal+1].code));
>>>>>>> origin/master:scripts/script.js
        $('#nextDate').html(currentLoc.item.forecast[indexVal+1].date);
        $('#nextDay').html(currentLoc.item.forecast[indexVal+1].day);
        $('#nextTemp').html(currentLoc.item.forecast[indexVal+1].low + (u.toUpperCase()) + ' - ' + currentLoc.item.forecast[indexVal+1].high + (u.toUpperCase()));
        $('#nextCondition').html(currentLoc.item.forecast[indexVal+1].text);
        
            
    };
    $.ajax({
        url: url1,
        dataType: 'jsonp',
        cache: true,
        jsonpCallback: 'doWeather'
    });
}

//function setWeatherIcon(condid) {
//  var icon = '';
//      switch(condid) {
//        case '0': icon  = 'wi-tornado';
//          break;
//        case '1': icon = 'wi-storm-showers';
//          break;
//        case '2': icon = 'wi-tornado';
//          break;
//        case '3': icon = 'wi-thunderstorm';
//          break;
//        case '4': icon = 'wi-thunderstorm';
//          break;
//        case '5': icon = 'wi-snow';
//          break;
//        case '6': icon = 'wi-rain-mix';
//          break;
//        case '7': icon = 'wi-rain-mix';
//          break;
//        case '8': icon = 'wi-sprinkle';
//          break;
//        case '9': icon = 'wi-sprinkle';
//          break;
//        case '10': icon = 'wi-hail';
//          break;
//        case '11': icon = 'wi-showers';
//          break;
//        case '12': icon = 'wi-showers';
//          break;
//        case '13': icon = 'wi-snow';
//          break;
//        case '14': icon = 'wi-storm-showers';
//          break;
//        case '15': icon = 'wi-snow';
//          break;
//        case '16': icon = 'wi-snow';
//          break;
//        case '17': icon = 'wi-hail';
//          break;
//        case '18': icon = 'wi-hail';
//          break;
//        case '19': icon = 'wi-cloudy-gusts';
//          break;
//        case '20': icon = 'wi-fog';
//          break;
//        case '21': icon = 'wi-fog';
//          break;
//        case '22': icon = 'wi-fog';
//          break;
//        case '23': icon = 'wi-cloudy-gusts';
//          break;
//        case '24': icon = 'wi-cloudy-windy';
//          break;
//        case '25': icon = 'wi-thermometer';
//          break;
//        case '26': icon = 'wi-cloudy';
//          break;
//        case '27': icon = 'wi-night-cloudy';
//          break;
//        case '28': icon = 'wi-day-cloudy';
//          break;
//        case '29': icon = 'wi-night-cloudy';
//          break;
//        case '30': icon = 'wi-day-cloudy';
//          break;
//        case '31': icon = 'wi-night-clear';
//          break;
//        case '32': icon = 'wi-day-sunny';
//          break;
//        case '33': icon = 'wi-night-clear';
//          break;
//        case '34': icon = 'wi-day-sunny-overcast';
//          break;
//        case '35': icon = 'wi-hail';
//          break;
//        case '36': icon = 'wi-day-sunny';
//          break;
//        case '37': icon = 'wi-thunderstorm';
//          break;
//        case '38': icon = 'wi-thunderstorm';
//          break;
//        case '39': icon = 'wi-thunderstorm';
//          break;
//        case '40': icon = 'wi-storm-showers';
//          break;
//        case '41': icon = 'wi-snow';
//          break;
//        case '42': icon = 'wi-snow';
//          break;
//        case '43': icon = 'wi-snow';
//          break;
//        case '44': icon = 'wi-cloudy';
//          break;
//        case '45': icon = 'wi-lightning';
//          break;
//        case '46': icon = 'wi-snow';
//          break;
//        case '47': icon = 'wi-thunderstorm';
//          break;
//        case '3200': icon = 'wi-cloud';
//          break;
//        default: icon = 'wi-cloud';
//          break;
//      }
//  
//      return '<i class="wi '+icon+'"></i>';
//}

window.onload = geoFindMe();