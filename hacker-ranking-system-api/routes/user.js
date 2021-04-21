const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../model/User");
const _ = require("lodash");
const bcrypt = require("bcrypt");

//POST : api/users
router.post("/", async (req, res) => {
  console.log("api/users");
  const { error } = validateUser(req.body);
  console.log(error);
  if (error)
    return res.status(400).send(error.details.map((x) => x.message).join("\n"));

  let user = await User.findOne({ email: req.body.email });
  console.log("user", user);
  if (user) return res.status(400).send("email id is already available");

  //hashing password
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  user = new User(_.pick(req.body, ["name", "email", "password"]));

  await user.save();

  const token = user.generateAuthToken();
  return res.header("x-auth-token", token).send(user);
});

module.exports = router;
