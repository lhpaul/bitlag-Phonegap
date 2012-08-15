(function( $ ) {

  var Core = window.Core || Core || {};

  Core.auth = {

    user_id:{
      set: function(id){
        localStorage.setItem("user_id", id);
      },

      get: function(){
        return localStorage.getItem("user_id");
      },

      destroy: function() {
        localStorage.removeItem("user_id");
      }
    },

    authToken: {

      set: function( token, lifetime ) {
        var expires = new Date();
        expires.setDate(expires.getDate() + lifetime);

        localStorage.setItem("auth_token", token);
        localStorage.setItem("auth_token_expiration", expires.toGMTString());
      },

      get: function() {
        return localStorage.getItem("auth_token");
      },

      expiration: function() {
        return localStorage.getItem("auth_token_expiration");
      },

      destroy: function() {
        localStorage.removeItem("auth_token_expiration");
        localStorage.removeItem("auth_token");
      }

    },

    isAuthenticated: function() {
      if( Core.auth.authToken.get() !== null){
        return true;
      } else {
        return false;
      }
    },

    isNotAuthenticated: function() {
      if( Core.auth.authToken.get() !== null ){
        return false;
      } else {
        return true;
      }
    },

    requireSession: function() {
      if( !Core.auth.isAuthenticated() ) {
        window.location = 'login.html';
      }
    },

    requireNoSession: function() {
      if( Core.auth.isAuthenticated() ) {
        window.location = 'index.html';
      }
    },

    logout: function() {
      Core.auth.authToken.destroy();
      Core.auth.user_id.destroy();
      window.location = 'login.html';
    }

  };

  window.Core = Core;

})(jQuery);

