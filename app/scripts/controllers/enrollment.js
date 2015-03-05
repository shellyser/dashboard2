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

  var cache = $cacheFactory(enrollmentData);
  var date = 7;

  $scope.enrollment = enrollmentData;
  $('#loading').fadeOut();        

  if (enrollmentData.DateSpan === undefined){
    $scope.enrollment.DateSpan = date;
  }
  else{
    date = enrollmentData.DateSpan;
	}

	var endDate = moment().endOf('day').subtract(1, 'days').format("MM/DD/YYYY"),
			startDate = moment().startOf('day').subtract(7, 'days').format("MM/DD/YYYY");
	
	$scope.params = {
		endDate:  endDate,
		startDate: startDate
	};

	$scope.params.viewtype = $scope.enrollment.ViewTypes[0];
	$scope.params.product = $scope.enrollment.Products[0];

	$scope.radiobutton = $scope.enrollment.ViewForms[0];

	if ($scope.enrollment.Products.indexOf('Customer') < 0 && $scope.enrollment.Products.indexOf('customer') < 0){
		$scope.enrollment.Products.push('Customer');
  }
  
	$scope.drawGraph = {};

	$scope.update_graph = function(){
		console.log($scope);
	};

	$scope.dateRange = {
		startDate: moment().subtract(7, 'days'),
		endDate: moment().subtract(1, 'days'),
		minDate: moment('2014 01 01', 'YYYY MM DD'),
		maxDate: moment().subtract(1, 'days')
	}

});