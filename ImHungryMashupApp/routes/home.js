const express = require("express");
const router = express.Router();
var AWS = require('aws-sdk');

const bucketName = process.env.BUCKETNAME;
const s3Key = `counter-${process.env.KEY}`;
const s3 = new AWS.S3({ apiVersion: "2006-03-01", region: process.env.REGION });


router.get("/", function(req, res) {
    getCounter(s3, bucketName, s3Key)
        .then((data) => {
            const counterVariable = parseInt(data.Body.toString()) + 1;
            res.render("home", { Counter: counterVariable.toString() });
            updateCounter(s3, bucketName, s3Key, counterVariable.toString()).then((data) => {
                    console.log("Counter updated");
                })
                .catch((error) => console.log(error));
        })
        .catch((error) => res.render("home", { Counter: "Error. Counter Fail" }));

});

function getCounter(s3, bucketName, s3Key) {
    const params = {
        Bucket: bucketName,
        Key: s3Key
    };
    return s3.getObject(params).promise();
}

function updateCounter(s3, bucketName, s3Key, counter) {
    const params = {
        Bucket: bucketName,
        Key: s3Key,
        Body: counter
    };
    return s3.putObject(params).promise();
}

module.exports = router;