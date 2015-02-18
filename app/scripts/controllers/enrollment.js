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
	// var cache = $cacheFactory(enrollmentData);
    $scope.viewParameters = {};
    // if (cache.get('defaults') === undefined){
    	$scope.enrollment = enrollmentData;
        console.log(enrollmentData);
        $('#loading').fadeOut();        
        var date;
        if (enrollmentData.Defaults.DateSpan === undefined){
	        date = 7;
	        $scope.enrollment.DateSpan = date;
	        	        console.log(date);

        }
        else{
	        date = enrollmentData.Defaults.DateSpan;
	        console.log(date);
   		 }
        var yesterday = new Date();
        var dayOfMonth = yesterday.getDate();
            yesterday.setDate(dayOfMonth - 1); 
        var tempEndDate = new Date(yesterday),
            tempStartDate = new Date(yesterday);
            tempStartDate.setDate(tempStartDate.getDate() - (date - 1));
        $scope.defaults = {
			 datespan: "Past " + date + " Days",
			 endDay: tempEndDate.getDate(),
			 endMonth: tempEndDate.getMonth() + 1,
			 endYear: tempEndDate.getFullYear(),
			 endDate: (tempEndDate.getMonth() + 1) + '-' + tempEndDate.getDate() + '-' + tempEndDate.getFullYear(),
			 startDay: tempStartDate.getDate(),
			 startMonth: tempStartDate.getMonth() + 1,
			 startYear: tempStartDate.getFullYear(),
			 startDate: (tempStartDate.getMonth() + 1) + '-' + tempStartDate.getDate() + '-' + tempStartDate.getFullYear(),
			 // timespan: enrollmentData.Defaults.Timespan,
			 view: enrollmentData.Defaults.View,
			 unit: enrollmentData.Defaults.Unit,
			 communication: enrollmentData.Defaults.Communication, 
			 modules: enrollmentData.ModuleTypes,
			 viewtype: enrollmentData.Defaults.ViewType
        };
        $scope.radiobutton = $scope.defaults.viewtype;
           if ($scope.enrollment.Products.indexOf('Customer') < 0 && $scope.enrollment.Products.indexOf('customer') < 0){
			$scope.enrollment.Products.push('Customer');
        }
        // $scope.$broadcast('defaults', $scope.defaults);
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
		minDate: moment('2013 01 01', 'YYYY MM DD'),
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