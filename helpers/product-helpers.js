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
        callBack(data);
      })
      .catch((err) => {
        console.log("❌ Insert error:", err);
      });
  },
};
