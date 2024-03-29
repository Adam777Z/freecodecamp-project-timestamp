// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));  // some legacy browsers choke on 204

// https://expressjs.com/en/starter/static-files.html
app.use('/public', express.static(process.cwd() + '/public'));

// https://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
	return res.json({ greeting: 'hello API' });
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
	console.log('Your app is listening on port ' + listener.address().port);
});

app.get('/api/:date_string?', function (req, res) {
	let date_input = req.params.date_string;
	let date = new Date();

	if (date_input !== undefined) {
		if (isNumeric(date_input)) {
			date_input = parseInt(date_input);
		}

		date = new Date(date_input);
	}

	utc = date.toUTCString();

	if (utc == 'Invalid Date') {
		data = { error: utc };
	} else {
		data = { unix: date.getTime(), utc: utc };
	}

	return res.json(data);
});

function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}