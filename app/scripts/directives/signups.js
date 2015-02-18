angular.module('dashApp')
.directive('signups', function (module) {
	return {
		restrict: 'A',
		link: function postLink(scope, $elem, attrs) {
			var ctx = $elem[0].getContext("2d");
			var autosize = false;

			// var newGraph = new Chart(ctx);
			// myNewChart.Line(data, options);
			$scope.size = function () {
				$elem.width($elem.parent().width());
				ctx.canvas.width = $elem.width();
				$elem.height($elem.parent().height());
				ctx.canvas.height = ctx.canvas.width / 2;
			}

			scope.$watch('viewParameters', function(newValue, oldValue){
				if (newValue){
					showLoading();
					if ((newValue.startDate !== oldValue.startDate) || (newValue.endDate !== oldValue.endDate)){
			      // otherwise, start date is exclusive, and we want it to be inclusive.
			      var startDateMinusOne = new Date(
			      	newValue.startDate.split('-')[2],
			        newValue.startDate.split('-')[0] - 1,//1-12
			        newValue.startDate.split('-')[1]
			        );

			      startDateMinusOne.setDate(startDateMinusOne.getDate()-1);
			      startDateMinusOne = (startDateMinusOne.getMonth() + 1) + '-' + startDateMinusOne.getDate() + '-' + startDateMinusOne.getFullYear();
			      module.getModule(attrs.graphContent, startDateMinusOne, newValue.endDate, scope.viewParameters.unit, populateModule, noData);
			     }
			     else{
			     	module.getModule(attrs.graphContent, null, null, populateModule, noData);
			     }
			    }
			   }, true);
    }
  };
});