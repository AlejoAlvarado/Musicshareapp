"use strict";

const jwt = require("jwt-simple");
const moment = require("moment");
const config = require("../config");

function createToken(user) {
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(1, "day").unix(),
  };

  return jwt.encode(payload, config.SECRET_TOKEN);
}

function decodeToken(token) {
  console.log("decode token");
  const decoded = new Promise((resolve, reject) => {
    try {
      console.log("decoding token");
      const payload = jwt.decode(token, config.SECRET_TOKEN);
      console.log("token decoded");
      console.log(payload);
      if (payload.exp <= moment().unix()) {
        console.log("token rejected1");
        reject({
          status: 401,
          message: "El Token ha expirado",
        });
      }
      console.log("token resolved");
      resolve(payload.sub);
    } catch (err) {
      console.log("token rejected2");
      reject({
        status: 500,
        message: "invalid token",
      });
    }
  });

  return decoded;
}

module.exports = {
  createToken,
  decodeToken,
};
