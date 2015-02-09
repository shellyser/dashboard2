
angular.module('dashApp')
.controller('SidebarCtrl', function ($scope, $location, program) {
    $scope.isActive = function(route) {
        return route === $location.path();
        console.log($location.path());
    }
    // $scope.$on('click', function() { 
    //     $scope.boolChangeClass = !$scope.boolChangeClass;
    //     console.log($scope.boolChangeClass);
    //     if ($scope.boolChangeClass){
    //         // var sidebar_width = $("aside").width();
    //         // var winW = window.innerWidth
    //         // $("main").css({'width': winW - sidebar_width + 107 + 'px'});          
    //         $("main").addClass("expand");
    //     }
    //     else{
    //         $("main").removeClass("expand");
    //     }

    // });

});