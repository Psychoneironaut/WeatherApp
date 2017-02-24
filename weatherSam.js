$(function(){

    var loc1 = 'Singapore, Singapore'; // Singapore
    var u = 'c';
    var query1 = "SELECT * FROM weather.forecast WHERE woeid in (select woeid from geo.places(1) where text='" + loc1 + "') AND u='" + u + "'";
    var cacheBuster = Math.floor((new Date().getTime()) / 3600 / 1000);

    var url1 = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(query1) + '&format=json&_nocache=' + cacheBuster;

    window['wxCallback1'] = function(data) {
        var info = data.query.results.channel;
        $('currentTemp').text(info.item.condition.text);
        $('todayHigh').text(info.item.forecast[0].high);
        $('todayLow').text(info.item.forecast[0].low);
        $('humidity').text(info.atmosphere.humidity);

    };
    $.ajax({
        url: url1,
        dataType: 'jsonp',
        cache: true,
        jsonpCallback: 'wxCallback1'
    });

});


