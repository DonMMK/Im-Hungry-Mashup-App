const express = require("express");
const router = express.Router();
const wiki = require("wikijs").default;

router.get("/summary/:title", function (req, res) {
  const { title } = req.params;

  wiki()
    .page(title)
    .then((page) => page.summary())
    .then((summary) => res.json({ summary }))
    .catch((error) => console.log(error));
});

module.exports = router;
