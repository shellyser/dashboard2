'use strict';

angular.module('dashApp')
  .factory('Enrollmentdata', ['$resource', function ($resource) {
    return $resource('/data/enrollment/:enrollmentController'+'.json', 
      {
        enrollmentController: "@enrollmentController",
        startDate: "@startDate",
        endDate: "@endDate",
        communicationType: "@communicationType",
        product: "@product",
        
      },
      {
        'enrollment': { 
          method: 'GET', 
          params:{
            enrollmentController: "enrollment"
          },
          isArray: false
        },
        'signup': {
          method: "GET",
          isArray: false,
          params: {
            enrollmentController: "signup",
            startDate: "startDate",
            endDate: "endDate",
            // communicationType: "communicationType",
            product: "product"
          }
        },
        'distributed': {
          method: "GET",
          params: {
            enrollmentController: "distributed",
            startDate: "startDate",
            endDate: "endDate"
            // communicationType: "communicationType",
            // product: "product"
          },
          isArray: false
        },
        'setup': {
          method: "GET",
          params: {
            enrollmentController: "setup",
            startDate: "startDate",
            endDate: "endDate"
            // communicationType: "communicationType",
            // product: "product"
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
            // product: "product"
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
            // product: "product"
          },
          isArray: false
        }
      });
}]);      

