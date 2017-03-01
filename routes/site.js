const express = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb')
const session = require('express-session');
var router = express.Router();
var db = require('../db');

// Home + post data display
router.get('/', function(req, res) {
  db.get().collection('articles').find({}).sort({ date : -1 }).limit(10).toArray(function(error, data) {
    // console.log(data);
    posts = data;
    var articles = data.forEach( function(element) {
      console.log(element);
    });
    res.render('home', {posts: data, session : req.session}) // render  index using pug
  })
});


// page article
router.get('/article/:id', function(req, res) {
  var id = new mongo.ObjectID(req.params.id);
  console.log(id);
  // console.log(req.params);
  db.get().collection('articles').findOne({'_id' :id },function(error,data) {
    console.log(data);
    data.date.getMonth()
    res.render('article', {post: data, session : req.session}) // render  index using pug
  });
});

router.get('/page/:page', function(req, res) {
  page = (req.params.page - 1)

  db.get().collection('articles').find({}).sort({ date : -1 }).skip(10*page).toArray(function(error, data) {
    console.log(data);
    if (data.length ==0) {
      res.render('logout', {message : 'No More Post', session : req.session});
    } else {
      res.render('home', {posts: data, session : req.session});
    }

    // var articles = data.forEach( function(element) {
    //   console.log(element);
    // });
  })
});


// login / singup
router.get('/login', function(req, res) {
  
  // console.log("Cookies: ", req.cookies)
  // console.log(req.session);
  res.render('login', {titre:'Login' , session : req.session}) // render  index using pug
})

router.get('/signup', function(req, res) {
  // console.log("Cookies: ", req.cookies)
  // console.log(req.session);
  res.render('signup', {titre:'Sign-up' , session : req.session}) // render  index using pug
})




module.exports = router;
