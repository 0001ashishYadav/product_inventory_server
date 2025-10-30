import {
  errorPritify,
  UserLoginModel,
  UserSignupModel,
} from "./validation.mjs";
import { ServerError } from "../error.mjs";
import bcrypt from "bcrypt";
import { generateSecureRandomString } from "../utils.mjs";
import { DB_ERR_CODES, prisma, Prisma } from "../prisma/db.mjs";
import { asyncJwtSign } from "../async.jwt.mjs";

const login = async (req, res, next) => {
  const result = await UserLoginModel.safeParseAsync(req.body);
  if (!result.success) {
    throw new ServerError(400, errorPritify(result));
  }

  // find user by email from DB

  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  console.log(user);

  if (!user) {
    throw new ServerError(404, "user is not found");
  }

  // if (!user.accountVerified) {
  //   throw new ServerError(404, "verify you account first");
  // }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    throw new ServerError(401, "password mismatch");
  }

  const token = await asyncJwtSign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    process.env.TOKEN_SECRET,
    { expiresIn: process.env.TOKEN_EXPIRY_TIME }
  );

  res.json({
    msg: "login successful",
    token,
    expiresIn: process.env.TOKEN_EXPIRY_TIME,
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
};

const signup = async (req, res, next) => {
  const result = await UserSignupModel.safeParseAsync(req.body);
  if (!result.success) {
    throw new ServerError(400, errorPritify(result));
  }

  const hasedPassword = await bcrypt.hash(req.body.password, 10);

  // 2. generate a 32 keyword random string

  const randomString = generateSecureRandomString(32);

  // set token expiry time 15 minutes later

  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes later

  try {
    const newUser = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        password: hasedPassword,
      },
    });
    console.log(newUser);

    // 4. make link example http://localhost:5000/resetPassword/fgvjkdsuhvgyahfvajdsfahvdsjvbd

    const resetLink = `http://localhost:5000/resetPassword/${randomString}`;

    // 5. add this above link email replacing http://google.com

    //  send confirmation on email
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === DB_ERR_CODES.UNIQUE_ERR) {
        throw new ServerError(401, "User with this email already exists.");
      }
    }
    throw err;
  }

  console.log(req.body);

  res.json({ msg: "signup is successful" });
};
export { login, signup };
