(function () {
    "use strict";

    angular
        .module('ngMovies')
        .controller('newMovieControl', function ($scope, $mdSidenav, $state, $timeout, $mdDialog, movieFactory) {
            var vm = this;
            vm.closeSidebar = closeSidebar;
            vm.saveMovie = saveMovie;

            $timeout(function () {
                $mdSidenav('left').open();
            });

            $scope.$watch('vm.sidenavOpen', function (sidenav) {
                if(sidenav === false){
                    $mdSidenav('left')
                        .close()
                        .then(function () {
                            $state.go('movies');
                        });
                }
            });
            
            function closeSidebar() {
                vm.sidenavOpen = false;
            }

            //## send data to parent controller, then save it.
            function saveMovie(movie){
                if (movie){
                    $scope.$emit('newMovie', movie);
                    vm.sidenavOpen = false;
                }
            }

        });
})();