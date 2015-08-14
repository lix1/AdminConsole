'use strict';

angular.module('app.consoleCtrl', [])
    .controller('HomeCtrl', ['$rootScope', '$state', '$scope', '$http', function($rootScope, $state, $scope, $http) {
      $http.get("/rest/intro").success(function (data) {
        $scope.introList = data;
      });

    $scope.introList = [{"_id":"559768867c9ed401db7c2559","title":"再生医疗","description":"再生医疗介绍.","index":1,"__v":0},{"_id":"55977225f5e7a4cc159b7446","title":"人性化治疗","description":"人性化治疗介绍.","index":2,"__v":0}]
    }])

;
