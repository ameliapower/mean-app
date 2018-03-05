const express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path'),
	http = require('http'),
	app = express(),
	api = require('./server/routes/api'); //import our api with our db connection and http requests

//Set up parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); //no nested objects

//serve from dist folder
app.use(express.static(path.join(__dirname, 'dist')));


app.use('/api', api);

//send all non-api routes to dist:
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`listening on port: ${port}`));