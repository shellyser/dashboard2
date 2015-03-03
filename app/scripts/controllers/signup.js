angular.module('dashApp')
.controller('SignupCtrl',  function ($scope, Enrollmentdata) {
    var signupModule = 'signup';
	$scope.signup = Enrollmentdata[signupModule]({"startDate": null, "endDate": null, "product": null});
});