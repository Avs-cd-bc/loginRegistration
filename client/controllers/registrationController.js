angular.module("app").controller("RegistrationController", ["$scope", "$location", "registrationFactory", function($scope, $location, registrationFactory){
  $scope.email;
  $scope.first;
  $scope.last;
  $scope.pword;
  $scope.pwordConfirm;
  $scope.birthday;
  $scope.user;
  $scope.error;
  $scope.errorFlag = false;

  $scope.register = function(){
    if($scope.pword && $scope.pword == $scope.pwordConfirm){

      var tempUser = {};
      tempUser.email = $scope.email;
      tempUser.first = $scope.first;
      tempUser.last = $scope.last;
      tempUser.pword = $scope.pword;
      tempUser.pwordConfirm = $scope.pwordConfirm;
      tempUser.birthday = $scope.birthday;

      registrationFactory.register(tempUser, function(returned_data){

        $scope.email = "";
        $scope.first = "";
        $scope.last = "";
        $scope.pword = "";
        $scope.pwordConfirm = "";
        $scope.birthday = null;

        $scope.errorFlag = false;
        $scope.user = returned_data;
        $location.url("/login");

      }, function(err_data){

        $scope.errorFlag = true;
        $scope.error = err_data;
      });
    }
    else{
      $scope.errorFlag = true;
      $scope.error = "Password Error, please re-enter Password"
      console.log("NO PASSWORD SPECIFIED");
    }
  }
}]);
