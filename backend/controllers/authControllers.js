const Meal = require('../models/mealModel');
const User = require("../models/userModel");
const Order = require("../models/orderModel");


module.exports.menu_post = async (req, res) => {
  const url ="https" + '://' + req.get("host");
  var {meal_name, meal_info, price, type} = req.body;
  let meal = new Meal({
    meal_name,
    meal_info,
    price,
    type,
    imagePath: url + "/images/" + req.file.filename
  });
  if (await meal.save()) {
    console.log(meal)
    res.json({msg: "Saved to database", post: meal});
  } else {
    res.json({msg: "Not Saved to database"});
  }
}

//get all Meal
module.exports.meals_get = async (req, res) => {

  try {
    let meal = await Meal.find();
    res.json({meal: meal});
  } catch (e) {
    res.json({msg: e});
  }
}
//get single Meal
module.exports.meal_get = async (req, res) => {
  try {
    let meal = await Meal.findById(req.params.id);
    res.json(meal);
  } catch (e) {
    res.json({msg: e});
  }
}

//meal update
module.exports.meal_update = async (req, res) => {

  let imagePath = req.body.imagePath;
  var {meal_name, meal_info, price, type} = req.body;
  if (req.file) {
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  const meal = {
    meal_name, meal_info, price, type, imagePath
  };
  const mealId = req.params.id;
  await Meal.updateOne({_id: mealId}, meal);
  res.json({msg: 'Done'})
}
module.exports.meal_delete = async (req, res) => {
  const mealId = req.params.id;
  Meal.deleteOne({_id: mealId}).then((result) => {
    res.status(200).json({msg: "Done"});
  }).catch((e) => {
    res.status(301).json({msg: "Post Not Deleted"})
  })
}

//get user get
module.exports.user_get = async (req, res) => {
  console.log("USER GET");
  let reqId = req.params.id;
  if (reqId) {
    await User.findOne({_id: reqId}).then(result => {
      res.json({user: result})
    }).catch((e) => {
      res.json({msg: e});
    })
  } else {
    User.find().then(result => {
      res.json({user: result})
    }).catch(e => {
      res.json({msg: e});
    });
  }
}

//update Order Status
module.exports.meal_status_update = async (req, res) => {
  let reqId = req.body.id;
  let paymentStatus = req.body.status;
  await Order.findOneAndUpdate({_id: reqId}, {
    status: paymentStatus
  },{new:true}).then((val) => {
    res.json({msg: "Done",order:val});
  }).catch((error) => {
    console.log(error);
    res.json({msg: "Error"});
  });
}

//get all Orders
module.exports.order_get = async (req, res) => {
  let reqId = req.params.id;
  if (reqId) {
    Order.find({user: reqId}).sort({date: -1}).then(result => {
      res.json({order: result})
    }).catch(e => {
      res.json({msg: e});
    });
  } else {
    Order.find().sort({date: -1}).then(result => {
      res.json({order: result})
    }).catch(e => {
      res.json({msg: e});
    });
  }
}

