const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Users = mongoose.model("User");

function UsersController(){
  this.register = function(req, res){
    const newUser = new Users({
      firstName: req.body.first,
      lastName: req.body.last,
      email: req.body.email,
      password: req.body.pword,
      password_confirm: req.body.pwordConfirm,
      birthday: req.body.birthday
    });
    newUser.save(function(err, user){
      if(err) res.json(err)
      else{
        res.json(user._id);
      }
    });
  }

  // Why is this findOne never returning an error?  It just returns null if nothing is found
  this.login = function(req, res){
    console.log(req.body);
    Users.findOne({email: req.body.email}, function(err, user){
      console.log(err);
      console.log(user);
      if(err) res.json(err)
      else if(user){
        console.log(user);
        if(bcrypt.compareSync(req.body.password, user.password)){
          var tempUser = {};
          tempUser.id = user.id;
          tempUser.email = user.email;
          res.json(tempUser);
        }
        else{
          var error = {
            errors:{
              incorrect_password_error:{
                message: "Incorrect Password",
                kind:"Login Error",
                path:"password",
                value: req.body.password
              }
            }
          }
          res.json(error);
        }
      }
      else{
        var error = {
          errors:{
            user_not_found_error:{
              message: "No user email Found",
              kind:"Login Error",
              path:"email",
              value: req.body.email
            }
          }
        }
        res.json(error);
      }
    })
  }
}

module.exports = new UsersController();
