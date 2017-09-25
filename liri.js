var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require('./keys.js');
var client = new Twitter(keys.twitterKeys);
var spotify = new Spotify(keys.spotifyKeys);
var fs = require('fs');

var args = process.argv;
var input = process.argv[2];

switch(input) {

	case 'my-tweets':
		tweetsFn();
		break;

	case 'spotify-this-song':
		spotifyFn();
		break;

	case 'movie-this':
		moviesFn();
		break;

	case 'do-what-it-says':
		doIt();
		break;

	default:
		console.log('Not a recognized command.')
};

function tweetsFn() {
	client.get('statuses/user_timeline', function(error, tweets, response) {
		
		if (error) {
			console.log(error)
		};
		
		for (var i = 0; i < tweets.length; i++){
			var dateTime = tweets[i].created_at.split('+')[0]
			console.log("On", dateTime, "I tweeted:");
			console.log(tweets[i].text);
			console.log('============================================')
		};
	});
};

function spotifyFn() {

	var song = '';

	if (process.argv[3] === undefined) {
		song = "The Sign"
	} else {	
		for (var i = 3; i < args.length; i++) {
			song += args[i] + ' '
		}
	};

	spotify.search({type: 'track', query: song, limit: 1}, function(error, data) {
  		
  		if (error) {
    		console.log(error);
  		}

		console.log('Artists\n', data.tracks.items[0].artists[0].name); 
		console.log('Name\n', data.tracks.items[0].name); 
		console.log('Spotify url\n', data.tracks.items[0].external_urls.spotify); 
		console.log('Album\n', data.tracks.items[0].album.name);
	});
};

function moviesFn() {

	var movie = '';

	if (process.argv[3] === undefined) {
		movie = "mr.+nobody"
	} else  if (args.length === 4){
		movie = process.argv[3]
	} else {	
		for (var i = 3; i < args.length; i++) {
			movie += args[i] + '+'
		}
	};

	console.log(movie)

  //  * Title of the movie.
  //  * Year the movie came out.
  //  * IMDB Rating of the movie.
  //  * Rotten Tomatoes Rating of the movie.
  //  * Country where the movie was produced.
  //  * Language of the movie.
  //  * Plot of the movie.
  //  * Actors in the movie.

	request('http://www.omdbapi.com/?apikey=40e9cece&t=' + movie, function(error, response, body) {
		if (error) {
			console.log(error)
		} else {
			var output = JSON.parse(body)
			//console.log(output)
			// title
			console.log('Title:\n', output.Title)
			// release year
			var releaseYear = output.Released.split(' ')
			console.log('Release Year:\n', releaseYear[2]) 
			// ratings
			if (output.Ratings.length === 1) {
				console.log('IMBD rating:\n', output.Ratings[0].Value)
			} else {
				console.log('IMBD rating:\n', output.Ratings[0].Value)
				console.log('Rotten Tomatoes:\n', output.Ratings[1].Value)
			}
			// country where produced
			console.log('Country of production:\n', output.Country)
			// language of movie
			console.log('Language:\n', output.Language)
			// plot 
			console.log('Plot:\n', output.Plot)
			// actors
			console.log('Actors:\n', output.Actors)
		}
	});
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
			tweetsFn();
		}

		if (fn === 'spotify-this-song') {
			console.log(fn, dat);
			spotifyFn();
		}

		if (fn === 'movie-this') {
			moviesFn();
		}
	});
};
