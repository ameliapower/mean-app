const configAPI = require('./api-config'),
	dbuser = configAPI.dbuser,
	dbpassword = configAPI.dbpassword,
	mlabUrl = configAPI.mlabUrl;

const express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'), // connects to mongoDB and provides object modeling
	article = require('../models/article'), //article can now be used for crud ops
	db = "mongodb://"+dbuser+":"+dbpassword+"@"+mlabUrl+"/posts-app-mean";


mongoose.Promise = global.Promise;
mongoose.connect(db, function(err){
	if(err){
		console.log('error connecting: ', err);
	}
});

// Get All data using mongoose .find() method:
router.get('/all', function(req, res) {
	article.find({})
		.exec(function(err, articles) {
			if(err){
				console.log('error getting articles: ', err);
			}else{
				console.log(articles);
				res.json(articles);
			}
		});
});

// Get Id using mongoose .findById() method:
router.get('/articles/:id', function(req, res) {
	console.log(req.params);
	article.findById(req.params.id)
		.exec(function(err, article){
			if(err){
				console.log(req.params.id)
				console.log(err, 'error occurred getting the id in api!!')
			}else{
				console.log(res)
				res.json(article)
			}
		});
});

//Create Post using save() method
router.post('/add-post', function(req, res){
	let newPost = new article({
		title: req.body.title,
		content: req.body.content
	})
	newPost.save(function(err, article){
		if(err){
			console.log(err,'error creating new post')
			return(err)
		}
		res.json(201, article);
	})
});

//Update using findById() and save() methods
router.post('/edit/:id', function(req, res) {
	article.findById(req.params.id)
		.exec(function(err, article) {
			if(err){
				console.log(err, 'error occurred updating articles')
			}else{
				article.title = req.body.title;
				article.content = req.body.content;
				article.save();
				res.json(article);
			}
		});
});

//Delete data with mongoose method findByIdAndRemove()
router.get('/delete/:id', function(req, res){
	article.findByIdAndRemove(req.params.id)
		.exec(function(err, article){
			if(err){
				console.log(err, 'error occurred deleting post')
			}else{
				res.json(article);
			}
		})
})



module.exports = router;

