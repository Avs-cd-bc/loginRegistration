angular.module("app").controller("registrationController", ["$scope", "$location", "registrationFactory", function($scope, $location, $cookies, registrationFactory){
  $scope.user;
  $scope.error;
  $scope.errorFlag = false;

  function startUp(){
    if($cookies.get("userEmail")){
      $location.url("/login");
    }
  }

  $scope.register = function(){
    if($scope.user.password && $scope.user.password == $scope.passwordConfirm){
      registrationFactory.register($scope.user, function(returnedData){
        if(returnedData.data.errors){
          $scope.errorFlag = true;
          $scope.error = "Invalid user information"
          return;
        }
        $location.url("/login");
      });
    }
    else{
      $scope.errorFlag = true;
      $scope.error = "Password Error, please re-enter Password"
    }
  }
}]);
