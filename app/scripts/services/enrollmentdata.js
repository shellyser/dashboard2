'use strict';

angular.module('dashApp')
  .factory('Enrollmentdata', ['$resource', function ($resource) {
    return $resource('/data/enrollment/:enrollmentController'+'.json', 
      {
        enrollmentController: "@enrollmentController",
        startDate: "@startDate",
        endDate: "@endDate",
        communicationType: "@communicationType",
        unit: "@unit",
        
      },
      {
        'enrollment': { 
          method: 'GET', 
          params:{
            enrollmentController: "enrollment"
          },
          isArray: false
        },
        'signups': {
          method: "GET",
          isArray: false,
          params: {
            enrollmentController: "signups",
            startDate: "startDate",
            endDate: "endDate",
            // communicationType: "communicationType",
            unit: "unit"
          }
        },
        'distributed': {
          method: "GET",
          params: {
            enrollmentController: "distributed",
            startDate: "startDate",
            endDate: "endDate"
            // communicationType: "communicationType",
            // unit: "unit"
          },
          isArray: false
        },
        'setups': {
          method: "GET",
          params: {
            enrollmentController: "setups",
            startDate: "startDate",
            endDate: "endDate"
            // communicationType: "communicationType",
            // unit: "unit"
          },
          isArray: false
        },
        'optout': {
          method: "GET",
          params: {
            enrollmentController: "optout",
            startDate: "startDate",
            endDate: "endDate"
            // communicationType: "communicationType",
            // unit: "unit"
          },
          isArray: false
        },
        'online': {
          method: "GET",
          params: {
            enrollmentController: "online",
            startDate: "startDate",
            endDate: "endDate"
            // communicationType: "communicationType",
            // unit: "unit"
          },
          isArray: false
        }
      });
}]);      

