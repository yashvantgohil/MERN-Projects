const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { User } = require("../model/User");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const auth = require("../middleware/auth");

//GET : api/auth/me
router.post("/me", auth, async (req, res) => {
  let user = await User.findById(req.user._id).select("-password");
  if (!user) return res.status(400).send("User Not Found");
  return res.send(user);
});

//POST : api/auth
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res.status(400).send(error.details.map((x) => x.message).join("\n"));

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  //hashing password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();
  return res.send(token);
});

const validate = (req) => {
  const loginSchema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return loginSchema.validate(req, { abortEarly: false });
};

module.exports = router;
