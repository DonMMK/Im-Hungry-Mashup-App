const express = require("express");
const router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get("/", function (req, res) {
  const WIKI_ENDPOINT =
    "https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/2020/08/27";

  axios
    .get(WIKI_ENDPOINT)
    .then((response) => {
      const { data } = response;
      const allArticles = data.items[0].articles;

      // We only want the top 10 articles
      // Let's also remove the first two articles as they are always the Home & Search pages
      const topTenArticles = allArticles.splice(2, 10);
      res.render("index", { articles: topTenArticles });
    })
    .catch((error) => {
      console.log(error.toJSON());
    });
});

module.exports = router;
