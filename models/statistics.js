const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Statistic entry model
 * Includes number of GET requests and number of titles in the system
 */
const StatisticSchema = new Schema({
	numRequests:{
		type: Number
	},
	numTitles:{
		type: Number
	}
});

const Statistic = mongoose.model('statistic', StatisticSchema);

module.exports = Statistic;