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

	// var endDate = moment().endOf('day').subtract(1, 'days').format("MM/DD/YYYY"),
	// 		startDate = moment().startOf('day').subtract(7, 'days').format("MM/DD/YYYY");
	
	// $scope.params = {
	// 	endDate:  endDate,
	// 	startDate: startDate
	// };
	var communication = $scope.enrollment.CommunicationTypes;
	$scope.year = $scope.enrollment.TimePeriods[0];
	$scope.params = {};
	$scope.params.viewtype = $scope.enrollment.ViewTypes[0];
	$scope.params.product = $scope.enrollment.Products[0];
	$scope.radiobutton = $scope.enrollment.ViewForms[0];
	// $scope.params.commSelection = [];
	$scope.params.commSelection = communication;

	$scope.toggleCommSelection = function toggleCommSelection(commType) {
	    var idx = $scope.params.commSelection.indexOf(commType);

	    // is currently selected
	    if (idx > -1) {
	      $scope.params.commSelection.splice(idx, 1);
	    }

	    // is newly selected
	    else {
	      $scope.params.commSelection.push(commType);
	    }
	  };

	if ($scope.enrollment.Products.indexOf('Customer') < 0 && $scope.enrollment.Products.indexOf('customer') < 0){
		$scope.enrollment.Products.push('Customer');
  }
  
	$scope.drawGraph = {};

	$scope.dateRange = {
		// endDate:  moment().endOf('day').subtract(1, 'days'),
		// startDate:  moment().startOf('day').subtract(7, 'days'),
		minDate: moment('2014 01 01', 'YYYY MM DD'),
		maxDate: moment().subtract(1, 'days')
	}

	$scope.modulePath = function(){
			$scope.moduleUrl = 'views/enrollment/' + module + '.html';
			$scope.moduleControllerName = module + 'Ctrl';
	}
	// $scope.$on('dateRange', function (events, args){
	// 	console.log(args, events); 
	// })

	// $scope.params.dates = $scope.dateRange;

});