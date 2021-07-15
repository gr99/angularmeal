const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token,'password@1234@gmail.com');
    next();
  }catch (e) {
    res.status(401).json({message:"Auth Failed"});
  }
};
