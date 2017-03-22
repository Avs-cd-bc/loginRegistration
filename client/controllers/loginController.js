angular.module("app").controller("LoginController", ["$scope", "$location", "registrationFactory", function($scope, $location, registrationFactory){
  $scope.email;
  $scope.pword;
  $scope.id;
  $scope.errorFlag = false;
  $scope.loggedIn = false;

  $scope.login = function(){
    var tempUser = {};
    tempUser.email = $scope.email;
    tempUser.password = $scope.pword;
    registrationFactory.login(tempUser, function(returned_data){
      $scope.loggedIn = returned_data.loggedIn;
      $scope.id = returned_data.id;
      $scope.email = returned_data.email;
      $scope.errorFlag = false;
      $scope.error = "";
    }, function(err_data){
      $scope.errorFlag = true;
      $scope.error = err_data;
    });
  }
  $scope.logout = function(){
    console.log("logging Out");
    registrationFactory.logout(function(returned_data){
      $scope.email = "";
      $scope.pword = "";
      $scope.id = "";
      $scope.loggedIn = returned_data.loggedIn;
      $scope.errorFlag = false;
      $scope.error = "";
    })
  }
}]);
