import passportJwt from "passport-jwt";
import fs from "fs";
import path from "path";
import userModel from "../models/user.model.js";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const __dirname = import.meta.dirname;
const pathToKey = path.join(__dirname, "/../../", "id_rsa_priv.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

// At a minimum, you must pass these options (see note after this code snippet for more)
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
};

const strategy = new JwtStrategy(options, async function (jwt_payload, done) {
  const user = await userModel.findOne({ _id: jwt_payload.sub });
  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
  }
});

export default (passport) => {
  passport.use(strategy);
};
