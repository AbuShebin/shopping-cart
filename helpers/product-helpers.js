const { log } = require("debug/src/browser");
var db = require("../config/connection");
const { ObjectId } = require("mongodb");

module.exports = {
  addProduct: (product, callBack) => {
    const dbInstance = db.get();
    if (!dbInstance) {
      console.log("❌ Database not connected yet!");
      return;
    }

    dbInstance
      .collection("products")
      .insertOne(product)
      .then((data) => {
        console.log("✅ Inserted product:", data.insertedId);
        callBack(data.insertedId.toString());
      })
      .catch((err) => {
        console.log("❌ Insert error:", err);
      });
  },

  getAllProducts: () => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("get all product helper function");
        let result = await db.get().collection("products").find().toArray();
        resolve(result);
      } catch (e) {
        console.log(e);
      }
    });
  },

  deleteProduct:(productId)=>{
    return new Promise((resolve,reject)=>{
      db.get().collection("products").deleteOne({ _id: new ObjectId(productId) }).then((result) => {
        console.log("Product deleted", result);
      });
    })
  },

  editProduct:(product,productId)=>{
    console.log("edit product resolver",product,productId.id);
    
          const objectId = ObjectId.createFromHexString(productId.id);

          console.log("object id ",objectId);
          


    return new Promise(async (resolve,reject)=>{
      const result = await db.get().collection("products").updateOne({_id:objectId}, { $set: {
        "name":product.name,
        "category":product.category,
        "description":product.description
      } }).then((value)=>{
        resolve()
      })
console.log("Update result:", result);
  },)},

  getProductDetails:(productId)=>{
    console.log("productId:",productId);
    
    return new Promise(async (resolve,reject)=>{
      const objectId = ObjectId.createFromHexString(productId);

     let result = await db.get().collection("products").findOne({
        _id: objectId
      });

      resolve(result);
      
    })
  },

  addTOCart:(productId,userId)=>{
    return new Promise(async(resolve,reject)=>{
     let result = await db.get().collection("cart").findOne({
        "userId":productId
      })

      if(result){
        console.log("cart is already set");
      }else{
        db.get().collection("cart").insertOne({
          "userId":Object(userId),
          "products":[Object(productId)]
        })
      }
    })
  }
};
