'use strict';


/**
 * @ngdoc directive
 * @name dashApp.directive:dateSpan
 * @description
 * # dateSpan
 */
angular.module('dashApp')
  .directive('dateSpan', function ($timeout) {
    return {
      restrict: 'A',
      link: function postLink($scope, elt, attrs) {
        elt.on('click', function(){
          if (!(elt.hasClass('disabled'))){
            var newStartDate = $('#start-date-input').val(),
                newEndDate = $('#end-date-input').val(),
                newStartMonth = newStartDate.split('/')[0],
                newStartDay = newStartDate.split('/')[1],
                newStartYear = newStartDate.split('/')[2],
                newStartParam = newStartMonth + '-' + newStartDay + '-' + newStartYear,
                newEndMonth = newEndDate.split('/')[0],
                newEndDay = newEndDate.split('/')[1],
                newEndYear = newEndDate.split('/')[2],
                newEndParam = newEndMonth + '-' + newEndDay + '-' + newEndYear;
                console.log($scope.viewParameters);
            if (($scope.viewParameters.startDate !== newStartParam) || ($scope.viewParameters.endDate !== newEndParam)){
              $timeout(function(){
                if ($scope.viewParameters.startDate !== newStartParam){
                  $scope.viewParameters.startDate = newStartParam;
                  $scope.viewParameters.startDay = newStartDay;
                  $scope.viewParameters.startMonth = newStartMonth;
                  $scope.viewParameters.startYear = newStartYear;
                }
                if ($scope.viewParameters.endDate !== newEndParam){
                  $scope.viewParameters.endDate = newEndParam;
                  $scope.viewParameters.endDay = newEndDay;
                  $scope.viewParameters.endMonth = newEndMonth;
                  $scope.viewParameters.endYear = newEndYear;
                }
                $('#date-range-trigger').click();
              });
            }
          }
        });
      }
    };
  });