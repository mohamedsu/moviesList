(function () {
    "use strict";

    angular
        .module('ngMovies')
        .controller('editMoviesCtrl', function ($scope, $mdSidenav, $state, $timeout, $mdDialog, movieFactory) {
            var vm = this;
            vm.movies = movieFactory.ref;
            vm.movie = vm.movies.$getRecord($state.params.id);
            vm.closeSidebar = closeSidebar;
            vm.saveEdit = saveEdit;

            //## without timeout function buttons on sidebar will not work
            $timeout(function () {
                $mdSidenav('left').open();
            });

            //## watch for sidenav property, close sidebar when sidenav is false and change the address
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

            function saveEdit(){
                vm.movies.$save(vm.movie).then(function () {
                    $scope.$emit('editSaved', 'Edit Saved');
                    vm.sidenavOpen = false;
                });
            }

        });
})();