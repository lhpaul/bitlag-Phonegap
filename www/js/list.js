(function( $ ) {

  var Core = window.Core || Core || {};

  Core.list = {

    init: function (){
      //Core.auth.requireSession();
      Core.list.bindEvents();
      //Core.events.loadContent.run();
    },

    bindEvents: function() {
      
    },

    loadContent: {
      run: function(url) {
        $.mobile.showPageLoadingMsg();
        var ajax_url = url,
          ajax_data = '';
        Core.api.submit(ajax_url, ajax_data, 
        {
          onSuccess: Core.list.loadContent.onSuccess,
          onError: Core.list.loadContent.onError,
          onDenied: Core.list.loadContent.onDenied,
          onComplete: Core.list.loadContent.onComplete
        }
        );
      },

      onSuccess: function(data) {
        
      },

      onError: function(data) {
        
      },

      onDenied: function(data) {},

      onComplete: function(data) {
        $.mobile.hidePageLoadingMsg();
      }
    },

    showEvent: {
      run: function(id) {
        $.mobile.showPageLoadingMsg();
        var ajax_url = "event",
          ajax_data = 'id='+id;
        Core.api.submit(ajax_url, ajax_data, 
        {
          onSuccess: Core.list.showEvent.onSuccess,
          onError: Core.list.showEvent.onError,
          onDenied: Core.list.showEvent.onDenied,
          onComplete: Core.list.showEvent.onComplete
        }
        );
      },

      onSuccess: function(data) {
        
      },

      onError: function(data) {
        
      },

      onDenied: function(data) {},

      onComplete: function(data) {
        $.mobile.hidePageLoadingMsg();
      }
    }


  };

  $( Core.list.init );

  window.Core = Core;

})(jQuery);