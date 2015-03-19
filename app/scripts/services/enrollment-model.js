angular.module('dashApp')
.service('EnrollmentModel', function ($http, $q) {
	var enrollmentModel = this,
		URLS = {
			FETCH: '/data/enrollment'+'.json',
		},
		enrollments;

		function extract(result){
				return result.data;
		}

		function cacheEnrollment(result){
			enrollments = extract(result);
			return enrollments;
		};

		enrollmentModel.getEnrollments = function getEnrollments(){
			$http.get(URLS.FETCH, {cache:true}).then(function(enrollmentData){
				return enrollmentData.data;
			});
		};

});