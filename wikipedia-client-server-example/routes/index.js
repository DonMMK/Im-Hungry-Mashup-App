const express = require("express");
const router = express.Router();
const axios = require("axios");
// const yelp = require('yelp-fusion');

const apiKey = 'kR1ROdAbsem5zPOGEUgkl1M94Lm0SkDkUtNucQgIbpgB70FceTLSEHoztwhjiFZFA20RYrDl74Ypam4LbgOV1AET0MvLdDtWLFLn56d63sUMxw3tCnrN1MJEmpsVY3Yx';


/* GET home page. */
router.get("/", function(req, res) {
    const YELP_ENDPOINT =
        //"https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/2020/08/27";
        // yelp api key 
        "https://api.yelp.com/v3/businesses/search?term=chicken&latitude=-27.470125&longitude=153.021072";

    axios
        .get(YELP_ENDPOINT, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        })
        .then((response) => {
            // const { data } = response;
            console.log(response.data);
            // const allArticles = data.items[0].articles;
            const allShops = response.data.businesses;
            //console.log(allShops);


            // We only want the top 10 articles
            // Let's also remove the first two articles as they are always the Home & Search pages
            res.render("index", { shops: allShops });
        })
        .catch((error) => {
            console.log(error);
        });
});

module.exports = router;