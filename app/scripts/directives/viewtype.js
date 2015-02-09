'use strict';

/**
 * @ngdoc directive
 * @name dashApp.directive:viewType
 * @description
 * # viewType
 */
angular.module('dashApp')
  .directive('viewType', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, elt) {
        elt.on('change', function(){
          scope.viewParameters.view = elt.val();
          scope.$apply();
        });
      }
    };
  });