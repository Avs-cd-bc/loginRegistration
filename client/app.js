const app = angular.module("app", ["ngRoute"]);

angular.module("app").config(function($routeProvider){
  $routeProvider.when("/register",  {
    templateUrl: "partials/registration.html",
    controller: "RegistrationController"
  })
  .when("/login", {
    templateUrl: "partials/login.html",
    controller: "LoginController"
  })
  .otherwise("/register");
});
