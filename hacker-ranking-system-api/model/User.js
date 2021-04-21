const { Schema, model } = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const Joi = require("joi");

const userSchema = new Schema({
  name: {
    type: String,
    requried: true,
    trim: true,
    minLength: 5,
    maxLength: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 5,
    maxLength: 255,
  },
  password: {
    type: String,
    requried: true,
    trim: true,
    minLength: 5,
    maxLength: 255,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    _.pick(this, ["_id", "name", "email", "isAdmin"]),
    config.get("jwtPrivateKey")
  );
};

const User = model("User", userSchema);

const validateUser = (user) => {
  const userSchema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return userSchema.validate(user, { abortEarly: false });
};

module.exports.validateUser = validateUser;
module.exports.User = User;
