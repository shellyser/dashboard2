

angular.module('dashApp')
.controller('SignupCtrl',  function ($scope, Enrollmentdata) {
    
    var signupModule = 'signup';
    var signup = this;
    signup.count = { total: 0 };

	signup.$watch('params', function(newValue, oldValue) {
        if (newValue){
            signup.getData = function (){
        		Enrollmentdata[signupModule]({"startDate": null, "endDate": null, "product": null}).$promise.then(function (result) {
        	    	// parseMapData(result);	
        	    	parseGraphData(result);
        		})
            }();
        }
    }, true);
	
	function parseGraphData(data){
		var params = signup.params,
			dates = [],
			labels = [],
			pointsDayByDay = [],
			pointsCum = [],
			signupData = {},
			graphData = {},
			dataPointsDayByDay = {},
			dataPointsCum = {},
			counter = 0,
			cumCounter = 0,
			selectedYear = signup.year;
		
		//grab data for graphing
		signupData = data.years[selectedYear].data.GraphingData;

		//get cumulative total
		cumCounter = data.years[selectedYear].cumulativeTotal;
		
		//keys of graphing data are the dates
		dates = Object.keys(signupData);

		//take the year out of all the dates to shorten the labels
		for (var i in dates){
			labels.push(dates[i].slice(0, -5));
		}


		for (var key in signupData){
			//insert value for each key into the pointDayByDay area
			pointsDayByDay.push(signupData[key]);
			//keep track of the total values
			counter = counter + signupData[key];
			//keep track of the cumulative total
			cumCounter = cumCounter + signupData[key];
			//insert the cumulative total for each day into the pointCum array
			pointsCum.push(cumCounter);
		}
		//set the data for graphing for daybyday view
		dataPointsDayByDay = {
			label: "DayByDay",
			data: pointsDayByDay
		}
		//set the data for graphing for cumulative view
		dataPointsCumulative = {
			label: "Cumulative",
			data: pointsCum
		}
		//store labels in the graphData labels object
		graphData.labels = labels;
		graphData.datasets = [];
		
		if (signup.params.viewtype === "DayByDay"){
			graphData.datasets.push(dataPointsDayByDay);
			signup.count = { total: counter};
		} else {
			graphData.datasets.push(dataPointsCumulative);
			signup.count = { total: cumCounter};	
		}

		signup.graph = graphData;
	}

	function parseMapData(data){
  		var params = signup.params,
  			mapData = {},
  			markers = [],
  			points = [],
			tempMapData = {},
			selectedYear = signup.year;

		tempMapData = data.years[selectedYear].data.MappingData;
		
		for (var key in tempMapData) {
			markers.push(key);
			points.push(tempMapData[key]);
		} 

		mapData = {
			'markers': markers,
		 	'points': points
		}
		signup.map = mapData;
	}

	function noData(){
	  	elt.parent().hide();
	  	showGraphArea(false);
	  	elt.closest('.module-body').find('.module-body-stat').text('\u2014');
	  	elt.closest('.module-body').prev().find('.module-stat').text('\u2014');
  }
});