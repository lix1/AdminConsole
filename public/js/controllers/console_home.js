'use strict';

angular.module('app.consoleCtrl', [])
    .controller('HomeCtrl', ['$rootScope', '$state', '$scope', '$http','$modal', function($rootScope, $state, $scope, $http,$modal) {
      $http.get("/rest/intro").success(function (data) {
        $scope.introList = data;
      });

    $scope.introList = [{"_id":"559768867c9ed401db7c2559","title":"再生医疗","description":"再生医疗介绍.","index":1,"__v":0},{"_id":"55977225f5e7a4cc159b7446","title":"人性化治疗","description":"人性化治疗介绍.","index":2,"__v":0}]

    $scope.showDeleteModal = function(obj) {
      var modalInstance = $modal.open({
        templateUrl: 'tpl/console/modal/deleteObjectModal.html',
        controller: 'DeleteModalCtrl',
        size: 'lg',
        resolve: {
          item: function () {
            var item = obj;
            return item;
          }
        }
      });

      modalInstance.result.then(function (platformId) {
        $state.go($state.current, {}, {reload: true});
      });
    };

    $scope.showAddModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'tpl/console/modal/AddUpdateIntroModal.html',
        controller: 'AddModalCtrl',
        size: 'lg'
      });

      modalInstance.result.then(function (platformId) {
        $state.go($state.current, {}, {reload: true});
      });
    };

    $scope.showUpdateModal = function(obj) {
      var modalInstance = $modal.open({
        templateUrl: 'tpl/console/modal/AddUpdateIntroModal.html',
        controller: 'UpdateModalCtrl',
        size: 'lg',
        resolve: {
          item: function () {
            var item = obj;
            return item;
          }
        }
      });

      modalInstance.result.then(function (platformId) {
        $state.go($state.current, {}, {reload: true});
      });
    };
  }])
  .controller('DeleteModalCtrl', ['$scope','$modalInstance','$http','item', function ($scope,$modalInstance,$http,item) {
    $scope.isSubmitting=false;
    $scope.alerts = [];
    $scope.message="Delete entity [ "+item.title+" ] from the database?"

    $scope.submit = function() {
      $scope.isSubmitting=true;
      $http.delete('/rest/intro/'+item._id).
        success(function(data, status, headers, config) {
          $scope.isSubmitting=false;
          $modalInstance.close();
        }).
        error(function(data, status, headers, config) {
          $scope.isSubmitting=false;
          $scope.alerts.push({type: 'danger',msg: 'Error deleting introduction - ' + status + ':' + data.message});
        });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  }])
  .controller('AddModalCtrl', ['$scope','$modalInstance','$http', function ($scope,$modalInstance,$http) {
    $scope.inSubmit=false;
    $scope.alerts = [];
    $scope.obj={};
    $scope.modalTitle='Add New Introduction';

    $scope.submit = function() {
      $scope.inSubmit=true;
      $http.post('/rest/intro',$scope.obj).
        success(function(data, status, headers, config) {
          $scope.inSubmit=true;
          $modalInstance.close();
        }).
        error(function(data, status, headers, config) {
          $scope.alerts.push({type: 'danger',msg: 'Error adding introduction - ' + status + ':' + data.message});
          $scope.inSubmit=false;
        });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  }])
  .controller('UpdateModalCtrl', ['$scope','$modalInstance','$http','item', function ($scope,$modalInstance,$http,item) {
    $scope.inSubmit=false;
    $scope.alerts = [];
    $scope.obj={};
    $scope.obj.id=item._id;
    $scope.obj.title=item.title;
    $scope.obj.description=item.description;
    $scope.obj.index=item.index;
    $scope.modalTitle='Add New Introduction';

    $scope.submit = function() {
      $scope.inSubmit=true;
      $http.put('/rest/intro',$scope.obj).
        success(function(data, status, headers, config) {
          $scope.inSubmit=true;
          $modalInstance.close();
        }).
        error(function(data, status, headers, config) {
          $scope.alerts.push({type: 'danger',msg: 'Error adding introduction - ' + status + ':' + data.message});
          $scope.inSubmit=false;
        });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  }])
;
