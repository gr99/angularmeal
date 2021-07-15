const mongoose = require('mongoose');
var schema = new mongoose.Schema({
  meal_name: String,
  meal_info: String,
  price: String,
  type: String,
  imagePath: String
});
var Meal = mongoose.model("Meal", schema);
module.exports = Meal;
