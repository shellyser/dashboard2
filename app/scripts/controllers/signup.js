angular.module('dashApp')
.controller('SignupCtrl',  function ($scope, Enrollmentdata) {
    var signupModule = 'signup';
    $scope.count = { total: 0 };

    

  //   $scope.drawGraph = function (value){
		// Enrollmentdata[signupModule]({"startDate": null, "endDate": null, "product": null}).$promise.then(function (result) {
	 //    	parseGraphData(result, value);	
		// })
  //   }();

     $scope.$watch('viewtype', function(newValue, oldValue) {
        if (newValue){
            $scope.drawGraph = function (){
            		Enrollmentdata[signupModule]({"startDate": null, "endDate": null, "product": null}).$promise.then(function (result) {
            	    	parseGraphData(result);	
            		})
                }();
        }
    }, true);
	
	function parseGraphData(data){
		var params = $scope.enrollment,
			dates = [],
				labels = [],
				pointsDayByDay = [],
				pointsCum = [],
				signupData = {},
				graphData = {},
				dataPointsDayByDay = {},
				dataPointsCum = {},
				counter = 0,
				cumCounter = 0;
			
		signupData = data.Cohort[0][2014].graphData;
		cumCounter = data.Cohort[0][2014].totals;
		dates = Object.keys(signupData);

		for (var i in dates){
			labels.push(dates[i].slice(0, -5));
		}

		for (var key in signupData){
			pointsDayByDay.push(signupData[key]);
			counter = counter + signupData[key];
			cumCounter = cumCounter + signupData[key];
			pointsCum.push(signupData[key]+ cumCounter);
		}

		dataPointsDayByDay = {
			label: "DayByDay",
			data: pointsDayByDay
		}

		dataPointsCumulative = {
			label: "Cumulative",
			data: pointsCum
		}

		graphData.labels = labels;
		graphData.datasets = [];
		
		if ($scope.viewtype === "DayByDay"){
			graphData.datasets.push(dataPointsDayByDay);
			$scope.count = { total: counter};
		} else {
			graphData.datasets.push(dataPointsCumulative);
			$scope.count = { total: cumCounter};	
		}

		$scope.graph = graphData;
		
		
	}

	function noData(){
	  	elt.parent().hide();
	  	showGraphArea(false);
	  	elt.closest('.module-body').find('.module-body-stat').text('\u2014');
	  	elt.closest('.module-body').prev().find('.module-stat').text('\u2014');
  }
});