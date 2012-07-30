(function( $ ) {

  var Core = window.Core || Core || {};

  Core.events = {

    init: function (){
      Core.auth.requireSession();
      Core.events.bindEvents();
      Core.events.loadContent.run("user/events");
      //Core.ui.showView();
      //Core.events.loadContent.run();
    },

    bindEvents: function() {
      // $('#events1').bind('click',function(){
      //   window.location = 'events.html';
      //   return false;
      // });
      // $('#events2').bind('click',function(){
      //   window.location = 'events2.html';
      //   return false;
      // });

      $('#events_list li').live('click',function(){
        localStorage.setItem("event_id", $(this).attr('id'));
        window.location = 'event_show.html';
        return false;
      });
    },

    loadContent: {
      run: function(url) {
        $.mobile.showPageLoadingMsg();
        var ajax_url = url,
          ajax_data = '';
        Core.api.submit(ajax_url, ajax_data, 
        {
          onSuccess: Core.events.loadContent.onSuccess,
          onError: Core.events.loadContent.onError,
          onDenied: Core.events.loadContent.onDenied,
          onComplete: Core.events.loadContent.onComplete
        }
        );
      },

      onSuccess: function(data) {
        // var list = $( "#events_list" );
        // list.empty();
        // $.each(data, function(key, value) {
        //   var li = $('<li></li>').attr('id', value.id);
        //   var a = $('<a></a>');
        //   $('<h3>'+ value.title + '</h3>').appendTo(a);
        //   $('<p>'+ value.description + '</p>').appendTo(a);
        //   a.appendTo(li);
        //   li.appendTo('#events_list');
        // });
        // $('#events_list').listview("refresh");
      },

      onError: function(data) {
        alert(data.error);
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
          onSuccess: Core.events.showEvent.onSuccess,
          onError: Core.events.showEvent.onError,
          onDenied: Core.events.showEvent.onDenied,
          onComplete: Core.events.showEvent.onComplete
        }
        );
      },

      onSuccess: function(data) {
        $("#title").append(data.event.title);
        $("#description").append(data.event.description);
        $("#location").append(data.event.location);
        $("#start").append(data.event.start);
        $("#finish").append(data.event.end);
      },

      onError: function(data) {
        alert(data.error);
      },

      onDenied: function(data) {},

      onComplete: function(data) {
        $.mobile.hidePageLoadingMsg();
      }
    }


  };

  // $( Core.events.init );

  window.Core = Core;

})(jQuery);