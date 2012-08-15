(function($) {

  var Core = window.Core || Core || {};

  Core.map = {

    init: function() {
      //Core.auth.requireSession();
      Core.map.bindEvents();
    },

    bindEvents: function() {
      $("#map-pg").bind("pageshow", function() {
        window.plugins.mapKit.showMap();
      });
      $("#map-pg").bind("pagehide", function() {
        window.plugins.mapKit.hideMap();
      });
    },
    getPosition: function(){
      var dfd = $.Deferred();
      navigator.geolocation.getCurrentPosition(

      function(position) {
        dfd.resolve(position)
      }, function(error) {
        dfd.resolve({
          coords: {
            latitude: 37.7749295,
            longitude: -122.4194155
          }
        })
      })
      return dfd.promise();
    },
    putMap: function(coords) {
      var options = {
        buttonCallback: "cbMapCallback",
        height: Core.body_height,
        offsetTop: $("#header").height(),
        diameter: 1000,
        lat: coords.latitude,
        lon: coords.longitude
      };

      // setTimeout(function() {
      //   Core.map.locked = false;
      // }, 1000);
      window.plugins.mapKit.showMap();
      window.plugins.mapKit.setMapData(options);
    },

    putPins: function(pins) {
      app.mapPins = [];
      $.each(pins, function(i, pin) {
        app.mapPins.push({
          lat: pin.latitude,
          lon: pin.longitude,
          title: pin.name,
          pinColor: "purple",
          index: 0,
          selected: false
        })
      })
      if (app.mapPins.length > 0) window.plugins.mapKit.addMapPins(app.mapPins);
    },

    getBBOX: function(location) {
      return [location.lon - (location.deltaX / 2), location.lat - (location.deltaY / 2), location.lon + (location.deltaX / 2), location.lat + (location.deltaY / 2)].join(",");
    },

    onMapMove: function(lat, lon, deltaY, deltaX) {
      if (geo.locked) return;

      app.lastLocation = {
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        deltaY: parseFloat(deltaY),
        deltaX: parseFloat(deltaX)
      }

      app.lastLocation.bbox = getBBOX(app.lastLocation);

      window.plugins.mapKit.clearMapPins();
      couch.get("http://open211.org/api/services?bbox=" + app.lastLocation.bbox).then(function(results) {
        putPins(results.rows.map(function(row) {
          return row.value;
        }));
      })

    }

  };

  $(Core.map.init);

  window.Core = Core;

})(jQuery);