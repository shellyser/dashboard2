angular.module('dashApp')
.controller('DistributedCtrl',  function ($scope, Enrollmentdata) {
	var distributedModule = 'distributed';
	$scope.count = { total: 0 };
	$scope.deliveries = ["Total", "ViaInstaller", "ViaPost"];
	$scope.distributedparams = {};
	$scope.distributedparams.deliverySelected = $scope.deliveries[0];
	$scope.statuses = ['delivered', 'shipped'];
	$scope.statusSelected = ['delivered', 'shipped'];
	$scope.noData = false;

        var updateSelected = function(action, status) {
    	  if (action === 'add' && $scope.statusSelected.indexOf(status) === -1) {
    	    $scope.statusSelected.push(status);
    	  }
    	  if (action === 'remove' && $scope.statusSelected.indexOf(status) !== -1) {
    	    $scope.statusSelected.splice($scope.statusSelected.indexOf(status), 1);
    	  }
    	};

    	$scope.updateStatusSelection = function($event, status) {
    	  var checkbox = $event.target;
    	  var action = (checkbox.checked ? 'add' : 'remove');
    	  updateSelected(action, status);
    	};

    	$scope.isStatusSelected = function(status) {
      	return $scope.statusSelected.indexOf(status) >= 0;
    	};

     $scope.$watch('params', function(newValue, oldValue) {
             if (newValue){
                 $scope.drawGraph = function (){
             		Enrollmentdata[distributedModule]({"startDate": null, "endDate": null, "product": null}).$promise.then(function (result) {
             	    	parseGraphData(result);	
             		})
                 }();
             }
     }, true);

     $scope.$watch('distributedparams', function(newValue, oldValue) {
             if (newValue){
                 $scope.drawGraph = function (){
             		Enrollmentdata[distributedModule]({"delivery": null}).$promise.then(function (result) {
             	    	if ($scope.params.commTypeSelected.length > 0){
             	    		parseGraphData(result);
             	    		$scope.noData = false;
             	    	}
             	    	else{
             	    		$scope.noData = true;
             	    	}	
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
			distributedData = {},
			graphData = {},
			dataPointsDayByDay = {},
			dataPointsCum = {},
			counter = 0,
			cumulativeCounter = 0,
			pointNumber,
			selectedYear = $scope.year;
			
		if (params.commTypeSelected.length === 0){
			$scope.noData = true;
		}
		else{
			//add selected communication types to distributedData and set their values
			for (var i in params.commTypeSelected){
				var list = params.commTypeSelected[i].toLowerCase();
				distributedData[list] = data.years[selectedYear].data.GraphingData[list];
			}

			//track # of undefined lists within distributedData
			var undefinedListsCount = 0,
			definedlistsCount = 0;
			for (var distributedList in distributedData){
				if (!distributedData[distributedList]){
					undefinedListsCount++;
				}
				else{
					if(definedlistsCount === 0){
						dates = Object.keys(distributedData[distributedList].data);
					}
					definedlistsCount++;
				}
			}

			// make sure distributedData has at least one defined communication list
			if (definedlistsCount > 0) {
				numberOfPoints = dates.length;
				//   init daybyday view graphPoints array with 0s
				pointsDayByDay = Array.apply(null, new Array(numberOfPoints)).map(Number.prototype.valueOf,0);
				//   init cumulative view graphPoints array with cumulativeTotal
				pointsCum = Array.apply(null, new Array(numberOfPoints)).map(Number.prototype.valueOf,0);

				for (var distributedList in distributedData){
					if (distributedData[distributedList] !== undefined){
						var eltCounter = 0;
						cumulativeCounter += distributedData[distributedList].cumulativeTotal;
						for (var elt in distributedData[distributedList].data){
							// add this value to the y-value of the relevant point
							var value = distributedData[distributedList].data[elt];
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
				
				//add to scope graph data depending on the viewtype
				if ($scope.params.viewtype === "DayByDay"){
					graphData.datasets.push(dataPointsDayByDay);
					$scope.count = { total: counter};
				} else {
					graphData.datasets.push(dataPointsCumulative);
					$scope.count = { total: cumulativeCounter};	
				}
				$scope.graph = graphData;
				$scope.noData = false;
			}
		}
	}

	//no data for this module -- don't draw a graph.
	// function noData(){
	// 	elt.parent().hide();
	// 	showGraphArea(false);
	// 	elt.closest('.module-body').find('.module-body-stat').text('\u2014');
	// 	elt.closest('.module-body').prev().find('.module-stat').text('\u2014');
	// }
});