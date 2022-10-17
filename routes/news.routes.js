const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const News = require("../models/news.model");
const Archived = require("../models/archived.model");

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

//POST route create news

router.post("/news/post", (req, res, next) => {
  const { title, text, image, date } = req.body;

  const input = { title, text, image, date };

  News.create(input)
    .then((response) => {
        console.log(response)
      res.json(response);
    })
    .catch((err) => {
      console.log("error creating news post", err);
      res.status(500).json({ message: "error creating news post", error: err });
    });
});


router.get("/news/:newsId", (req,res,next) => {
    const { newsId } = req.params;

    News.findById(newsId)
        .then((response) => {
            res.json(response)
            console.log("here is the article", response)
        })
        .catch((err) => {
            console.log("error getting the news article", err)
            res.status(500).json({
                message: "error in backend getting news article",
                error: err
            })
        })
})

//PUT ROUTE TO MOVE NEWS TO ARCHIVED

router.put("/news/:newsId", (req, res, next) => {
  const { newsId } = req.params;
  let newsForArchive;
  News.findById(newsId)
    .then((response) => {
      newsForArchive = {
        title: response.title || null,
        text: response.text || null,
        image: response.image || null,
        date: response.date || null,
      };
      return News.findByIdAndDelete(newsId);
    })
    .then(() => {
      return Archived.create(newsForArchive);
    })
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((err) => {
      console.log("error updating the news posistion", err);
      res.status(500).json({
        message: "error changiong the news to archived",
        error: err,
      });
    });
});

module.exports = router;
