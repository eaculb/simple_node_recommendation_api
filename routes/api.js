const express = require('express');
const router = express.Router();
const Recommendation = require('../models/recommendations');
const Statistic = require('../models/statistics');

/**
 * GET '/recommendation'
 * returns a random recommendation entry
 * supports querying by genre
 */
router.get('/recommendation', function(req, res){
	let queriedGenre = req.query.genre;
	if (queriedGenre) {
		query = {genre: queriedGenre};
	} else {
		query = {};
	}
	Recommendation.countDocuments(query, function(err, count){
		if (count === 0){
			res.send({error: "No results found for genre " + queriedGenre});
		} else {
			let skipNum = Math.floor(Math.random() * count);
			Recommendation.findOne(query).skip(skipNum).exec(function(err, result){
			res.send(result);
			});
		};
	});
});

/**
 * POST '/recommendation'
 * Stores a new recommendation
 * Requires a title, genre, and relase year
 */
router.post('/recommendation', function(req, res, next){
	let rec = new Recommendation(req.body);
	rec.save().then(function(rec){
		res.send(rec);
	}).catch(next);
});

/**
 * GET '/statistics'
 * gets the total number of recommendations returned and the total number 
 * of movie titles within the system
 */
router.get('/statistics', function(req, res){
	Recommendation.countDocuments({}, function(err,count){
		var numQueries = req.app.get('recRequests');
		numQueries += 1;
		req.app.set('recRequests', numQueries);
		let stat = new Statistic({
			numRequests : numQueries,
			numTitles : count
		});
		res.send(stat);
	});
});

module.exports = router;