import { ca } from "zod/locales";
import { asyncJwtVerify } from "./async.jwt.mjs";
import { ServerError } from "./error.mjs";

const authentication = async (req, res, next) => {
  // 1. check for token is available
  // 2. validate token
  // 3. extract payload of token
  // 4. attach user details to request for further use

  if (!req.headers.authorization) {
    throw new ServerError(401, "token not supplied");
  }

  const [bearer, token] = req.headers.authorization.split(" ");
  if (!bearer || !token) {
    throw new ServerError(401, "Bearer token not supplied");
  }
  if (bearer !== "Bearer") {
    throw new ServerError(401, "Bearer token not supplied!");
  }

  try {
    const user = await asyncJwtVerify(token, process.env.TOKEN_SECRET);
    req.user = user;
  } catch (err) {
    throw new ServerError(401, err.message);
  }
  next();
};

const authorization = (...roles) => {
  console.log(roles);
  return async (req, res, next) => {
    console.log("check authority here");
    if (roles.findIndex((e) => e === req.user.role) < 0) {
      throw new ServerError(401, "you are not authorized for this request");
    }
    next();
  };
};

export { authentication, authorization };
