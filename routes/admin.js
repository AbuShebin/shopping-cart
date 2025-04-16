var express = require("express");
var router = express.Router();
var productHelper = require("../helpers/product-helpers");
const path = require("path");

/* GET users listing. */
router.get("/", function (req, res, next) {
  productHelper.getAllProducts().then((products) => {
    res.render("admin/viewAllProducts", { admin: true, products });
  });
});

router.get("/add-product", (req, res) => {
  res.render("admin/add-product");
});

router.post("/add-product", (req, res) => {
  console.log("Form data:", req.body);

  productHelper.addProduct(req.body, (id) => {
    console.log(id);
    let image = req.files.image;
    let imagePath = path.join(
      __dirname,
      "../public/product-images",
      id + ".jpg"
    );

    image.mv(imagePath, (err, done) => {
      if (!err) {
        res.render("admin/add-product");
      } else {
        console.log("something went wrong", err);
      }
    });
  });
});

module.exports = router;
