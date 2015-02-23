'use strict';
/*global $:false */

/**
 * @ngdoc function
 * @name dashApp.controller:BaseCtrl
 * @description
 * # BaseCtrl
 * Controller of the dashApp
 */
angular.module('dashApp')
.controller('EnrollmentCtrl',  function ($scope, enrollmentData, user, $rootScope, $cacheFactory) {
	// if (cache !== undefined){
	// 	cache.removeAll();
	// }
	var cache = $cacheFactory(enrollmentData);
  // $scope.viewParameters = {};
  // if (cache.get('defaults') === undefined){
	$scope.enrollment = enrollmentData;
  $('#loading').fadeOut();        
  var date = 7;
  if (enrollmentData.Defaults.DateSpan === undefined){
    $scope.enrollment.DateSpan = date;
  }
  else{
    date = enrollmentData.Defaults.DateSpan;
	}
	var endDate = moment().endOf('day').subtract(1, 'days').format("MM/DD/YYYY"),
			startDate = moment().startOf('day').subtract(7, 'days').format("MM/DD/YYYY");
	$scope.defaults = {
		endDate: endDate,
		startDate: startDate,
		view: enrollmentData.Defaults.View,
		product: enrollmentData.Defaults.Product,
		communication: enrollmentData.Defaults.Communication, 
		viewtype: enrollmentData.Defaults.ViewType
	}

	$scope.radiobutton = $scope.defaults.viewtype;

	if ($scope.enrollment.Products.indexOf('Customer') < 0 && $scope.enrollment.Products.indexOf('customer') < 0){
		$scope.enrollment.Products.push('Customer');
  }
  
  $scope.$broadcast('defaults', $scope.defaults);
  $scope.viewParameters = $scope.defaults;
	        // cache.put('defaults', $scope.defaults);
    // }
    // else{
    //   // $scope.$broadcast('defaults', cache.get('defaults'));
    //   // $scope.viewParameters = cache;
    //   cache.get('defaults', $scope.defaults);
    // }
	// if ($scope.defaults !== undefined){
	//   $scope.viewParameters = $scope.defaults;
	//   console.log($scope.viewParameters);
	// }
	$scope.total = 0;
	$scope.mapData = {};
	$scope.graphsData = {};

	$scope.dateRange = {
		startDate: moment().subtract(7, 'days'),
		endDate: moment().subtract(1, 'days'),
		minDate: moment('2014 01 01', 'YYYY MM DD'),
		maxDate: moment().subtract(1, 'days')
	}

	// $scope.drawGraph = function(id){
 //        $scope.$broadcast('redraw', id);
 //     };
      $scope.$on('defaults', function(event, data){
        $scope.viewParameters = $scope.defaults;
         console.log($scope.viewParameters);
      });
});