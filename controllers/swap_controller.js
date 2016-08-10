var express = require('express'); 
var router = express.Router(); 
var bodyParser = require('body-parser'); 
var methodOverride = require('method-override'); 
var models = require('../models'); 

// var app = express();
// app.use(require('serve-static')(__dirname + '/../../public'));
// app.use(require('cookie-parser')());
// app.use(require('body-parser').urlencoded({ extended: true }));
// app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());


router.get('/', function (req, res){
	models.Users.findAll().then(function (data) {
		res.render('index', {Users : data});
	});
});

router.post('/logIn', function(req, res){
	models.Users.findOne().then(function (data) {
		res.render('index', {Users : data}); 
	}); 
});


// router.post('/api/:userID?', function(req, res){

// 	var currentUser = req.params.userID;

// 	console.log(currentUser);

// 	res.json(currentUser);
// })


router.post('/api/newuser', function(req, res) {
	var currentUser = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: req.body.password,
		userImage: req.body.userImage
	};

	models.Users.create(currentUser).then(function() {
		res.json(currentUser);
	}); 
});

router.get('/userLanding', function (req, res){
	console.log(req.body + "this is req");
	console.log(res.body + "this is res");
	models.Users.findAll().then(function (data) {
		res.render('userlanding', {Users : data});
	});
});

// router.post('/burgers/create', function(req, res) {
// 	models.burgers.create({burger_name: req.body.name, devoured: 0}).then(function() {
// 		res.redirect('/burgers'); 
// 		}); 
// }); 

// router.put('/burgers/update/:id', function(req,res) {

// 	models.burgers.update( {'devoured' : req.body.devoured }, {where: {id:req.params.id}}).then(function(){
// 		res.redirect('/burgers');
// 	});
// });

// router.delete('/burgers/delete/:id', function (req, res) {

// 	models.burger.destroy({where: {id:req.params.id}}).then(function() {
// 		res.redirect('/burgers');
// 	});
// });


var passport = require('passport'); 
var Strategy = require('passport-local').Strategy; 

passport.use(new Strategy(function(username, password, cb) {
	users.users.findByUsername(username, function(err, user) {
		if(err) {return cb(err); }
		if(!user) {return cb(null, false); }
		if(user.password != password){ return cb(null, false); }
		return cb(null, user); 
	}); 
})); 

module.exports = router;