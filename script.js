var latitude = 0;
var longitude = 0;

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
    }

    function error() {
        output.innerHTML = "Unable to retrieve your location";
    }
    navigator.geolocation.getCurrentPosition(success, error);
}

function getWeather() {

//CODE Using location attempts
//
//     var query1 = "https://query.yahooapis.com/v1/public/yql?q=SELECT * FROM weather.forecast WHERE woeid in (select woeid from geo.places(1) where text='" +latitude+","+longitude+ "') AND u='" + u + "'";
//    
//    
//    
//    
//    jQuery.getJSON(query1).then(function(result) {
//        jQuery("weather").eq(0).append(result.query.results.channel.item.forecast[0].text);                         
//    });
    
//    var query2 = "SELECT * FROM weather.forecast WHERE woeid in (select woeid from geo.places(1) where text='"({lat},{lon})"') AND u='" + u + "'";

//    var loc1 = 'Chicago, IL';
//    
//    var query1 = "SELECT * FROM weather.forecast WHERE woeid in (SELECT woeid FROM geo.places(1) where text='" + loc1 + "') AND u='" + u + "'";
//    
    
     var u = 'F';
    var query = "SELECT * FROM weather.forecast WHERE woeid in (SELECT woeid FROM geo.places(1) WHERE text=\"(" + latitude + ","+ longitude+ ")\")";
    
    var cacheBuster = Math.floor((new Date().getTime()) / 3600 / 1000);

    var url1 = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(query) + '&format=json&_nocache=' + cacheBuster;

    window['wxCallback1'] = function(data) {
        var info = data.query.results.channel;
        $('#conditionTd').html(info.item.condition.text);
        $('#currentTemp').html(info.item.forecast[0].low + (u.toUpperCase()) + ' - ' + info.item.forecast[0].high + (u.toUpperCase()));
        $('#humidityTd').html(" "+info.atmosphere.humidity );

    };
    $.ajax({
        url: url1,
        dataType: 'jsonp',
        cache: true,
        jsonpCallback: 'wxCallback1'
    });
}

window.onload = geoFindMe();