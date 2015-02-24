angular.module('dashApp')
.directive('signups', function (module) {
	return {
		restrict: 'A',
		link: function postLink($scope, $elem, attrs) {
			var ctx = $elem[0].getContext("2d");
			var autosize = false;

			$scope.size = function () {
				$elem.width($elem.parent().width());
				ctx.canvas.width = $elem.width();
				$elem.height($elem.parent().height());
				ctx.canvas.height = ctx.canvas.width / 2;
			}
			var params = $scope.viewParameters;
			var graphData = module.getModule(attrs.graphContent, params.startDate, params.endDate, params.product, populateModule, noData);

			function populateModule(data){
				console.log("I'm here!");
				var dates = [],
						labels = [],
						points = [],
						signupData = {},
						graphData = {},
						dataPoints = {},
						counter = 0,
						cumCounter = 0;

				signupData = data.Cohort[0][2014].graphData;
				cumCounter = data.Cohort[0][2014].totals;
				dates = Object.keys(signupData);

				for (var i in dates){
					labels.push(dates[i].slice(0, -5));
				}

				for (var key in signupData){
					points.push(signupData[key]);
					counter = counter + signupData[key];
				}

				dataPoints.data = points;
				graphData.labels = labels;
				graphData.datasets = [];
				graphData.datasets.push(dataPoints);
				
				$scope.size();
				var newGraph = new Chart(ctx);
				newGraph.Line(graphData);
				if (newGraph.Line){
					$elem.closest('.module-body').find('.module-loading').fadeOut();
				}

				$elem.closest('.module-body').find('.module-body-stat').text(counter);
			}

			function noData(){
      	elt.parent().hide();
      	showGraphArea(false);
      	elt.closest('.module-body').find('.module-body-stat').text('\u2014');
      	elt.closest('.module-body').prev().find('.module-stat').text('\u2014');
      }

			// $scope.$watch('viewParameters', function(newValue, oldValue){
			// 	if (newValue){
			// 		//showLoading();
			// 		if ((newValue.startDate !== oldValue.startDate) || (newValue.endDate !== oldValue.endDate)){
			//       // otherwise, start date is exclusive, and we want it to be inclusive.
			//       var startDateMinusOne = new Date(
			//       	newValue.startDate.split('-')[2],
			//         newValue.startDate.split('-')[0] - 1,//1-12
			//         newValue.startDate.split('-')[1]
			//         );

			//       startDateMinusOne.setDate(startDateMinusOne.getDate()-1);
			//       startDateMinusOne = (startDateMinusOne.getMonth() + 1) + '-' + startDateMinusOne.getDate() + '-' + startDateMinusOne.getFullYear();
			//       module.getModule(attrs.graphContent, startDateMinusOne, newValue.endDate, $scope.viewParameters.product, populateModule, noData);
			//      }
			//      else{
			//      	module.getModule(attrs.graphContent, null, null, populateModule, noData);
			//      }
			//     }
		 // }, true);
    	
    }
  };
});