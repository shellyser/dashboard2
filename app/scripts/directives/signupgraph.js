angular.module('dashApp')
.directive('signupGraph', function () {
	return {
		restrict: 'A',
		link: function postLink(scope, elem, attrs) {

			function populateGraph(){
				var canvas = elem[0];
				var canvasId = elem.attr("id");
				animate = ANIMATE_GRAPH,
				allOptionsUnchecked = false,
				width = elem.closest('.module').css('width');
				//set canvas to width of parent
				elem.attr("id", canvasId).css('width',width);  

				//eliminates any existing instance of Chart
				for (var instance in Chart.instances){
	            	if (Chart.instances[instance].chart.canvas.id === canvasId){
	            		Chart.instances[instance].destroy();
	            	}
	            }
	            	
				var autosize = false,
				animate = false,
				labels = scope.graph.labels,
				datasets = scope.graph.datasets[0],
				MAX_X_AXIS_POINTS = 31,
				underPointCountThreshold = labels.length <= MAX_X_AXIS_POINTS,
				hasZeroInData = false,
				max = 0,
				min = 0,
				total = 0,
				lineColor,
				fillColor,
				color = elem.closest('.module').find('.module-header').css('color');

				// graph colors are based on the color of the bar at the top of the module
				color = color.replace('rgb', 'rgba');
				fillColor = color.replace(')', ', 0.3)');
				lineColor = color.replace(')', ', 1)');

				var dataForGraphing = {
					label: datasets.label,
					fillColor: fillColor,
					strokeColor: lineColor,//'rgba(0, 0, 0, 0)',
					pointStrokeColor: lineColor,
					pointColor: 'rgba(240, 240, 240, 1)',
					data: datasets.data
				};

				// construct total and max of data
				for (i in datasets.data){
					if (parseInt(i) === 0){
						min = datasets.data[i];
						max = datasets.data[i];
					}
					if (datasets.data[i] === 0){
						hasZeroInData = true;
					}
					if (datasets.data[i] < min){
						min = datasets.data[i];
					}
					if (datasets.data[i] > max){
						max = datasets.data[i];
					}
				}

				showGraphArea(true);

				scope.graph.datasets = [];
				scope.graph.datasets.push(dataForGraphing);

				var calcNewMin = false,
					step = 0,
				options = {
					scaleOverride: true,
					scaleSteps: 10,
					scaleFontFamily: 'PT Sans, sans-serif',
					scaleFontStyle: 'bold',
					scaleIntegersOnly: true,
					bezierCurve: false,
					pointDot: underPointCountThreshold,
					pointDotStrokeWidth: 2,
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
					showXLabels: underPointCountThreshold ? true : MAX_X_AXIS_POINTS
				};
				options.animation = underPointCountThreshold ? animate : false;
				options.animation = true;

				// scope.size = function () {
				// 	elem.width(elem.parent().width());
				// 	ctx.canvas.width = elem.width();
				// 	elem.height(elem.parent().height());
				// 	ctx.canvas.height = ctx.canvas.width / 2;
				// }
					
				// scope.size();

				if (scope.params.viewtype.toLowerCase() !== 'cumulative'){
					var startVal = 0;
					if (min < 0){
						startVal = -1*(snapTo(-1*min));
						if (max <= 0){
							max = 5;
						}
					}
					if ((startVal == 0) && hasZeroInData){
						startVal = -5;
					}
					options.scaleStartValue = startVal;
					step = Math.ceil((max - startVal)/10);
					if (step*10 === max){
						step += step;
					}
				}
				else{
					if (min < 1000){
						min = Math.floor(min*0.95);
					}
					else{
						min = min - 50;
					}
					calcNewMin = true;
					options.scaleStartValue = min;
					step = Math.ceil((max - min)/10);
				}

				// let's draw!
				elem.show();
				step = fitStepToContext(snapTo(step), min.toString().length);
				options.scaleStepWidth = step;

				min = Math.round(min);
				max = Math.round(max);

				if (calcNewMin){
					var graphDims = calcMinAndStep(min, max, step);
					options.scaleStartValue = graphDims.min;
					options.scaleStepWidth = graphDims.step;
				}

				var ctx = canvas.getContext("2d");
				var newGraph = new Chart(ctx).Line(scope.graph, options);
				showGraphArea();

				// if (newGraph){
				// 	elem.closest('.module-body').find('.module-loading').fadeOut();
				// }
			}

			scope.$watch('graph', function(newValue, oldValue) {
	    		if (newValue)
	    		// newGraph.Line.destroy();
	    		populateGraph();
			}, true);

			function calcMinAndStep(min, max, step){
				var solution = {
					'min': min,
					'step': step
				};
				var tempMin = (Math.floor(min/step))*step;
				if ((tempMin + step*10) > max){
					solution.min = tempMin;
				}
				else{
					return calcMinAndStep(min, max, fitStepToContext(stepUp(step), min.toString().length));
				}
				if (endsWith(step.toString(), '90')){
					solution.step = solution.step + 10;
				}
				else if (endsWith(step.toString(), '40')){
					solution.step = solution.step + 60;
				}
				else if (endsWith(step.toString(), '60')){
					solution.step = solution.step + 40;
				}
				else if (endsWith(step.toString(), '70')){
					solution.step = solution.step + 30;
				}
				else if (endsWith(step.toString(), '80')){
					solution.step = solution.step + 20;
				}
				return solution;
			}

			// if we're dealing with large numbers,
			// limit how small the graph's step can be
			function fitStepToContext(step, order){
				if ((4 <= order) && (order < 6)){
					return Math.max(step, 50);
				}
				else if (6 <= order){
					return Math.max(step, 100);
				}
				return step;
			}

			// increment step size
			function stepUp(val){
				var steps = [1, 2, 5, 25];
				if (val%10 === 0){
					return val+10;
				}
				if (val%5 === 0){
					return val+5;
				}
				else{
					var index = steps.indexOf(val);
					if (index === -1){
						val = parseInt(Math.round((val*1.5)/10));
						return val*10;
					}
					if (index === steps.length){
						return val+5;
					}
					else{
						return steps[index + 1];
					}
				}
			}

			// to see if a substring is at the end of a string
			function endsWith(str, suffix) {
				return str.indexOf(suffix, str.length - suffix.length) !== -1;
			}

			function snapTo(val){
				if (val%10 === 0){
					return snapTo(val + 5);
				}
				else if ((0 < val) && (val <= 5)){
					return 5;
				}
				else if ((5 < val) && (val <= 10)){
					return 10;
				}
				else if ((10 < val) && (val <= 20)){
					return 20;
				}
				else if ((20 < val) && (val <= 25)){
					return 25;
				}
				else if ((25 < val) && (val <= 50)){
					return 50;
				}
				else if ((50 < val) && (val <= 100)){
					return 100;
				}
				else if ((100 < val) && (val <= 1000)){
					return (val/100)*100;
				}
				return (val/200)*200;
			}


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