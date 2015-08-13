'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('app', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngStorage',
    'ui.router',
    'ui.bootstrap',
    'ui.load',
    'ui.jq',
    'ui.validate',
        'ui.router.tabs',
    'oc.lazyLoad',
        'app.treatmentAbroadCtrl',
    'app.filters',
    'app.services',
    'app.directives',
    'app.controllers'
])
.run(
    [          '$rootScope', '$state', '$stateParams',
        function ($rootScope,   $state,   $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]
)
.config(
  [          '$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($stateProvider,   $urlRouterProvider,   $controllerProvider,   $compileProvider,   $filterProvider,   $provide) {

        // lazy controller, directive and service
        app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        app.constant   = $provide.constant;
        app.value      = $provide.value;

        $urlRouterProvider
            .when('/app/hospitals','/app/hospitals/list')
            .otherwise('/app/home');
        $stateProvider
            .state('app', {
                abstract: true,
                url: '/app',
                templateUrl: 'tpl/app.html'
            })
            .state('app.tabs', {
                url:        '',
                controller: 'TabsController',
                templateUrl:'tpl/treatmentabroad/tabs.html'
            }).state('app.tabs.home', {
                url:        '/home',
                controller: 'HomeCtrl',
                templateUrl:'tpl/treatmentabroad/home.html'
            }).state('app.tabs.services', {
                url:        '/services',
                controller: 'ServicesCtrl',
                templateUrl:'tpl/treatmentabroad/services.html'
            })
            .state('app.tabs.hospitals', {
                url: '/hospitals',
                templateUrl:'tpl/treatmentabroad/hospitals.html'
            })
            .state('app.tabs.hospitals.list', {
                url: '/list',
                views: {
                    'list': {
                        templateUrl:'tpl/treatmentabroad/hospitalList.html',
                        controller: 'HospitalsCtrl'
                    }
                }
            })
            .state('app.tabs.hospitals.detail', {
                url: '/{id}',
                views: {
                    'detail': {
                        controller: 'HospitalDetailCtrl',
                        templateUrl:'tpl/treatmentabroad/hospitalDetail.html'
                    }
                }
            }).state('app.tabs.contactus', {
                url:        '/contactus',
                controller: 'ContactUSCtrl',
                templateUrl:'tpl/treatmentabroad/contactus.html'
            })



            .state('access', {
                url: '/access',
                template: '<div ui-view class="fade-in-right-big smooth"></div>'
            })
            .state('access.404', {
                url: '/404',
                templateUrl: 'tpl/page_404.html'
            })

    }
  ]
)

/**
 * jQuery plugin config use ui-jq directive , config the js and css files that required
 * key: function name of the jQuery plugin
 * value: array of the css js file located
 */
.constant('JQ_CONFIG', {
    easyPieChart:   ['js/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
    sparkline:      ['js/jquery/charts/sparkline/jquery.sparkline.min.js'],
    plot:           ['js/jquery/charts/flot/jquery.flot.min.js',
                        'js/jquery/charts/flot/jquery.flot.resize.js',
                        'js/jquery/charts/flot/jquery.flot.tooltip.min.js',
                        'js/jquery/charts/flot/jquery.flot.spline.js',
                        'js/jquery/charts/flot/jquery.flot.orderBars.js',
                        'js/jquery/charts/flot/jquery.flot.pie.min.js'],
    slimScroll:     ['js/jquery/slimscroll/jquery.slimscroll.min.js'],
    sortable:       ['js/jquery/sortable/jquery.sortable.js'],
    nestable:       ['js/jquery/nestable/jquery.nestable.js',
                        'js/jquery/nestable/nestable.css'],
    filestyle:      ['js/jquery/file/bootstrap-filestyle.min.js'],
    slider:         ['js/jquery/slider/bootstrap-slider.js',
                        'js/jquery/slider/slider.css'],
    chosen:         ['js/jquery/chosen/chosen.jquery.min.js',
                        'js/jquery/chosen/chosen.css'],
    TouchSpin:      ['js/jquery/spinner/jquery.bootstrap-touchspin.min.js',
                        'js/jquery/spinner/jquery.bootstrap-touchspin.css'],
    wysiwyg:        ['js/jquery/wysiwyg/bootstrap-wysiwyg.js',
                        'js/jquery/wysiwyg/jquery.hotkeys.js'],
    dataTable:      ['js/jquery/datatables/jquery.dataTables.min.js',
                        'js/jquery/datatables/dataTables.bootstrap.js',
                        'js/jquery/datatables/dataTables.bootstrap.css'],
    vectorMap:      ['js/jquery/jvectormap/jquery-jvectormap.min.js',
                        'js/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
                        'js/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
                        'js/jquery/jvectormap/jquery-jvectormap.css'],
    footable:       ['js/jquery/footable/footable.all.min.js',
                        'js/jquery/footable/footable.core.css']
    }
)

// modules config
.constant('MODULE_CONFIG', {
    select2:        ['js/jquery/select2/select2.css',
                        'js/jquery/select2/select2-bootstrap.css',
                        'js/jquery/select2/select2.min.js',
                        'js/modules/ui-select2.js']
    }
)

// oclazyload config
.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    // We configure ocLazyLoad to use the lib script.js as the async loader
    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: [
            {
                name: 'ngGrid',
                files: [
                    'js/modules/ng-grid/ng-grid.min.js',
                    'js/modules/ng-grid/ng-grid.css',
                    'js/modules/ng-grid/theme.css'
                ]
            },
            {
                name: 'toaster',
                files: [
                    'js/modules/toaster/toaster.js',
                    'js/modules/toaster/toaster.css'
                ]
            }
        ]
    });
}])
;
