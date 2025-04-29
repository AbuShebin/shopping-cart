var db = require("../config/connection");
const { ObjectId } = require("mongodb");

module.exports = {
  addProduct: (product, callBack) => {
    const dbInstance = db.get();
    if (!dbInstance) {
      console.log("❌ Database not connected yet!");
      return;
    }

    console.log("🧪 Inserting product:", product);

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
  }
};
