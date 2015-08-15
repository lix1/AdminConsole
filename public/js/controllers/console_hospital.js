'use strict';

angular.module('app.consoleHospitalCtrl', [])
    .controller('HospitalCtrl', ['$rootScope', '$state', '$scope', '$http','$modal', function($rootScope, $state, $scope, $http,$modal) {
      $http.get("/rest/hospital").success(function (data) {
        $scope.hospitalList = data;
        console.log($scope.hospitalList)
      });

    $scope.hospitalList = [{"_id":"55977aa4d116d2454fdf3856","name":"梅奥诊所","name_en":"Mayo Clinic","introduction":"Mayo Clinic in Rochester, MN is ranked nationally in 15 adult and 9 pediatric specialties.","address":"200 S. W. First Street","homepage":"http://www.mayoclinic.org","ranking":2,"__v":0},{"_id":"55977acad116d2454fdf3857","name":"梅奥诊所","name_en":"Mayo Clinic","introduction":"Mayo Clinic in Rochester, MN is ranked nationally in 15 adult and 9 pediatric specialties.","address":"200 S. W. First Street","homepage":"http://www.mayoclinic.org","ranking":1,"__v":0},{"_id":"55977b05d116d2454fdf3858","name":"梅奥诊所","name_en":"Mayo Clinic","introduction":"Mayo Clinic in Rochester, MN is ranked nationally in 15 adult and 9 pediatric specialties.","address":"200 S. W. First Street","homepage":"http://www.mayoclinic.org!!","ranking":3,"__v":0}];

    $scope.showDeleteModal = function(obj) {
      var modalInstance = $modal.open({
        templateUrl: 'tpl/console/modal/deleteObjectModal.html',
        controller: 'DeleteModalCtrl',
        size: 'lg',
        resolve: {
          item: function () {
            var item = {};
            item.name=obj.name_en;
            item.url='/rest/hospital/'+obj._id;
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
        templateUrl: 'tpl/console/modal/AddUpdateHospitalModal.html',
        controller: 'AddModalCtrl',
        size: 'lg'
      });

      modalInstance.result.then(function (platformId) {
        $state.go($state.current, {}, {reload: true});
      });
    };

    $scope.showUpdateModal = function(obj) {
      var modalInstance = $modal.open({
        templateUrl: 'tpl/console/modal/AddUpdateHospitalModal.html',
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
  .controller('AddModalCtrl', ['$scope','$modalInstance','$http', function ($scope,$modalInstance,$http) {
    $scope.inSubmit=false;
    $scope.alerts = [];
    $scope.obj={};
    $scope.modalTitle='Add New Hospital';

    $scope.submit = function() {
      $scope.inSubmit=true;
      $http.post('/rest/hospital',$scope.obj).
        success(function(data, status, headers, config) {
          $scope.inSubmit=true;
          $modalInstance.close();
        }).
        error(function(data, status, headers, config) {
          $scope.alerts.push({type: 'danger',msg: 'Error adding hospital - ' + status + ':' + data.message});
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
    $scope.obj.name=item.name;
    $scope.obj.name_en=item.name_en;
    $scope.obj.introduction=item.introduction;
    $scope.obj.address=item.address;
    $scope.obj.homepage=item.homepage;
    $scope.obj.ranking=item.ranking;
    $scope.modalTitle='Update Hospital ' + item.name;

    $scope.submit = function() {
      console.log("submitting")
      $scope.inSubmit=true;
      $http.put('/rest/hospital',$scope.obj).
        success(function(data, status, headers, config) {
          $scope.inSubmit=true;
          $modalInstance.close();
        }).
        error(function(data, status, headers, config) {
          $scope.alerts.push({type: 'danger',msg: 'Error adding hospital - ' + status + ':' + data.message});
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
