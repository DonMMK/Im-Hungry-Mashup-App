'use strict';

const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'kR1ROdAbsem5zPOGEUgkl1M94Lm0SkDkUtNucQgIbpgB70FceTLSEHoztwhjiFZFA20RYrDl74Ypam4LbgOV1AET0MvLdDtWLFLn56d63sUMxw3tCnrN1MJEmpsVY3Yx';

const searchRequest = {
    term: 'chicken',
    location: 'brisbane'
};

const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {
    const firstResult = response.jsonBody.businesses[0];
    const prettyJson = JSON.stringify(firstResult, null, 4);
    console.log(prettyJson);
}).catch(e => {
    console.log(e);
});