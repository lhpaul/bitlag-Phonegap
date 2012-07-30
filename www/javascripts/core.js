(function( $ ) {

  var Core = Core || {};

  Core = {


    init: function (){
      Core.bindEvents();

    },

    bindEvents: function() {
      $('#logout').live('click',function(){
        Core.auth.logout();
        return false;
      });

      $( '#map-pg' ).live( 'pageshow',function(event, ui)
      {
        $( Core.profile.init );
      });

      $( '#list-pg' ).live( 'pageshow',function(event, ui)
      {
        $( Core.events.init );
      });

      $( '#calendar-pg' ).live( 'pageshow',function(event, ui)
      {
        $( Core.groups.init );
      });


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

          //url: "http://paulgrass.herokuapp.com/api/" + ajax_url,
          url: "http://localhost:3000/api/" + ajax_url,     
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
