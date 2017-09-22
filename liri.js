var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

var input = process.argv[2]

switch(input) {

	case 'my-tweets':
		tweets();
		break;

	case 'spotify-this-song':
		spotify();
		break;

	case 'movie-this':
		movies();
		break;

	case 'do-what-it-says':
		doIt();
		break;

	default:
		console.log('Not a recognized command.')
};

function tweets() {

};

function spotify() {
	console.log('hi')
};

function movies() {

};
 
function doIt() {
	fs.readFile('random.txt', 'utf8', function(error, data) {

		if (error) {
			return console.log(error);
		}

		var contents = data.split(',');
		var fn = contents[0];
		var dat = contents[1];

		if (fn === 'my-tweets') {
			tweets();
		}

		if (fn === 'spotify-this-song') {
			console.log(fn, dat);
			spotify();
		}

		if (fn === 'movie-this') {
			movies();
		}
	});
};



