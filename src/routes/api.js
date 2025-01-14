import express from "express";

import auth from "./auth.route.js";
import passport from "passport";

const router = express.Router();

router.use("/account", auth);
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
