angular.module("app").factory("registrationFactory", ["$http", function($http){
  var user = {};

  function RegistrationFactory(){
    var _this = this;

    this.register = function(regInfo, callbackSuccess, callbackError){
      $http.post("/register", regInfo).then(function(returned_data){
        if(returned_data.data.errors){
          console.log(Object.keys(returned_data.data.errors));
          callbackError(returned_data.data.errors);
        }
        else if(returned_data.data.errmsg){
          console.log("ERROR!");
          callbackError(returned_data.data.errmsg);
        }
        else{
          // user = returned_data.data;
          // console.log(returned_data);
          user.id = returned_data.data;
          callbackSuccess(user.id);
        }
      });
    }

    this.login = function(userInfo, callbackSuccess, callbackError){
      $http.post("/login", userInfo).then(function(returned_data){
        if(returned_data.data.errors){
          callbackError(returned_data.data.errors);
        }
        else{
          user = returned_data.data;
          user.loggedIn = true;
            callbackSuccess(user);
        }
      });
    }

    this.logout = function(callback){
      user.id = "";
      user.loggedIn = false;
      callback(user);
    }
  }
  return new RegistrationFactory();
}]);
