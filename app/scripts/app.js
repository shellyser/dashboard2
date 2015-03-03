'use strict';

/**
 * @ngdoc overview
 * @name dashApp
 * @description
 * # dashApp
 *
 * Main module of the application.
 */

angular.module('dashApp', ['FormErrors', 'ngBootstrap', 'ui.router', 'ngResource', 'ui.bootstrap'])

.config(function($stateProvider, $urlRouterProvider){
    // $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('dashboard', {
        url: '/',
        views: {
            "master":{
                templateUrl: '/views/dashboard.html'

            },
            'header@dashboard' : {
                templateUrl: '/views/header.html'
            },
            'content@dashboard' : {
                templateUrl: '/views/dashoverview.html',
                 controller: 'OverviewCtrl'
               
            },
            'sidebar@dashboard' : {
                templateUrl: '/views/sidebar.html',
                controller: 'SidebarCtrl'
            }
        }
    })
    .state('dashboard.enrollment', {
        url: 'enrollment',
        views: {
            'content@dashboard': {
                templateUrl: '/views/enrollment.html',
                controller: 'EnrollmentCtrl',
                resolve: {
                    enrollmentData: function(Enrollmentdata){
                            var EnrollmentData = Enrollmentdata.get();
                            return EnrollmentData.$promise;
                    }
                }              
            }
        }           
    })
    .state('dashboard.drevents', {
        url: 'drevents',
        views: {
            'content@dashboard': {
                templateUrl: '/views/drevents.html',
                // controller: 'EventsCtrl'
            }
        }
    })

    .state('dashboard.analytics', {
        url: 'analytics',
        views: {
            'content@dashboard': {
                templateUrl: '/views/analytics.html',
                // controller: 'AnalyticsCtrl'
            }
        }
    })

    .state('dashboard.campaigns', {
        url: 'campaigns',
        views: {
            'content@dashboard': {
                templateUrl: '/views/campaigns.html',
                // controller: 'CampaignsCtrl'
            }
        }
    })

    .state('dashboard.settings', {
        url: 'settings',
        views: {
            'content@dashboard': {
                templateUrl: '/views/settings.html',
                controller: 'SettingsCtrl'
            }
        }
    })
    .state('dashboard.reports', {
       url: 'reports',
       views: {
        'content@dashboard': {
              templateUrl: '/views/reports.html',
              // controller: 'ReportsCtrl'
          }
        }
    })
      .state('dashboard.help', {
       url: 'help',
       views: {
            'content@dashboard': {
              templateUrl: '/views/help.html',
              // controller: 'ReportsCtrl'
            }
        }
    })

    .state('login', {
       url: 'login',
       views: {
          templateUrl: '/views/login.html',
          controller: 'LoginCtrl'
        }
    })
    .state('404', {
        templateUrl: '/views/error.html'
    })
    
});