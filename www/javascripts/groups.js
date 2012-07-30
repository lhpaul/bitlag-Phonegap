(function( $ ) {

  var Core = window.Core || Core || {};

  Core.groups = {

    init: function (){
      Core.auth.requireSession();
      Core.groups.bindEvents();
      Core.groups.loadContent.run();
      //Core.ui.showView();
    },

    bindEvents: function() {
      $('#groups_list li').live('click',function(){
        localStorage.setItem("group_id", $(this).attr('id'));
        window.location = 'show_group.html';
        return false;
      });
    },

    loadContent: {
      run: function() {
        var ajax_url = "groups",
          ajax_data = "id="+Core.auth.user_id.get();
        Core.api.submit(ajax_url, ajax_data, 
        {
          onSuccess: Core.groups.loadContent.onSuccess,
          onError: Core.groups.loadContent.onError,
          onDenied: Core.groups.loadContent.onDenied,
          onComplete: Core.groups.loadContent.onComplete
        }
        );
      },

      onSuccess: function(data) {
        // var list = $( "#groups_list" );
        // list.empty();
        // $.each(data, function(key, value) {
        //   var li = $('<li></li>').attr('id', value.id);
        //   var a = $('<a></a>');
        //   $('<h3>'+ value.name + '</h3>').appendTo(a);
        //   $('<p>'+ value.description + '</p>').appendTo(a);
        //   a.appendTo(li);
        //   li.appendTo('#groups_list');
        // });
        // $("#groups_list").listview("refresh");
      },

      onError: function(data) {
        alert(data.error);
      },

      onDenied: function(data) {},

      onComplete: function(data) {}
    },
    showGroup: {
      run: function(id) {
        var ajax_url = "group",
          ajax_data = 'id='+id;
        Core.api.submit(ajax_url, ajax_data, 
        {
          onSuccess: Core.groups.showGroup.onSuccess,
          onError: Core.groups.showGroup.onError,
          onDenied: Core.groups.showGroup.onDenied,
          onComplete: Core.groups.showGroup.onComplete
        }
        );
      },

      onSuccess: function(data) {
        $("#name").append(data.name);
        $("#description").append(data.description);
      },

      onError: function(data) {
        alert(data.error);
      },

      onDenied: function(data) {},

      onComplete: function(data) {}
    }

  };

  //$( Core.groups.init );

  window.Core = Core;

})(jQuery);