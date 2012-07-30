(function( $ ) {

  var Core = window.Core || Core || {};

  Core.upload = {

    init: function (){
      Core.auth.requireSession();
      Core.ui.showView();
      Core.upload.bindEvents();
    },

    bindEvents: function() {
      $('#upload_photo').bind('click',function(){
        Core.upload.photo.get(pictureSource.PHOTOLIBRARY);
        return false;
      });

      $('#upload_camera').bind('click',function(){
        Core.upload.photo.capture();
        return false;
      });
    },

    photo: {

      get: function(source) {
        navigator.camera.getPicture(Core.upload.photo.onSuccess, Core.upload.photo.onFail,
          {
            quality: 50,
            sourceType: source
          }
        );
      },

      capture: function capturePhoto() {
        navigator.camera.getPicture(Core.upload.photo.onSuccess, Core.upload.photo.onFail, { quality: 50 });
      },

      onSuccess: function(imageData) {

        image = $("<img>", {
          'src': "data:image/jpeg;base64," + imageData,
          'style': "width:60px;height:60px;"
        });

        image.appendTo('#photo_wrap');
      },

      onFail: function(message) {
        alert(message);
      }
    }

  };

  $( Core.upload.init );

  window.Core = Core;

})(jQuery);
