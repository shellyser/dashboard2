

angular.module('dashApp')
.controller('OnlineCtrl',  function ($scope, Enrollmentdata) {
    var onlineModule = 'online';
    $scope.count = { total: 0 };
    $scope.devices = ["ACs", "CallableLoad(KW)"];
    $scope.deviceChosen = $scope.devices[0];

     $scope.$watch('params', function(newValue, oldValue) {
             if (newValue){
                 $scope.drawGraph = function (){
             		Enrollmentdata[onlineModule]({"startDate": null, "endDate": null, "product": null}).$promise.then(function (result) {
             	    	parseGraphData(result);	
             		})
                 }();
             }
     }, true);

     $scope.$watch('deviceChosen', function(newValue, oldValue) {
             if (newValue){
                 $scope.drawGraph = function (){
             		Enrollmentdata[onlineModule]({"device": null}).$promise.then(function (result) {
             	    	parseGraphData(result);	
             		})
                 }();
             }
     }, true);
	
	function parseGraphData(data){
		var params = $scope.params,
			dates = [],
			labels = [],
			pointsDayByDay = [],
			pointsCum = [],
			onlineData = {},
			graphData = {},
			dataPointsDayByDay = {},
			dataPointsCum = {},
			counter = 0,
			cumulativeCounter = 0,
			pointNumber,
			selectedYear = $scope.year;
			
		if (params.commTypeSelected.length === 0){
			// noData();
		}
		else{
			//add selected communication types to onlineData and set their values
			for (var i in params.commTypeSelected){
				var list = params.commTypeSelected[i].toLowerCase();
				onlineData[list] = data.years[selectedYear].data.GraphingData[list];
			}

			//track # of undefined lists within onlineData
			var undefinedListsCount = 0,
			definedlistsCount = 0;
			for (var onlineList in onlineData){
				if (!onlineData[onlineList]){
					undefinedListsCount++;
				}
				else{
					if(definedlistsCount === 0){
						dates = Object.keys(onlineData[onlineList].data);
					}
					definedlistsCount++;
				}
			}

			// make sure onlineData has at least one defined communication list
			if (definedlistsCount > 0) {
				numberOfPoints = dates.length;
				//   init daybyday view graphPoints array with 0s
				pointsDayByDay = Array.apply(null, new Array(numberOfPoints)).map(Number.prototype.valueOf,0);
				//   init cumulative view graphPoints array with cumulativeTotal
				pointsCum = Array.apply(null, new Array(numberOfPoints)).map(Number.prototype.valueOf,0);

				for (var onlineList in onlineData){
					if (onlineData[onlineList] !== undefined){
						var eltCounter = 0;
						cumulativeCounter += onlineData[onlineList].cumulativeTotal;
						for (var elt in onlineData[onlineList].data){
							// add this value to the y-value of the relevant point
							var value = onlineData[onlineList].data[elt];
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
				graphData.datasets = [];
				
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
	function createGraphDatasets(){

	}
	// no data for this module -- don't draw a graph.
	// function noData(){
	// 	elt.parent().hide();
	// 	showGraphArea(false);
	// 	elt.closest('.module-body').find('.module-body-stat').text('\u2014');
	// 	elt.closest('.module-body').prev().find('.module-stat').text('\u2014');
	// }
});