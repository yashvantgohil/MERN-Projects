const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.send("Hacker Ranking System Api"));

module.exports = router;
