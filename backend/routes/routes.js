const express = require('express');
const router = express.Router();
const authControllers = require("../controllers/authControllers")
const multer = require("multer");
const {store_image} = require("./multer");
const adminControllers = require("../controllers/adminControllers")
const checkAuth = require("../middleware/check-auth");

///all related to admin
router.post("/login", adminControllers.adminLogin);
router.post("/signup", adminControllers.adminCreate);

///all related to user
router.get("/users", checkAuth, authControllers.user_get);
router.get("/users/:id", checkAuth, authControllers.user_get);
router.get("/orders", checkAuth, authControllers.order_get);
router.get("/orders/:id", checkAuth, authControllers.order_get);

///all related to Order Data

router.post("", checkAuth, multer({storage: store_image}).single('image'), authControllers.menu_post);
router.get("", checkAuth, authControllers.meals_get);
router.get("/:id", checkAuth, authControllers.meal_get);
router.post("/order_status/",checkAuth,authControllers.meal_status_update);



router.put("/:id", checkAuth, multer({storage: store_image}).single('image'), authControllers.meal_update);
router.delete("/:id", checkAuth, authControllers.meal_delete);

module.exports = router;
