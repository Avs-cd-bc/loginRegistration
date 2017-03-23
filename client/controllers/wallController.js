angular.module("app").controller("wallController", function($scope, $window, $cookies, registrationFactory){
  $scope.error = "";
  $scope.errorFlag = false;
  $scope.user = {};
  logInCheck();

  function logInCheck(){
    registrationFactory.logInCheck(function(user){
      if(!user.loggedIn){
        $scope.error = "You must login, redirecting...";
        $scope.errorFlag = true;
        user.redirected = true;
        $window.setTimeout(function(){
          $window.location = "#!/login";
        }, 2000);
      }
      else{
        $scope.user.email = $cookies.get("userEmail");
      }
    });
  }

});
