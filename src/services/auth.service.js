import { issueJWT } from "../lib/utils.js";
import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";

class AuthenticationService {
  static register = async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await UserModel.findOne({ email }).lean();
    if (user) {
      return res
        .status(400)
        .json({ status: "error", message: "User already exists" });
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
        return res.status(200).json({
          status: "success",
          message: "User created successfully",
          user,
          token: JWT.token,
          expiresIn: JWT.expires,
        });
      })
      .catch((error) => {
        return res
          .status(500)
          .json({ status: "error", message: error.message });
      });
  };

  static login = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }).lean();
    if (!user) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid email or password" });
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid email or password" });
    }

    const JWT = issueJWT(user);
    return res.status(200).json({
      status: "success",
      message: "Login successfully",
      user,
      token: JWT.token,
      expiresIn: JWT.expires,
    });
  };
}

export default AuthenticationService;
