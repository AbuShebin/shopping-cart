var express = require("express");
var router = express.Router();
var productHelper = require("../helpers/product-helpers");
var userHelper = require("../helpers/userHelper");

router.get("/", function (req, res) {
  productHelper.getAllProducts().then((products) => {
    res.render("user/viewAllProducts", { admin: false, products });
  });
});

router.get("/signup", (req, res) => {
  res.render("user/signup");
});

router.post("/signup", (req, res) => {
  console.log("form data", req.body);
  userHelper.signUpUser(req.body).then((data) => {
    res.send("singup successfull");
    console.log(data);
  });
});

router.get("/login", (req, res) => {
  res.render("user/login");
});

router.post("/login", (req, res) => {
  userHelper.loginUser(req.body);
});

module.exports = router;
