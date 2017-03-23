const app = angular.module("app", ["ngRoute", "ngCookies"]);

angular.module("app").config(function($routeProvider){
  $routeProvider.when("/register",  {
    templateUrl: "partials/registration.html",
    controller: "registrationController"
  })
  .when("/login", {
    templateUrl: "partials/login.html",
    controller: "loginController"
  })
  .when("/wall", {
    templateUrl: "partials/wall.html",
    controller: "wallController"
  })
  .otherwise("/register");
});
