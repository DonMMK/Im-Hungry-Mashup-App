const express = require("express");
const router = express.Router();
const axios = require("axios");
const yelp = require('yelp-fusion');

const apiKey = 'kR1ROdAbsem5zPOGEUgkl1M94Lm0SkDkUtNucQgIbpgB70FceTLSEHoztwhjiFZFA20RYrDl74Ypam4LbgOV1AET0MvLdDtWLFLn56d63sUMxw3tCnrN1MJEmpsVY3Yx';
// Default search parameters for restaurants
var shopTerm = "coffee";

// Fixed Brisbane location
const shopLat = "-27.470125";
const shopLong = "153.021072";

/* GET home page. */
router.get("/", function(req, res) {

    // Surprise me option - randomise the search term
    if (req.query.search == "surprise") {
        var randomShopID = Math.floor(Math.random() * 10);
        switch (randomShopID) {
            case 0:
                shopTerm = "chinese";
                break;
            case 1:
                shopTerm = "indian";
                break;
            case 2:
                shopTerm = "italian";
                break;
            case 3:
                shopTerm = "japanese";
                break;
            case 4:
                shopTerm = "korean";
                break;
            case 5:
                shopTerm = "mexican";
                break;
            case 6:
                shopTerm = "thai";
                break;
            case 7:
                shopTerm = "vietnamese";
                break;
            case 8:
                shopTerm = "pizza";
                break;
            case 9:
                shopTerm = "burger";
                break;
            default:
                shopTerm = "coffee";
        }
    } else {
        shopTerm = req.query.search;
    }
    console.log(req.query.search);
    console.log("before yelp api endpoint");
    const YELP_ENDPOINT =
        // default wiki endpoint for testing
        //"https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/2020/08/27";
        // yelp api key 
        `https://api.yelp.com/v3/businesses/search?term=${shopTerm}&latitude=${shopLat}&longitude=${shopLong}`;

    console.log("after yelp api endpoint");

    axios
        .get(YELP_ENDPOINT, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        })
        .then((response) => {
            // const { data } = response;
            // console.log(response.data);
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

/* POST */
// router.post("/", function(req, res) {
//     // res.send(JSON.stringify(req.body));
//     // res.redirect('/');
//     const shopInputName = req.body.search;
//     console.log(shopInputName);
//     console.log("inside index.js");
// });

module.exports = router;