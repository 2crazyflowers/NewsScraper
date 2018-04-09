
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("../models");

// Initialize Express
//var app = express();
var express = require("express");
var app = express();

//Require mongojs
var mongoose = require("mongoose");

module.exports = function (app) {

  // Route for getting all unsaved articles from the db
  //this is for the root and uses index.handlebars
  app.get("/", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.find({saved:false}, function (err, result) {
      if (err) {
        console.log("Error in finding unsaved articles: " + err);
      }
      else {
        res.render("index", {
          articles: result
        });
      }
      });
  });

  //route for getting all the saved articles
  //this is for the /saved path and uses saved.handlebars
  app.get("/saved", function (req, res) {
    db.Article.find({saved: true}, function(err, result) {
      if (err) {
        console.log("Error in finding saved articles: " + err)
      }
      else {
        res.render("saved", {
          articles: result
        });
      }
    });
  });

  // Route for getting all articles from the db
  app.get("/articles", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.find({ saved: false }, function (err, result) {
      if (err) {
        console.log("Error in finding all articles: " + err);
      }
      else {
        res.render("index", {
          articles: result
        });
      }
    });
  });

}