angular.module("app").factory("registrationFactory", RegistrationFactory);

  function RegistrationFactory($http){
    var user = {};
    var factory = {};

    factory.register = function(regInfo, callback){
      $http.post("/register", regInfo).then(function(returnedData){
        callback(returnedData);
      });
    }
    factory.login = function(userInfo, callback){
      $http.post("/login", userInfo).then(function(returnedData){
        if(!returnedData.data.error){
          user = returnedData.data;
          user.loggedIn = true;
        }
        callback(returnedData);
      });
    }
    factory.logout = function(callback){
      user.id = "";
      user.loggedIn = false;
      callback();
    }
    return factory;
  }
