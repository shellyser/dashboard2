'use strict';

angular.module('dashApp')
.factory('enrollmentCache', ['$cacheFactory', function($cacheFactory) {
  return $cacheFactory('myData');
}]);