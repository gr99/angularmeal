var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  cart: {type: Object, required: true},
  status: {type: String, required: true},
  address: {type: String, required: true},
  totle: {type: Number, required: true},
  paymentId: {type: String, required: true},
  orderId: {type: String, required: true},
  date: {type: Date, required: true}
});
const Order = mongoose.model('Order', schema);
module.exports = Order;
