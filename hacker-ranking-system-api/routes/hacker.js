const express = require("express");
const { Hacker, validateHacker } = require("../model/Hacker");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// GET : api/hackers/
router.get("/", async (req, res) => {
  const hackers = await Hacker.find().sort("name");
  res.send(hackers);
});

// GET : api/hackers/:id
router.get("/:id", async (req, res) => {
  const hacker = await Hacker.findById(req.params.id);
  if (!hacker) return res.status(400).send("hacker with id not found");
  res.send(hacker);
});

// POST : api/hackers/
router.post("/", [auth, admin], async (req, res) => {
  console.log(req.body);
  const { error } = validateHacker(req.body);
  if (error)
    return res.status(400).send(error.details.map((x) => x.message).join("\n"));

  let hacker = await Hacker.findById(req.body.id);
  if (hacker) return res.status(400).send("name is already available");

  const rank = await Hacker.find().count();

  hacker = new Hacker(req.body);
  hacker.overallRank = rank + 1;
  hacker.save();

  res.send(hacker);
});

// PUT : api/hackers/
router.put("/", [auth, admin], async (req, res) => {
  let hacker = Hacker.findById(req.params.id);
  if (!hacker) return res.status(404).send("hacker with given id not found");

  const { error } = validateHacker({ ...hacker, ...req.body });
  if (error)
    return res.status(400).send(error.details.map((x) => x.message).join("\n"));

  Hacker.findOneAndUpdate(
    id,
    { $set: { ...req.body } },
    { new: true }
  ).then((product) => res.send(product));
});

// DELETE : api/hackers/:id
router.delete("/hackers/:id", [auth, admin], async (req, res) => {
  const hacker = await Hacker.findByIdAndRemove(req.params.id);
  res.send(hacker);
});

module.exports = router;
