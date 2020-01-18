const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10;

const knex = require('knex')({
  client: 'mysql',
  connection: {
      host: '127.0.0.1',
      database: 'web_computing',
      user: 'root',
      password: 'root'
  }
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HomePage' });
});

router.get('/api', function(req, res, next) {
  res.render('index', { title: 'Lots of routes available' });
});

router.get('/offences', function(req, res, next){
  knex.from('offence_columns').select('*')
  .then((rows) => {
    let sortedRows = rows.map((val) =>{
      return val.pretty
    })
    res.json({'offences' : sortedRows})
  })
  .catch((err) => {
    console.log(err)
    res.json({'Error' : true, 'Message' : 'Error in MySQL query.'})
  })
})

router.get('/areas', function(req, res){
  knex.from('areas').select('area')
  .then((rows) => {
    let sortedRows = rows.map((val) =>{
      return val.area
    })
    res.json({'areas' : sortedRows})
  })
  .catch((err) => {
    console.log(err)
    res.json({'Error' : true, 'Message' : 'Error in MySQL query.'})
  })
})

router.get('/ages', function(req, res){
    res.json({
      "ages": [
        "Adult",
        "Juvenile"
      ]
    })
  .catch((err) => {
    console.log(err)
    res.json({ 'Error': true, 'Message': 'Error in request'})
  })
})

router.get('/genders', function(req, res){
  res.json({
    "genders": [
      "Female",
      "Male",
      "Not Stated"
    ]
  })
  .catch((err) => {
    console.log(err)
    res.json({'Error' : true, 'Message' : 'Error in request'})
  })
})

router.get('/years', function(req, res){
  res.json({
    "years": [
      2001,
      2002,
      2003,
      2004,
      2005,
      2006,
      2007,
      2008,
      2009,
      2010,
      2011,
      2012,
      2013,
      2014,
      2015,
      2016,
      2017,
      2018,
      2019
    ]
  })
.catch((err) => {
  console.log(err)
  res.json({'Error' : true, 'Message' : 'Error in MySQL query.'})
})
})

router.post('/register', function(req, res){
  let username = req.body.email;
  let password = req.body.password;

  var hash = bcrypt.hashSync(password, saltRounds);
    knex('users').insert({
      'email': username,
      'password': hash,
    })
    .then (() =>{
      res.status(201)
      res.json({
        "message": "yay! you've successfully registered your user account :)"
      })
  })
})

router.post('/login', function(req, res){
  let username = req.body.email
  let password = req.body.password
  knex.from('users').select('password').where("email", username)
  .then((rows) =>{
    rows = rows.map((row) => row.password);

    storedPassword = rows[0];
    if(bcrypt.compare(password, storedPassword)) {
      res.status(200)
      var token = jwt.sign({
        'user' : {
          'id' : 'nothing',
          'email': username,
        }
      }, "secret",{expiresIn: '24h'})
      res.json({
        "access_token": token,
        "token_type": "Bearer",
        "expires_in": 86400
      })
    }
    else{
      res.status(401)
      res.json({
        "message": "invalid login - bad password"
      })
    }
  });
  
    
})

router.get('/search', function(req, res){
  let offence = req.query.offence
  let area = req.query.area
  let age = req.query.age
  let gender = req.query.gender
  let year = req.query.year

  if(!offence){
    res.status(400)
    res.json({
      "message": "oops! it looks like you're missing the offence query parm"
    })
  }

  knex.from('offences')
  .select('offences.area as LGA').sum(offence + ' as total').select('lat', 'lng')
  .innerJoin('areas', 'offences.area', 'areas.area')
  .modify(function(database){
    if(area) database.where('offences.area', area)
    if(age) database.where('offences.age', age)
    if(gender) database.where('offences.gender', gender)
    if(year) database.where('offences.year', year)
  })
  .groupBy('offences.area', 'lat', 'lng')
  .then((rows) => {
    res.json({
      'result': rows,
    })
  })
  
  .catch((err) => {
    console.log(err)
    res.json({'Error' : true, 'Message' : 'Error in MySQL query.'})
  })
})

module.exports = router;
