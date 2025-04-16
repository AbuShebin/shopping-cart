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
      let user = await db
        .get()
        .collection("users")
        .findOne({ name: userData.name });
      if (user) {
        bcrypt.compare(userData.password, user.password).then((result) => {
          if (result) {
            console.log("login successfull");
          } else {
            console.log("login failed");
          }
        });
      } else {
        console.log("login failed");
      }
    });
  },
};
