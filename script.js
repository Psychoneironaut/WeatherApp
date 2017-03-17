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
        
        $('#conditionTd').html(info.item.condition.text);
        $('#currentTemp').html(info.item.forecast[0].low + (u.toUpperCase()) + ' - ' + info.item.forecast[0].high + (u.toUpperCase()));
        $('#humidityTd').html(" "+info.atmosphere.humidity );
       
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
        
        $('#conditionTd').html(info.item.condition.text);
        $('#currentTemp').html(info.item.forecast[0].low + (u.toUpperCase()) + ' - ' + info.item.forecast[0].high + (u.toUpperCase()));
        $('#humidityTd').html(" "+info.atmosphere.humidity );
        
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

window.onload = geoFindMe();


