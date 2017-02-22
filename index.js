const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb')
var app = express();

var URL = 'mongodb://localhost:27017/blog';
var connectDB;
var posts;

// Init pug
app.set('view engine', 'pug')
app.set('views',__dirname + '/views');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use("/img", express.static(__dirname + '/img'));
app.use("/vendor", express.static(__dirname + '/vendor'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/css", express.static(__dirname + '/css'));






app.use(session({
    secret:'123456789SECRET',
    saveUninitialized : false,
    resave: false,
}));

app.get('/', function(req, res) {
  connectDB.collection('articles').find({}).limit(10).toArray(function(error, data) {
    // console.log(data);
    posts = data;
    var articles = data.forEach( function(element) {
      console.log(element);
    });
    res.render('home', {posts: data}) // render  index using pug
  })
});

app.get('/index', function(req, res) {
  connectDB.collection('articles').find({}).limit(10).toArray(function(error, data) {
    // console.log(data);
    var articles = data.forEach( function(element) {
      console.log(element);
    });
    res.render('home', {posts: data}) // render  index using pug
  })
})

app.get('/form', function(req, res) {
  // console.log("Cookies: ", req.cookies)
  // console.log(req.session);
  res.render('formarticles', {titre:'Ajouter un Article' , texte : 'youpi'}) // render  index using pug
})

app.get('/login', function(req, res) {
  // console.log("Cookies: ", req.cookies)
  // console.log(req.session);
  res.render('login', {titre:'Login' , texte : 'youpi'}) // render  index using pug
})

app.get('/signup', function(req, res) {
  // console.log("Cookies: ", req.cookies)
  // console.log(req.session);
  res.render('login', {titre:'Sign-up' , texte : 'youpi'}) // render  index using pug
})

app.get('/article/:id', function(req, res) {
  var id = new mongo.ObjectID(req.params.id);
  console.log(id);
  // console.log(req.params);
  connectDB.collection('articles').findOne({'_id' :id },function(error,data) {
    console.log(data);
    res.render('article', {post: data}) // render  index using pug
  });
});



app.post('/article',function(req,res) {
  console.log(req.body);
    var date = new Date();
    connectDB.collection('articles').insertOne( {
      titre : req.body.Titre,
      auteur : req.body.Auteur,
      contenue : req.body.contenue,
      image : req.body.Image,
      date : date
   }, function(err, result) {
    console.log("Inserted a new articles in articles collection.");
    res.render('article', {post:{
      titre : req.body.Titre,
      auteur : req.body.Auteur,
      contenue : req.body.contenue,
      image : req.body.Image,
      date : date
   }}) // render using pug
  });


  // get data / check if data ok / sinon res.redirect('/form');
  // insert in db // if insert ok /else redirect



});




MongoClient.connect(URL, function(err, db) {
  if (err) {
    return;
  }
  connectDB = db;
  // console.log(connectDB);
  var server = app.listen(8888,function(){
    console.log('serveur start port 8888');
  });
});
