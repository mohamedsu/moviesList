(function() {

  "use strict";

  angular
    .module('ngMovies', ['ngMaterial', 'ui.router', 'firebase'])
    .config(function($mdThemingProvider, $stateProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('indigo')
        .accentPalette('lime');


        //## ui-router is used to display views.
        $stateProvider
        //## home page of the app, sample address (http://localhost:8080/#
            .state('movies', {
                url: '/movies',
                templateUrl: 'components/movies/movie.tpl.html',
                controller: 'moviesCtrl as vm'
            })
            .state('movies.new', {
                url: '/new',
                templateUrl: 'components/movies/new/movies.new.tpl.html',
                controller: 'newMovieControl as vm'
            })
            .state('movies.edit', {
                url: '/edit/:id',
                templateUrl: 'components/movies/edit/movies.edit.tpl.html',
                controller: 'editMoviesCtrl as vm',
                params: {
                    movie: null
                }
            })
            .state('movies.detail', {
                url: '/detail/:id',
                templateUrl: 'components/movies/detail/movies.detail.tpl.html',
                controller: 'detailMoviesCtrl as vm',
                params: {
                    movie: null
                }
            })

    });
        
})();

