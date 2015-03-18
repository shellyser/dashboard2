angular.module('dashApp')
.service('SetupModel', function ($http, $q) {
	var setupModel = this,
		URLS = {
			FETCH: '/data/enrollment/setup'+'.json',
		},
		setups;

		function extract(result){
				return result.data;
		}

		function cacheSetups(result){
			setups = extract(result);
			return setups;
		};


		setupModel.getSetups = function getSetups(params){
			return (setups) ? $q.when(setups) : $http.get(URLS.FETCH, params, {cache:true}).then(cacheSetups);
		};

		setupModel.getSetupsModlets = function getSetupsModlets(params1){
			return $http.get(URLS.FETCH, params1, {cache:true}).then(function(setupsModletsData){
				return setupsModletsData.data;
			});
		}

		setupModel.getSetupsThermostats = function getSetupsThermostats(params2){
			return $http.get(URLS.FETCH, params2, {cache:true}).then(function(setupsThermostatsData){
				return setupsThermostatsData.data;
			});
		}

		setupModel.getSetupsDevices = function getSetupsDevices(params1, params2){
			var setupsModletsPromise = setupModel.getSetupsModlets(params1),
					setupsThermostatsPromise = setupModel.getSetupsThermostats(params2);

			return $q.all([setupsModletsPromise, setupsThermostatsPromise]).then(function(resultArray){
				 return resultArray;
			});
		}

});