

angular.module('dashApp')
.controller('SetupCtrl',  function ($scope, Enrollmentdata) {
    var distributedModule = 'setup';
    $scope.count = { total: 0 };

     $scope.$watch('params', function(newValue, oldValue) {
        if (newValue){
            // $scope.drawGraph = function (){
        		Enrollmentdata[distributedModule]({"startDate": null, "endDate": null, "product": null}).$promise.then(function (result) {
        	    	checkData(result);	
        		})
            // }();
        }
    }, true);

    function checkData(data){
		var selectedYear = $scope.year;
    	var setupData = data.years[selectedYear].data.GraphingData;
    	if (jQuery.isEmptyObject(setupData)){
			$scope.graph = {};
		}
		else {
			parseGraphData(data);
		}
    }
	
	function parseGraphData(data){
		var params = $scope.params,
			dates = [],
			labels = [],
			pointsDayByDay = [],
			pointsCum = [],
			setupData = {},
			graphData = {},
			dataPointsDayByDay = {},
			dataPointsCum = {},
			counter = 0,
			cumulativeCounter = 0,
			pointNumber,
			selectedYear = $scope.year;
			
		setupData = data.years[selectedYear].data.GraphingData;
		cumulativeCounter = data.years[selectedYear].cumulativeTotal;
		communications = Object.keys(setupData);
		 var tempCommunicationSelected = params.commSelection,
		 communicationSelected = [];

		for (var i = 0, L=tempCommunicationSelected.length ; i < L; i++) {
		  communicationSelected[i]=tempCommunicationSelected[i].toLowerCase();
		}
		
		for (var comm in communications){
			var commIndex = communicationSelected.indexOf(communications[comm].toLowerCase());
			if (commIndex === -1){
				delete setupData[communications[comm]];
			}
			else{
				var numberOfPoints = 0;
				for (var key in setupData[communications[comm]].data) {
					numberOfPoints++; 
				}
			}
	    	if (jQuery.isEmptyObject(setupData)){
				$scope.graph = {};
				return false;
			}
		}

		pointsDayByDay = Array.apply(null, new Array(numberOfPoints)).map(Number.prototype.valueOf,0);
		pointsCum = Array.apply(null, new Array(numberOfPoints)).map(Number.prototype.valueOf,cumulativeCounter);

		for (var index in communicationSelected){
			var commData = setupData[communicationSelected[index]].data;
			var i = 0, 
				arrayValue = 0;
			dates = Object.keys(commData);
			Object.keys(commData).forEach(function (key) { 
			    var value = commData[key]
				pointsDayByDay[i] = pointsDayByDay[i] + value;
				pointsCum[i] = pointsCum[i] + value;
				counter = counter + value;
				cumulativeCounter = cumulativeCounter + value;
				i++;
			})
			pointsDayByDay = pointsDayByDay.reverse();
			pointsCum = pointsCum.reverse();
		}

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

		graphData.labels = labels.reverse();
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
});