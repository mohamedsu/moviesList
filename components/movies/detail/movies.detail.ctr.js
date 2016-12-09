(function () {
    "use strict";

    angular
        .module('ngMovies')
        .controller('detailMoviesCtrl', function ($state, movieFactory) {
            var vm = this;

            //## vm.movies grabs movies information from movieFactory and stores them in it.
            vm.movies = movieFactory.ref;

            //## a specific movie is passed using its id.
            vm.movie = vm.movies.$getRecord($state.params.id);
        });
})();