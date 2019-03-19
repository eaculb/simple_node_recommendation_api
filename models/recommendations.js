const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Recommendation payload model
 * Requires name, genre, and year created
 */
const RecommendationSchema = new Schema({
	name:{
		type: String,
		required: [true, 'Name is required']
	},
	genre:{
		type: String,
		required: [true, 'Genre is required']
	},
	yearCreated:{
		type: String,
		required: [true, 'Year Created is required']
	}
});

const Recommendation = mongoose.model('recommendation', RecommendationSchema);

module.exports = Recommendation;