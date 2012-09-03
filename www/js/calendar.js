(function($) {

  var Core = window.Core || Core || {};

  Core.calendar = {

    init: function() {
      Core.calendar.bindEvents();
      Core.calendar.loaded = false;
      dhx.Touch.disable();
    },

    bindEvents: function() {
      $("#calendar-pg").live("pageshow", function() {
        Core.calendar.loadCalendar();
        dhx.Touch.enable();
      });
      $("#calendar-pg").live("pagehide", function() {
        dhx.Touch.disable();
      });
    },

    loadCalendar: function() {
      Core.calendar.loaded = true;
      scheduler.config.readonly = true;
      $("#scheduler").height(Core.body_height);
      dhx.ready(function() {
        dhx.ui({
          container: "scheduler",
          view: "scheduler",
          id: "scheduler"
        });
      });
      //alert($('.dhx_toolbar').height());
      $$('scheduler').$$('month').show();
      $$('scheduler').$$('bottomBar').hide();
      Core.calendar.loaded = true;
    }

  };

  $(Core.calendar.init);

  window.Core = Core;

})(jQuery);