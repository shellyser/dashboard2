angular.module('dashApp')
.controller('SignupCtrl',  function ($scope, enrollmentData) {
    console.log("im here?");
	$scope.signup = Enrollmentdata.signup({"startDate": null, "endDate": null, "product": null});
});