(function() {

  "use strict";

    angular
    .module('ngMovies')
    .controller('moviesCtrl', function($scope, $state, $mdSidenav, $mdDialog, $mdToast, movieFactory) {

        //## using scope variable too many places make a user get easily confused
        //## to avoid that variable vm (view model) is used here, variables that points to functions and properties
        //## are placed at the top.
        var vm = this;

        vm.openSidebar      = openSidebar;
        vm.closeSidebar     = closeSidebar;
        vm.saveMovie        = saveMovie;
        vm.editMovie        = editMovie;
        vm.detailMovie      = detailMovie;
        vm.saveEdit         = saveEdit;
        vm.deleteMovie      = deleteMovie;

        vm.movies;
        vm.genre;
        vm.editing;
        vm.movie;

        //## vm.movies grabs movies information from movieFactory and stores them in it.
        vm.movies = movieFactory.ref;

        //## in some special places vm cannot be used such $scope.$on
        //## this method receives data from child controller (movies.new.ctr.js) and save it in DB.
        $scope.$on('newMovie', function (event, movie) {
            vm.movies.$add(movie);
            showToast('Movie Saved');
        });

        $scope.$on('editSaved', function (event, message) {
            showToast(message);
        });

      //## displays message passed down using $mdToas.show method.
      function showToast(message) {
        $mdToast.show(
          $mdToast.simple()
            .content(message)
            .position('top, right')
            .hideDelay(3000)
        );
      }


      function openSidebar () {
          $state.go('movies.new');
      }

      function closeSidebar () {
        $mdSidenav('left').close();
      }

      function saveMovie (movie) {
        if(movie) {
          vm.movies.push(movie);
          vm.movie = {};
          closeSidebar();
          showToast('Moivie Saved');
        }
      }

      function editMovie (movie) {
        $state.go('movies.edit', {
            id: movie.$id              //$id to pass id from firebase
        });
      }

      function detailMovie (movie) {
            $state.go('movies.detail', {
                id: movie.$id              //$id to pass id from firebase
            });
      }

      function saveEdit() {
        vm.editing = false;
        // Need to clear the form after, or else it will be populated when we go to add new Movies
        vm.movie = {};
        closeSidebar();
        showToast('Edit Saved');
      }

      //## delete a movie from DB, it displays a confirmation message to the user.
        function deleteMovie(event, movie) {
        var confirm = $mdDialog.confirm()
            .title('Are you sure you want to delete ' + movie.title + '?')
            .targetEvent(event)
            .ok('Yes')
            .cancel('No');
        $mdDialog.show(confirm).then(function() {
          vm.movies.$remove(movie);
          showToast('Movie Deleted!');
        }, function() {
          vm.status = movie.title + ' is still here.';
        });
      }

    });

})();