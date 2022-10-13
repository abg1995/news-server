const router = require("express").Router();
const { default: mongoose } = require('mongoose');
const News = require('../models/news.model');

//GET list of news

router.get("/", (req, res, next) => {
    News.find()
      .then((response) => res.json(response))
      .catch((err) => {
        console.log("error displaying the news", err);
        res.status(500).json({
          message: "error displaying news",
          error: err,
        });
      });
  });




module.exports = router;