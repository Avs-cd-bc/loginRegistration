const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Users = mongoose.model("User");

function UsersController(){
  this.register = function(req, res){
    const newUser = new Users(req.body);
    newUser.save(function(err, user){
      if(err) res.json(err)
      else{
        res.json(user._id);
      }
    });
  }

  this.login = function(req, res){
    console.log(req.body);
    Users.findOne({email: req.body.email}, function(err, user){
      if(err) res.json(err)
      else if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
          res.json({status: "succes", id: user.id, email: user.email});
        }
      }
      else{
        var error = {
          errors:{
            login_error:{
              message: "Incorrect Username or Password",
              kind:"Login Error"
            }
          }
        }
        res.json(error);
      }
    });
  }
}

module.exports = new UsersController();
