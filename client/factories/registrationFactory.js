angular.module("app").factory("registrationFactory", RegistrationFactory);

  function RegistrationFactory($http, $cookies){
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
          var cookieExpire = new Date();
          cookieExpire.setMinutes(cookieExpire.getMinutes() + 20);
          $cookies.put("userEmail", returnedData.data.email , {"expires" : cookieExpire});
          user = returnedData.data;
          user.loggedIn = true;
        }
        callback(returnedData);
      });
    }
    factory.logout = function(callback){
      user.id = "";
      user.loggedIn = false;
      $cookies.remove("userEmail");
      callback();
    }
    factory.logInCheck = function(callback){
      callback(user);
    }
    return factory;
  }
