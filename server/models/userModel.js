const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  firstName: {
    type: String, required: true,
    validate: {
      validator: function (testString){
        return /^[A-Za-z]+$/.test(testString);
      }
    }
  },
  lastName: {
    type: String, required: true,
    validate: {
      validator: function (testString){
        return /^[A-Za-z]+$/.test(testString);
      }
    }
  },
  email: {
    type: String, required: true, unique: true,
    validate: {
      validator: function (testString){
        return /\w+@\w+\.\w+/.test(testString);
      }
    }
  },
  password: {
    type: String, required: true
  },
  birthday: {
    type: Date, required: true
  }
});

UserSchema.pre("save", function(done){
  var salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  done();
});

mongoose.model("User", UserSchema);
