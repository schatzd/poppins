(function(window, document, undefined) {
'use strict';
var sms = angular.module('sms', ['ui.router', 'firebase', 'ui.bootstrap']);

sms.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "../partials/home.html",
      controller: "homeCtrl"
    })
    .state('sms', {
      url: "/sms",
      templateUrl: "../partials/sms.html",
      controller: "smsCtrl"
    })
    .state('class-cup', {
      url: "/class-cup",
      templateUrl: "../partials/class-cup.html",
      controller: "classCupCtrl"
    })
    .state('directory', {
      url: "/directory",
      templateUrl: "../partials/directory.html",
      controller: "directoryCtrl"
    })
    .state('admin', {
      url: "/admin",
      templateUrl: "../partials/admin.html",
      controller: "adminCtrl"
    })

    $locationProvider.html5Mode({enabled: true, requireBase: false})
}]);

sms.controller('adminCtrl', ['$scope', 'students', function($scope, students) {
	$scope.students = students;

	$scope.deleteStudent = function(student){
		$scope.students.$remove(student);
	};

	$scope.addStudent = function(){
		$scope.students.$add({
      name: $scope.newStudent.name,
      avatar: $scope.newStudent.avatar,
      telephone: $scope.newStudent.phone,
      email: $scope.newStudent.email,
      notes: $scope.newStudent.notes
    });

    $scope.newStudent= {};
	};

	$scope.students.$loaded(function() {
    if ($scope.students.length === 0) {
      $scope.students.$add({
        name: 'daniel treasure',
	      avatar: 'http://blahblahblah',
	      telephone: '801-628-0193',
	      email: 'dbtreasure@gmail.com',
	      notes: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod tempore molestiae dolore fugit. Totam necessitatibus quae explicabo qui vel, iusto nesciunt fuga et, facere, autem optio adipisci debitis dolore quibusdam?'
      });
    }
  });

	$scope.newStudent = {};

}]);

sms.controller('classCupCtrl', ['$scope', function($scope) {


}]);

sms.controller('directoryCtrl', ['$scope', function($scope) {


}]);

sms.controller('homeCtrl', ['$scope', function($scope) {


}]);

sms.controller('indexCtrl', ['$scope', '$location', function($scope) {

}]);

sms.controller('ModalCtrl', ['$scope', '$modal',  function ($scope, $modal) {
  $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;

  $scope.open = function (size, student) {
    $scope.student = student
    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        student: function () {
          return $scope.student;
        }
      }
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

}]);

sms.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'student', 'students', function ($scope, $modalInstance, student, students) {
  $scope.studentsRef = students;
  $scope.studentCopy = student;
  $scope.student = student;

  $scope.save = function(){
    $scope.studentsRef.$save($scope.student);
    $modalInstance.close();
  };

  $scope.cancel = function () {

    $modalInstance.close();
  };
}]);

sms.controller('smsCtrl', ['$scope', function($scope) {


}]);

sms.factory("students", ["$firebaseArray",
  function($firebaseArray) {
    var ref = new Firebase("https://student-management.firebaseio.com/");

    return $firebaseArray(ref);
  }
]);

})(window, document);
