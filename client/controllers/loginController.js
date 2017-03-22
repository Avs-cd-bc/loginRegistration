angular.module("app").controller("loginController", function($scope, $location, $window, registrationFactory){
  $scope.id;
  $scope.errorFlag = false;
  $scope.loggedIn = false;

  $scope.login = function(){
    if($scope.user.password){
      registrationFactory.login($scope.user, function(returnedData){
        if(returnedData.data.error){
          $scope.errorFlag = true;
          $scope.error = returnedData.data.error.message;
        }
        else{
          $scope.loggedIn = returnedData.data.loggedIn;
          $scope.id = returnedData.data.id;
          $scope.email = returnedData.data.email;
          $scope.errorFlag = false;
          $scope.error = "";
        }
      });
    }
    else{
      $scope.errorFlag = true;
      $scope.error = "Password required!";
    }
  }
  $scope.logout = function(){
    registrationFactory.logout(function(){
      $window.location.reload(true);
    });
  }
});
