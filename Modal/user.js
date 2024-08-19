const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  pass: {
    type: String,
    require: true,
  }

});

module.exports = mongoose.model("JwtTest", userSchema)