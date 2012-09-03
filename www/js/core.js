(function( $ ) {

  var Core = Core || {};

  Core = {
    events: [],
    init: function (){
      Core.bindEvents();
      Core.body_height = document.body.offsetHeight - ($("#header").height() + $("#footer").height());
      Core.body_width = document.body.offsetWidth;
    },

    bindEvents: function() {
    },

    request_events: function(coords, filter, limit, radius, callbacks){
      var ajax_url = 'events',
          ajax_data = 'filter='+filter+'&=limit='+limit+'&radius='+radius+'&lon='+coords.longitude+'&lat='+coords.latitude;
        Core.api.submit(ajax_url, ajax_data, callbacks);
    },

    api: {

      submit: function( ajax_url, ajax_data, callback ){

        var auth_token = '';
        if( Core.auth.isAuthenticated() ) {
          auth_token = Core.auth.authToken.get();
        }

        $.ajax({

          type: "GET",

          dataType: "json",

          url: "http://iwuanago.com/api/" + ajax_url,
          // url: "http://localhost:3000/api/" + ajax_url,     
          cache: false,

          //data: ajax_data,
          data: 'api_key='+ auth_token + '&' + ajax_data,

          success: function(data) {
            if(typeof callback.onSuccess == 'function'){
              callback.onSuccess.call(this, data);
            }
          },

          error: function(data,status){
            if(typeof callback.onError == 'function'){
              if(data.status == '403') {
                return callback.onDenied.call(this, data);
              }
              callback.onError.call(this, data);
            }
          },

          complete: function(data){
            if(typeof callback.onComplete == 'function'){
              callback.onComplete.call(this, data);
            }
          },

          denied: function(data){
            if(typeof callback.onDenied == 'function'){
              callback.onDenied.call(this, data);
            }
          }

        });
 

      }

    }

  };

  $( Core.init );

  window.Core = Core;

})(jQuery);
