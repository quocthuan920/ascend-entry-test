import express from "express";

import auth from "./auth.route.js";
import movie from "./movie.route.js";
import rating from "./rating.route.js";
import passport from "passport";

const router = express.Router();

router.use("/account", auth);
router.use("/movies", movie);
router.use("/ratings", rating);

router.use(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res
      .status(200)
      .json({ message: "You are authorized to see this message." });
  }
);

export default router;
