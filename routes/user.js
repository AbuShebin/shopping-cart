var express = require("express");
var router = express.Router();
var productHelper = require("../helpers/product-helpers");
var userHelper = require("../helpers/userHelper");
const session = require("express-session");

router.get("/", function (req, res) {
  let user = req.session.user;
  console.log(user);
  productHelper.getAllProducts().then((products) => {
    res.render("user/viewAllProducts", { admin: false, products, user });
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
  console.log("login page called----------",req.session)
  if(req.session.user){
    res.redirect('/')
  }else{
      res.render("user/login",{"loginErr":req.session.loginErr});
  }
});

router.post("/login", (req, res) => {
  userHelper.loginUser(req.body).then((data) => {
    console.log("reponse data", data);
    if (data.status) {
      req.session.status = true;
      req.session.user = data.data;
      res.redirect("/");
    } else {
      req.session.loginErr = "Invalid username or password"

      res.redirect("/login");
    }
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

router.get("/cart",(req,res)=>{
  res.render("user/cart")
})

module.exports = router;
