const express = require("express");
const router = express.Router();
const axios = require("axios");
const yelp = require('yelp-fusion');
require('dotenv').config();
const apiKey = process.env.MY_API_KEY_1;
const apiKey2 = process.env.MY_API_KEY_2;

// Default search parameters for restaurants in the area to Test
// Test Case 1: Brisbane Coffee Shop
// var shopTerm = "coffee";
// const shopLat = "-27.470125";
// const shopLong = "153.021072";

// Test Case 2: London Coffee Shop
// var shopTerm = "coffee";
// const shopLat = "51.507351";
// const shopLong = "-0.127758";

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
    const GOOGLE_ENDPOINT = `https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey2}`;

    axios
        .post(GOOGLE_ENDPOINT) // get user location
        .then(response => {
            console.log("google api response");
            console.log(response.data);
            const shopLat = response.data.location.lat;
            const shopLong = response.data.location.lng;
            console.log(shopLat, shopLong);
            console.log("before yelp api endpoint");
            const YELP_ENDPOINT = `https://api.yelp.com/v3/businesses/search?term=${shopTerm}&latitude=${shopLat}&longitude=${shopLong}`;
            console.log("after yelp api endpoint");
            axios
                .get(YELP_ENDPOINT, {
                    headers: {
                        'Authorization': `Bearer ${apiKey}`
                    }
                })
                .then((response) => {
                    const allShops = response.data.businesses;
                    // Render the home page with the list of shops
                    res.render("index", { shops: allShops });
                })
                .catch((error) => {
                    console.log(error);
                });
        })
});

module.exports = router;