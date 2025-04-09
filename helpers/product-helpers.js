var db = require("../config/connection");

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

  getAllProducts: async (callBack) => {
    try {
      console.log("get all product helper function");
      let result = await db.get().collection("products").find().toArray();
      callBack(result);
    } catch (e) {
      console.log("error is ", e);
    }
  },
};
