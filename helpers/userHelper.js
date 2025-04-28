const bcrypt = require("bcrypt");
var db = require("../config/connection");

module.exports = {
  signUpUser: (userData) => {
    return new Promise((resolve, reject) => {
      userData.password = bcrypt
        .hash(userData.password, 10)
        .then((hashedPassword) => {
          userData.password = hashedPassword;
          db.get().collection("users").insertOne(userData);
        });
    }).then((data) => {
      console.log("database iserted data", data);
      resolve(data);
    });
  },

  loginUser: (userData) => {
    return new Promise(async (resolve, reject) => {
      let response = {};
      let user = await db
        .get()
        .collection("users")
        .findOne({ name: userData.name });
      if (user) {
        bcrypt.compare(userData.password, user.password).then((result) => {
          if (result) {
            console.log("result - x", result);
            if (result) {
              response.status = true;
              response.data = user;

              resolve(response);
            }
          } else {
            resolve({ status: false });
          }
        });
      } else {
        resolve({ status: false });
      }
    });
  },
};
