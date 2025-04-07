const { MongoClient } = require("mongodb");

const state = {
  db: null,
};

module.exports.connect = async function (done) {
  const url = "mongodb://localhost:27017";
  const dbname = "shopping";

  console.log("📡 Attempting to connect to MongoDB...");

  try {
    const client = await MongoClient.connect(url);
    console.log("checkprint 4");

    console.log("✅ MongoDB connected");

    state.db = client.db(dbname);
    console.log("✅ DB ready:", dbname);

    done();
  } catch (err) {
    console.log("❌ Connection error:", err);
    done(err);
  }
};

module.exports.get = function () {
  return state.db;
};
