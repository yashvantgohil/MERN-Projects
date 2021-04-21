const { Schema, model } = require("mongoose");
const Joi = require("joi");

const hackerSchema = new Schema({
  name: { type: String, required: true, unique: true },
  profileLink: { type: String },
  locatoin: { type: String },
  education: { type: String },
  challangesSolved: { type: Number, default: 0 },
  solutionsSubmitted: { type: Number, default: 0 },
  solutionsAccepted: { type: Number, default: 0 },
  overallRank: { type: Number },
  followers: { type: Number, default: 0 },
  following: { type: Number, default: 0 },
});

const validateHacker = function (hacker) {
  const hackerObj = Joi.object({
    name: Joi.string().required(),
    profileLink: Joi.string(),
    locatoin: Joi.string(),
    education: Joi.string(),
    challangesSolved: Joi.number(),
    solutionsSubmitted: Joi.number(),
    solutionsAccepted: Joi.number(),
    overallRank: Joi.number(),
    followers: Joi.number(),
    following: Joi.number(),
  });

  return hackerObj.validate(hacker, { abortEarly: false });
};

module.exports.Hacker = model("Hacker", hackerSchema);
module.exports.validateHacker = validateHacker;
