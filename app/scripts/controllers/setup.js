angular.module('dashApp')
.controller('SetupCtrl',  function ($scope, SetupModel) {
    var setupModule = 'setup';
    $scope.count = { total: 0 };
    $scope.devices = ['modlets', 'thermostats'];
    $scope.deviceSelected = ['modlets', 'thermostats'];
    $scope.noData = false;
	var dailyCounterArray = [],
		cumulativeCounterArray = [],
		graphDataArray = [];


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
     		$scope.graph = [];
	 		dailyCounterArray = [];
	 		cumulativeCounterArray = [];
	 		graphDataArray = [];
		 	if ($scope.params.product === "AC"){
		 		var params1 = {
		 			param1: null, //$scope.params.startDate,
		 			param2: null, //$scope.params.endDate,
		 			param3: null, //$scope.params.product,
		 			param4: null //$scope.devices[0],
		 		}
		 		var config1 = {
		 			params: params1
		 		}
		 		var params2 = {
		 			param1: null, //$scope.params.startDate,
		 			param2: null, //$scope.params.endDate,
		 			param3: null, //$scope.params.product,
		 			param4: null //$scope.devices[1]
		 		}
		 		var config2 = {
		 			params: params2
		 		}
		 		SetupModel.getSetupsDevices(config1, config2)
		 			.then(function(result){
		 				console.log(result);
		 				parseGraphData(result);
		 			})
	 		} else {
	 			var params = {
	 				param1: null, //$scope.params.startDate,
	 				param2: null, //$scope.params.endDate,
	 				param3: null, //$scope.params.product,
	 			};
	 			var config = {
	 				params: params
	 			};
	 			SetupModel.getSetups(config)
	 				.then(function(result){
	 					console.log(result);
	 					parseGraphData(result);
	 				})
		 	}
		};
	}, true);
	
	function parseGraphData(data){
		for (var dataset in data){

		var params = $scope.params,
			counter = 0,
			cumulativeCounter = 0,
			graphData = {},
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
					setupData[list] = data[dataset].years[selectedYear].data.GraphingData[list];
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
					dailyCounterArray.push(counter);
					cumulativeCounterArray.push(cumulativeCounter);
					
					for (var i in dates){
						labels.push(dates[i].slice(0, -5));
					}

					dataPointsDayByDay = {
						data: pointsDayByDay
					}

					dataPointsCumulative = {
						data: pointsCum
					}

					graphData.labels = labels;
					// graphData.datasets = [];
					
					if ($scope.params.viewtype === "DayByDay"){
						graphData.datasets= dataPointsDayByDay;
						$scope.countArray = { total: dailyCounterArray};
					} else {
						graphData.datasets= dataPointsCumulative;
						$scope.countArray = { total: cumulativeCounterArray};	
					}
					graphDataArray.push(graphData);
				}
			}
		}	
		$scope.graph = graphDataArray;
	}
	// $scope.$on("graph", function(event) {
	//     $scope.graph = graphData;
	// });
	// no data for this module -- don't draw a graph.
	// function noData(){
	// 	elt.parent().hide();
	// 	showGraphArea(false);
	// 	elt.closest('.module-body').find('.module-body-stat').text('\u2014');
	// 	elt.closest('.module-body').prev().find('.module-stat').text('\u2014');
	// }
});