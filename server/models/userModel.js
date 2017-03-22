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
  console.log("calling pre-save");
  var salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  console.log("done with pre-save");
  done();
});

mongoose.model("User", UserSchema);


/*validation required:
first name: letters only
last name: letters only

email: email format
password: min length 8 characters
birthday: required
*/
