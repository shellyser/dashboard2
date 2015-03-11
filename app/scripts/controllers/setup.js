angular.module('dashApp')
.controller('SetupCtrl',  function ($scope, Enrollmentdata) {
    var setupModule = 'setup';
    $scope.count = { total: 0 };
    $scope.devices = ['thermostats', 'modlets'];
    $scope.deviceSelected = ['thermostats', 'modlets'];
    $scope.noData = false;
	var graphData = {},
		counter = 0,
		cumulativeCounter = 0;


    var updateSelected = function(action, deviceType) {
		if (action === 'add' && $scope.deviceSelected.indexOf(deviceType) === -1) {
			$scope.deviceSelected.push(deviceType);
		}
		if (action === 'remove' && $scope.deviceSelected.indexOf(deviceType) !== -1) {
			$scope.deviceSelected.splice($scope.deviceSelected.indexOf(deviceType), 1);
		}
	};

	$scope.updateDeviceSelection = function($event, deviceType) {
		var checkbox = $event.target;
		var action = (checkbox.checked ? 'add' : 'remove');
		updateSelected(action, deviceType);
	};

	$scope.isDeviceSelected = function(deviceType) {
  		return $scope.deviceSelected.indexOf(deviceType) >= 0;
	};


     $scope.$watch('params', function(newValue, oldValue) {
		if (newValue){
			$scope.drawGraph = function (){
				graphData = {};
		 		graphData.datasets = [];
		 		counter = 0;
		 		cumulativeCounter = 0;
			 	if ($scope.params.product === "AC"){
			 		for (var i in $scope.deviceSelected){
						Enrollmentdata[setupModule]({"startDate": null, "endDate": null, "product": null, "device": null}).$promise.then(function (result) {
				    		parseGraphData(result);	
				    	})
			 		}
		 		} else {
					Enrollmentdata[setupModule]({"startDate": null, "endDate": null, "product": null}).$promise.then(function (result) {
			    		parseGraphData(result);	
			    	})
			 	}
			}();
	 	}
	}, true);

     $scope.$watch('deviceSelected', function(newValue, oldValue) {
		if (newValue){
			$scope.drawGraph = function (){
				graphData = {};
				graphData.datasets = [];
				counter = 0;
				cumulativeCounter = 0;
		 		for (var i in $scope.deviceSelected){
					Enrollmentdata[setupModule]({"startDate": null, "endDate": null, "product": null, "device": null}).$promise.then(function (result) {
			    		parseGraphData(result);	
			    	})
			    }
			}();
		}
     }, true);
	
	function parseGraphData(data){
		var params = $scope.params,
			dates = [],
			labels = [],
			pointsDayByDay = [],
			pointsCum = [],
			setupData = {},
			dataPointsDayByDay = {},
			dataPointsCum = {},
			counterArray = [],
			cumCounterArray = [],
			// pointNumber,
			selectedYear = $scope.year;
			
		if (params.commTypeSelected.length === 0){
			// noData();
		}
		else{
			//add selected communication types to setupData and set their values
			for (var i in params.commTypeSelected){
				var list = params.commTypeSelected[i].toLowerCase();
				setupData[list] = data.years[selectedYear].data.GraphingData[list];
			}

			//track # of undefined lists within setupData
			var undefinedListsCount = 0,
			definedlistsCount = 0;
			for (var setupList in setupData){
				if (!setupData[setupList]){
					undefinedListsCount++;
				}
				else{
					if(definedlistsCount === 0){
						dates = Object.keys(setupData[setupList].data);
					}
					definedlistsCount++;
				}
			}

			// make sure setupData has at least one defined communication list
			if (definedlistsCount > 0) {
				numberOfPoints = dates.length;
				//   init daybyday view graphPoints array with 0s
				pointsDayByDay = Array.apply(null, new Array(numberOfPoints)).map(Number.prototype.valueOf,0);
				//   init cumulative view graphPoints array with cumulativeTotal
				pointsCum = Array.apply(null, new Array(numberOfPoints)).map(Number.prototype.valueOf,0);

				for (var setupList in setupData){
					if (setupData[setupList] !== undefined){
						var eltCounter = 0;
						cumulativeCounter += setupData[setupList].cumulativeTotal;
						for (var elt in setupData[setupList].data){
							// add this value to the y-value of the relevant point
							var value = setupData[setupList].data[elt];
							cumulativeCounter += value;
							counter += value;
							pointsDayByDay[eltCounter] += value;
							pointsCum[eltCounter] = cumulativeCounter;
							eltCounter ++;
						}
					}
				}
				pointsDayByDay = pointsDayByDay;
				pointsCum = pointsCum;
				
				for (var i in dates){
					labels.push(dates[i].slice(0, -5));
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
				// graphData.datasets = [];
				
				if ($scope.params.viewtype === "DayByDay"){
					graphData.datasets.push(dataPointsDayByDay);
					$scope.count = { total: counter};
				} else {
					graphData.datasets.push(dataPointsCumulative);
					$scope.count = { total: cumulativeCounter};	
				}
				$scope.graph = graphData;
			}
		}
	}

	// no data for this module -- don't draw a graph.
	// function noData(){
	// 	elt.parent().hide();
	// 	showGraphArea(false);
	// 	elt.closest('.module-body').find('.module-body-stat').text('\u2014');
	// 	elt.closest('.module-body').prev().find('.module-stat').text('\u2014');
	// }
});