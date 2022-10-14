const router = require("express").Router();
const { default: mongoose } = require('mongoose');
const News = require('../models/news.model');
const Archived = require('../models/archived.model');

//GET list of news

router.get("/news", (req, res, next) => {
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


//PUT ROUTE TO MOVE NEWS TO ARCHIVED

router.put("/news/:newsId", (req,res,next) => {
    const {newsId} = req.params;
    let newsForArchive;
    News.findById(newsId)
    .then(response=>{
        newsForArchive= {
            title : response.title,
            text : response.text,
            image: response.image || null,
            date:  response.date || null
        }
        return News.findByIdAndDelete(newsId)
    })
        .then( () =>{
            console.log("RESPONSEEEEE    "+ newsForArchive)
            return Archived.create(newsForArchive)
        })
        .then( (response) => {
            console.log("LOOK AT THIS REPSONSE" + response)
            res.status(201).json(response)
        })
        .catch((err) => {
            console.log("error updating the news posistion", err)
            res.status(500).json({
                message: "error changiong the news to archived",
                error: err
            });
        });
})

 

module.exports = router;