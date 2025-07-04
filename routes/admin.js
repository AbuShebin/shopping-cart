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

router.get("/deleteProduct/:id",(req,res)=>{
console.log("poduct deletion",req.params.id)
productHelper.deleteProduct(req.params.id)
})

router.get("/editProduct/:id",(req,res)=>{
    // console.log("editPROduct called",req.params.);
    productHelper.getProductDetails(req.params.id).then((value)=>{
        res.render("admin/edit-product",{product:value});
    })
})
 
router.post("/editProduct/:id",(req,res)=>{
console.log("edit product submited");
  console.log("req.params",req.params.id);
  productHelper.editProduct(req.body,req.params).then((value)=>{
    res.redirect("/admin")
  })
})

module.exports = router;