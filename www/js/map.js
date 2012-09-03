(function($) {

  var Core = window.Core || Core || {};

  Core.map = {

    init : function() {
      //Core.auth.requireSession();
      Core.map.event_ids = [];
      Core.map.event_markers = [];
      Core.map.current_location_image = new google.maps.MarkerImage('css/images/current_location_icon.png');
      Core.map.bindEvents();
      Core.map.putMap();
    },

    bindEvents : function() {

      $('#map-pg').live('pageshow', function() {
      });

      $('#locate').live('click', function() {
        //Core.map.current_marker.setMap(null);
        Core.map.goToUserLocation();
        return false;

      });
      $('#settings').live('click', function() {
        Core.map.messageBox.changeMessage("Downloading events...", "#0D12A4");
        var pos = Core.map.current_marker.getPosition();
        Core.request_events({
          latitude : pos.lat(),
          longitude : pos.lng(),
        }, 'todos', 'week', Core.map.circleMarker.getRadius()/1600, {
          onSuccess : Core.map.add_events.onSuccess,
          onError : Core.map.add_events.onError,
          onDenied : Core.map.add_events.onDenied,
          onComplete : Core.map.add_events.onComplete
        });

      });
    },

    goToPosition : function() {

    },

    putMap : function() {
      $("#map_canvas").height(Core.body_height - ($("#flipbox").height() + $("#header").height()));
      var mapOptions = {
        zoom : 10,
        mapTypeId : google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

      Core.map.goToUserLocation();
    },

    goToUserLocation : function() {
      if (!navigator.geolocation) {
        alert("Your device does not support geolocation");
        return;
      }
      navigator.geolocation.getCurrentPosition(function(position) {
        //var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var pos = new google.maps.LatLng(-33.3305225, -70.5295016);
        map.setCenter(pos);
        if (Core.map.current_marker) {
          Core.map.current_marker.setPosition(pos);
        } else {
          Core.map.current_marker = new google.maps.Marker({
            position : pos,
            map : map,
            icon : Core.map.current_location_image
          });
          Core.map.current_marker.setAnimation(google.maps.Animation.BOUNCE);
        }
        Core.map.putCircle(Core.map.current_marker.getPosition());
      }, function() {
        map.setCenter(new google.maps.LatLng(60, 105));
        alert("Error in geolocation");
      });

    },

    putCircle : function(position) {
      if (Core.map.circleMarker) {
        Core.map.circleMarker.setCenter(position);
        return;
      }
      var circleOptions = {
        strokeColor : '#FF0000',
        strokeOpacity : 0.8,
        strokeWeight : 2,
        fillColor : '#797070',
        fillOpacity : 0.35,
        map : map,
        center : position,
        radius : 8000
      };

      Core.map.circleMarker = new google.maps.Circle(circleOptions);
    },

    add_events : {

      onSuccess : function(data) {
        $.each(data, function(i, evnt) {
          if (!(jQuery.inArray(evnt.id, Core.map.event_ids)))
          Core.map.event_ids.push(evnt.id);
        var infowindow = new google.maps.InfoWindow({
            content: evnt.name
        });
        var marker = new google.maps.Marker({
            title: evnt.name,
            position : new google.maps.LatLng(evnt.latitude, evnt.longitude),
            map : map,
            draggable : false,
            animation : google.maps.Animation.DROP
          });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

          Core.map.event_markers.push(marker);
        });

        Core.map.messageBox.changeMessage("Ready", "#39AB3E");
      },

      onError : function(data) {
        Core.map.messageBox.changeMessage("Conection error", "#DA0122");
      },

      onDenied : function(data) {
      },

      onComplete : function(data) {

      }
    },

    putPins : function(pins) {
      app.mapPins = [];
      $.each(pins, function(i, pin) {
        app.mapPins.push({
          lat : pin.latitude,
          lon : pin.longitude,
          title : pin.name,
          pinColor : "purple",
          index : 0,
          selected : false
        })
      })
      if (app.mapPins.length > 0)
        window.plugins.mapKit.addMapPins(app.mapPins);
    },

    onMapMove : function(lat, lon, deltaY, deltaX) {

    },
    messageBox : {
      busy : false,
      messages : [],
      changeMessage : function(msg, col) {
        Core.map.messageBox.messages.push({
          message : msg,
          color : col
        });
        if (Core.map.messageBox.busy)
          return;
        Core.map.messageBox.busy = true;
        Core.map.messageBox.displayMessage(Core.map.messageBox.messages.shift());

      },
      displayMessage : function(data) {
        $("#flipbox").flip({
          direction : 'bt',
          color : data.color,
          content : data.message,
          onEnd : Core.map.messageBox.end_of_animation
        });
      },
      end_of_animation : function() {
        if (Core.map.messageBox.messages.length > 0)
          Core.map.messageBox.displayMessage(Core.map.messageBox.messages.shift());
        else
          Core.map.messageBox.busy = false;
      }
    }

  };

  $(Core.map.init);

  window.Core = Core;

})(jQuery);
