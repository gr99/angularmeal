var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var adminSchema = new Schema({

  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});
adminSchema.plugin(uniqueValidator);
// This creates our model from the above schema, using mongoose's model method
var admin = mongoose.model("admin", adminSchema);

// Export the Article model
module.exports = admin;
