(function() {

  "use strict";

  angular
    .module('ngMovies')
    .factory('movieFactory', function($http, $firebaseArray) {

        //## establish DB connection and return data in ref variable.
      var ref = new Firebase('https://ngmovies-f6bb1.firebaseio.com/');

      return {
          ref: $firebaseArray(ref)
      }
      
    });
    
})();