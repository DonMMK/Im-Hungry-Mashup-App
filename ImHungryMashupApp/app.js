require('dotenv').config();


var AWS = require('aws-sdk');
const { createBucket } = require('./createBucket.js');

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");

const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");
const homeRouter = require("./routes/home");

// console.log("Access ID: " + process.env.AWS_ACCESS_KEY_ID);
// console.log("Secret Key: " + process.env.AWS_SECRET_ACCESS_KEY);
// console.log("Session Token " + process.env.AWS_SESSION_TOKEN);
// console.log("API Key 1:" + process.env.MY_API_KEY_1);
// console.log("API Key 2:" + process.env.MY_API_KEY_2);
const app = express();

const bucketName = process.env.BUCKETNAME;
const s3Key = `counter-${process.env.KEY}`;
const s3 = new AWS.S3({ apiVersion: "2006-03-01", region: process.env.REGION });
createBucket(s3, bucketName, s3Key);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", homeRouter);
app.use("/yelp", indexRouter);
app.use("/api", apiRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});



module.exports = app;