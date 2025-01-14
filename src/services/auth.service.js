import bcrypt from "bcrypt";
import { issueJWT } from "../lib/utils.js";
import UserModel from "../models/user.model.js";
import { responseError, responseSuccess } from "../helpers/responseHelper.js";

class AuthenticationService {
  static register = async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await UserModel.findOne({ email }).lean();
    if (user) {
      return responseError(res, "User already exists", 400);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name,
      email,
      password: passwordHash,
    });

    await newUser
      .save()
      .then((user) => {
        const JWT = issueJWT(user);
        return responseSuccess(res, "User created successfully", {
          user,
          token: JWT.token,
          expiresIn: JWT.expires,
        });
      })
      .catch((error) => {
        next(error);
      });
  };

  static login = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }).lean();
    if (!user) {
      return responseError(res, "Invalid email or password", 400);
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      return responseError(res, "Invalid email or password", 400);
    }

    const JWT = issueJWT(user);
    return responseSuccess(res, "Login successfully", {
      user,
      token: JWT.token,
      expiresIn: JWT.expires,
    });
  };
}

export default AuthenticationService;
