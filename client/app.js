const app = angular.module("app", ["ngRoute"]);

angular.module("app").config(function($routeProvider){
  $routeProvider.when("/register",  {
    templateUrl: "partials/registration.html",
    controller: "registrationController"
  })
  .when("/login", {
    templateUrl: "partials/login.html",
    controller: "loginController"
  })
  .otherwise("/register");
});
