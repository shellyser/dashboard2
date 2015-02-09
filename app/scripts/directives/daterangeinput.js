'use strict';

/**
 * @ngdoc directive
 * @name dashApp.directive:dateRangeInput
 * @description
 * # dateRangeInput
 */
angular.module('dashApp')
  .directive('dateRangeInput', function ($timeout) {
    return {
      restrict: 'A',
      link: function postLink(scope, elt, attrs) {
        elt.on('keyup', function(){
          $timeout(function(){
            var minDate = new Date($('#date-range-content').attr('data-min-date')),
                maxDate = new Date($('#date-range-content').attr('data-max-date')),
                date = new Date(elt.val()),
                error = false;
            if (minDate > date){
              error = true;
              $('#date-start-error').show();
            }
            if (maxDate < date){
              error = true;
              $('#date-end-error').show();
            }
            if (error === false){
              $('.date-range-error').each(function(){
                $(this).hide();
              });
              $('#pick-date').removeClass('disabled');
            }
            else{
              $('#pick-date').addClass('disabled');
            }
          });
        });

        elt.on('focusout', function(){
          $timeout(function(){
            var minDate = new Date($('#date-range-content').attr('data-min-date')),
                maxDate = new Date($('#date-range-content').attr('data-max-date')),
                date = new Date(elt.val());
            if (minDate > date){
              elt.val($('#date-range-content').attr('data-min-date'));
            }
            if (maxDate < date){
              elt.val($('#date-range-content').attr('data-max-date'));
            }
          })
        });

      }
    };
  });