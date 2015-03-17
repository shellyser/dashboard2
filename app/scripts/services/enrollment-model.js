angular.module('dashApp')
.service('EnrollmentModel', function ($http) {
	var model = this,
		URLS = {
			enrollment:'/data/enrollment/signup'+'.json'
		};

		function extract(result){
				return result.data;
		}

		function cacheEnrollmentData(result){
			enrollmentData = extract(result);
			return enrollmentData;
		}

		model.getEnrollmentData = function(module){
			return $http.get(URLS.module);
		};

});