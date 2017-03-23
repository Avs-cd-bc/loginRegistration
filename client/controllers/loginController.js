angular.module("app").controller("loginController", function($scope, $location, $window, $cookies, registrationFactory){
  $scope.id;
  $scope.errorFlag = false;
  $scope.loggedIn = false;

  startUp();

  function startUp(){
    registrationFactory.logInCheck(function(user){
      if(user.redirected || !user.loggedIn){
        $scope.errorFlag = true;
        $scope.error = "You must re-login to see the wall!";
      }
    });
    $scope.email = $cookies.get("userEmail") ? $cookies.get("userEmail") : undefined;
    $scope.loggedIn = $scope.email ? true : false;
  }

  $scope.login = function(){
    if($scope.user.password && $scope.user.email){
      registrationFactory.login($scope.user, function(returnedData){
        if(returnedData.data.error){
          $scope.errorFlag = true;
          $scope.error = returnedData.data.error.message;
        }
        else{
          $location.url("/wall");
        }
      });
    }
    else{
      $scope.errorFlag = true;
      $scope.error = "Missing info!";
    }
  }

  $scope.logout = function(){
    registrationFactory.logout(function(){
      $window.location.reload(true);
    });
  }
});
