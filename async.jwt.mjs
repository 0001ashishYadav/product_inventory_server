import jwt from "jsonwebtoken";
const asyncJwtSign = (payload, secret, option) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, option, (err, token) => {
      if (err) {
        return reject(err);
      }
      resolve(token);
    });
  });
};

const asyncJwtVerify = (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, token) => {
      if (err) {
        return reject(err);
      }
      resolve(token);
    });
  });
};

export { asyncJwtSign, asyncJwtVerify };
