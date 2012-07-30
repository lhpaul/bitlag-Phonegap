(function( $ ) {

  var Core = window.Core || Core || {};

  Core.profile = {

    init: function (){
      Core.auth.requireSession();
      Core.profile.bindEvents();
      Core.profile.loadContent.run();
    },

    bindEvents: function() {
    },

    loadContent: {
     run: function() {
      $.mobile.showPageLoadingMsg();
        var ajax_url = "users",
            ajax_data = "id="+Core.auth.user_id.get();
        Core.api.submit( ajax_url, ajax_data,
          {
            onSuccess: Core.profile.loadContent.onSuccess,
            onError: Core.profile.loadContent.onError,
            onDenied: Core.profile.loadContent.onDenied,
            onComplete: Core.profile.loadContent.onComplete
          }
        );
      },

      onSuccess: function(data) {
        $("#email").text(data.user.email);
        $("#fname").text(data.profile.fname);
        $("#lname").text(data.profile.lname);
        if(data.profile.brithDate)
          $("#birth_date").text(data.profile.brithDate);
        
      },

      onError: function(data) {
        //alert(data.error);
      },

      onDenied: function(data) {
      },

      onComplete: function(data) {
        $.mobile.hidePageLoadingMsg();
      }
    }

  };

  window.Core = Core;

})(jQuery);