const express = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb')
const session = require('express-session');
var router = express.Router();
var db = require('../db');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);



// singup data processing
router.post('/register', function(req, res) {
  console.log(req.body);
    var date = new Date();
    var hash = bcrypt.hashSync(req.body.password, salt);
    db.get().collection('utilisateurs').insertOne( {
      name : req.body.name,
      username : req.body.username,
      email : req.body.email,
      password : hash,
      date : date
   }, function(err, result) {
    console.log("Inserted a new user in utilisateurs collection.", req.body);
    res.render('user', {
      session:{
        name : req.body.name,
        username : req.body.username,
        email : req.body.email,
        password : hash,
        date : date
        },
      titre : 'Welcome'}) // render using pug
});
});

router.post('/checklogin', function(req, res) {
  console.log(req.body);
  db.get().collection('utilisateurs').findOne({'email' :req.body.email},function(error,data) {
    // console.log(data);
    if (!error & bcrypt.compareSync(req.body.password, data.password)) {
      req.session.username = data.username;
      req.session.connected = true;
      res.redirect('../');
    }else {
      res.redirect('../login')
      }
  });
});


router.get('/form', function(req, res) {
  // console.log("Cookies: ", req.cookies)
  // console.log(req.session);
  res.render('formarticles', {titre:'Ajouter un Article' , session : req.session}) // render  index using pug
})



router.get('/logout', function(req, res) {
  req.session.destroy();
  // req.session = null;
  // req.session.username = 'blog';
    res.render('logout',
    {
      message: 'See you soon ;-)',
      session : req.session
    });
  });


router.post('/article',function(req,res) {
  console.log(req.body);
    var date = new Date();
    db.get().collection('articles').insertOne( {
      titre : req.body.Titre,
      auteur : req.body.Auteur,
      contenue : req.body.contenue,
      image : req.body.Image,
      date : date
   }, function(err, result) {
    console.log("Inserted a new articles in articles collection.");
    res.render('article', {
      post:{
        titre : req.body.Titre,
        auteur : req.body.Auteur,
        contenue : req.body.contenue,
        image : req.body.Image,
        date : date
      },
      session : req.session
    }); // render using pug
  });
});

module.exports = router;
