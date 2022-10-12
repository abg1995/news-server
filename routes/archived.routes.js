const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const Archived = require("../models/archived.model");
const News = require('../models/news.model');

//GET list of archived news

router.get("/archived", (req, res, next) => {
    Archived.find()
      .then((response) => res.json(response))
      .catch((err) => {
        console.log("error displaying the archived news", err);
        res.status(500).json({
          message: "error displaying archived news",
          error: err,
        });
      });
  });



  //REMOVE ROUTE ARCHIVED NEWS

  router.delete("/archived/:archivedId", (req,res,next) => {
      const {archivedId } = req.params;

      Archived.findByIdAndRemove(archivedId)
        .then()
        .catch( err => {
            console.log('error deleting archived news', err)
            res.status(500).json({
                message: "error on deleting archived news",
                error: err
            });
        });
  });

module.exports = router;
