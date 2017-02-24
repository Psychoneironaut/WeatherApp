var latitude = 0;
var longitude = 0;

function geoFindMe() {
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    latitude  = position.coords.latitude;
    longitude = position.coords.longitude;

    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

    output.appendChild(img);
  }

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "<p>Locating…</p>";

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
        $('#conditionTd').html(info.item.condition.text);
        $('#currentTemp').html(info.item.forecast[0].low + (u.toUpperCase()) + ' - ' + info.item.forecast[0].high + (u.toUpperCase()));
        $('#humidityTd').html(" "+info.atmosphere.humidity );

    };
    $.ajax({
        url: url1,
        dataType: 'jsonp',
        cache: true,
        jsonpCallback: 'doWeather'
    });

    
}

function getWeather() {
 
    var u = 'F';
    var query = "SELECT * FROM weather.forecast WHERE woeid in (SELECT woeid FROM geo.places(1) WHERE text=\"(" + latitude + ","+ longitude+ ")\")";
    
    var cacheBuster = Math.floor((new Date().getTime()) / 3600 / 1000);

    var url1 = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(query) + '&format=json&_nocache=' + cacheBuster;

    window['doWeather'] = function(data) {
        var info = data.query.results.channel;
        $('#conditionTd').html(info.item.condition.text);
        $('#currentTemp').html(info.item.forecast[0].low + (u.toUpperCase()) + ' - ' + info.item.forecast[0].high + (u.toUpperCase()));
        $('#humidityTd').html(" "+info.atmosphere.humidity );

    };
    $.ajax({
        url: url1,
        dataType: 'jsonp',
        cache: true,
        jsonpCallback: 'doWeather'
    });
}