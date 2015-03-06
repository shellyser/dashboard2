angular.module('dashApp')
.directive('signupgraph', function () {
	return {
		restrict: 'A',
		link: function postLink(scope, elem, attrs) {
			// function checkData(){
			// 	if (jQuery.isEmptyObject(scope.graph)){
			// 		noData();
			// 	}
			// 	else{
			// 		populateGraph();
			// 	}
			// }
			function populateGraph(){
				var canvasId = elem[0].id;
				//eliminates any existing instance of Chart
				for (var instance in Chart.instances){
	            	if (Chart.instances[instance].chart.canvas.id === canvasId){
	            		Chart.instances[instance].destroy();
	            	}
	            }
	            	
				var ctx = elem[0].getContext("2d");
				var autosize = false,
				animate = false,
				labels = scope.graph.labels,
				datasets = scope.graph.datasets[0],
				underPointCountThreshold = labels.length <= 31,
				options = {
					scaleOverride: false,
					scaleSteps: 10,
					scaleFontFamily: 'PT Sans, sans-serif',
					scaleFontStyle: 'bold',
					scaleIntegersOnly: true,
					bezierCurve: false,
					pointDot: underPointCountThreshold,
					pointDotStrokeWidth: 1,
					datasetStroke : !underPointCountThreshold,
					datasetStrokeWidth : 1,
					scaleLabel: '<%=value%>',
					responsive: true,
					maintainAspectRatio: false,
					tooltipTemplate: '<%= value %>',
					multiTooltipTemplate: '<%= value %>',
					tooltipFillColor: 'rgba(0, 0, 0, 0.6)',
					tooltipFontFamily: 'PT Sans, sans-serif',
					pointHitDetectionRadius: underPointCountThreshold ? Math.min(16, 16*(5/scope.graph.labels.length)) : 0,
					showXLabels: underPointCountThreshold ? true : 31
				},
				lineColor,
				fillColor,
				color = $('canvas').closest('.module').find('.module-header').css('color');

				// graph colors are based on the color of the bar at the top of the module
				color = color.replace('rgb', 'rgba');
				fillColor = color.replace(')', ', 0.3)');
				lineColor = color.replace(')', ', 1)');

				var moreDatasets = {
					label: datasets.label,
					fillColor: fillColor,
					strokeColor: lineColor,//'rgba(0, 0, 0, 0)',
					pointStrokeColor: lineColor,
					pointColor: 'rgba(240, 240, 240, 1)',
					data: datasets.data
				}

				scope.graph.datasets = [];
				scope.graph.datasets.push(moreDatasets);
				options.animation = underPointCountThreshold ? animate : false;
				options.animation = true;

				scope.size = function () {
					elem.width(elem.parent().width());
					ctx.canvas.width = elem.width();
					elem.height(elem.parent().height());
					ctx.canvas.height = ctx.canvas.width / 2;
				}
					
				scope.size();
				var newGraph = new Chart(ctx).Line(scope.graph);
				if (newGraph){
					elem.closest('.module-body').find('.module-loading').fadeOut();
				}
			}

			scope.$watch('graph', function(newValue, oldValue) {
	    		if (newValue)
	    		// newGraph.Line.destroy();
	    		populateGraph();
			}, true);

			function noData(){
			  	elem.parent().hide();
			  	showGraphArea(false);
			  	elem.closest('.module-body').find('.module-body-stat').text('\u2014');
			  	elem.closest('.module-body').prev().find('.module-stat').text('\u2014');
			}

			function showLoading(){
				elem.closest('.module-body').find('.module-loading').fadeIn();
				elem.parent().fadeOut();
				elem.parent().next().fadeOut();
			}

			function showGraphArea(data){
				elem.closest('.module-body').find('.module-loading').fadeOut();
				if (data ===  true || data === undefined){
					elem.parent().fadeIn();
				}
				if (data === false || data === undefined){
					elem.parent().next().fadeIn();
				}
			}
		}
	};
});