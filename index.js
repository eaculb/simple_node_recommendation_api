const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://assessmentUser:mlab_gastrograph_0319@ds021166.mlab.com:21166/gastrograph_assessment',{ useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());

app.use('/', require('./routes/api'));

// Starts the counter for API requests
app.set('recRequests', 0)

app.use(function(err, req, res, next){
	res.status(422).send({error: err.message});
});

app.use(function (req, res, next) {
    res.status(404).send("Endpoint not found")
});

let port = 4000;
app.listen(port, function(){
	console.log('listening to port ' + port);
});