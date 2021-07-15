const User = require("../models/adminModel");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


module.exports.adminCreate = (req, res) => {
  const {email, password} = req.body;
  console.log("hiiii");
  bcrypt.hash(password, 10).then(
    (hash) => {
      const user = User({
        email, password: hash
      });
      user.save().then((result) => {
        console.log("User is Created");
        res.status(201).json({msg: "User Reg Successfully", result: result});
      }).catch(e => {
        console.log("This is Error" + e);
        res.status(500).json({error: e});
      })
    }
  ).catch((e) => {
    console.log("Error in login");
  })
}
module.exports.adminLogin = (req, res) => {
  const {email, password} = req.body;
  let fatchedUser;
  User.findOne({email: email}).then(user => {
    if (!user) {
      return res.status(401).json({
        message: "User Not Found"
      })
    }
    fatchedUser = user;
    return bcrypt.compare(password, user.password).then(result => {
      console.log(result);
      if (!result) {
        return res.status(401).json({
          message: "Password Not Matched"
        })
      }
      var token = jwt.sign({
        email: fatchedUser.email,
        userId: fatchedUser._id
      }, 'password@1234@gmail.com', {expiresIn: "1h"});
      console.log("loggedIn");
      return res.status(200).json({
        token: token,
        expiresIn: 3600
      })

    }).catch(e => {
      console.log(e);
      return res.status(401).json({
        message: "Auth Failed"
      })
    });
  })
}
