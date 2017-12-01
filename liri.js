// VARIABLES
//==============================================================================

// inputs detection
var userCommand = process.argv[2];
var searchItem = process.argv[3];

//require fs and twitter,spotify and request npm
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");

//require exports
var keys = require("./keys.js");

// twitter and spotify keys from keys.js file
var client = new Twitter(keys.twitterKeys);
var spotify = new Spotify(keys.spotifyKeys);


//FUNCTIONS
//==============================================================================

//TWITTER_______________________________________________________________________
//operates Twitter NPM
function tweet() {
    client.get('statuses/user_timeline', { screen_name: 'mobradleyy' }, function(error, tweets, response) {
        if (error) {
            console.log(error);
        }
        //Loops through thw last 20 tweets and console.log them
        for (var i = 0; i < Math.min(tweets.length, 20); i++) {
            console.log("Day Created: " + tweets[i].created_at);
            console.log("Tweet: " + tweets[i].text);
            console.log("--------------------------------------------");
        } // end of loop
    }); // end of client get
} //end of npmTwitter function


//SPOTIFY_______________________________________________________________________
//operates Spotify npm without song input
function noSong() {
    spotify.search({ type: 'track', query: "The Sign" }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        //console.log JSON to help find necessary data
        //console.log(JSON.stringify(data, null, 4));

        console.log("Artist: " + data.tracks.items[7].album.artists[0].name);
        console.log("Song: " + data.tracks.items[7].name);
        console.log("Preview Link: " + data.tracks.items[7].album.artists[0].external_urls.spotify);
        console.log("Album Name: " + data.tracks.items[7].album.name);
    }); //end of spotify npm
} //end of spotify without song function


//operates Spotify npm with song input
function song() {
    spotify.search({ type: 'track', query: searchItem }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        //console.log JSON to help find necessary data
        // console.log(JSON.stringify(data, null, 4));

        //console log results
        console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Preview Link: " + data.tracks.items[0].album.artists[0].external_urls.spotify);
        console.log("Album Name: " + data.tracks.items[0].album.name);
    }); //end of spotify npm
} //end of spotify function with song


//OMDB__________________________________________________________________________
function movie() {
    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            //console.log JSON to help find necessary data
            // console.log(JSON.parse(body));

            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country where the movie was produced: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    }); //end of request
} //end of movie function


//DO  WHAT I SAY________________________________________________________________
function randomFile() {
    //read random.txt file
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        //brakes object on ,
        data = data.split(",");
        //assigns second object to searchItem
        searchItem = data[1];
        song();
    });
}


//CONDITIONS
//==============================================================================
// TWITTER
if (userCommand === "my-tweets") {
    tweet();
}

// SPOTIFY
if (userCommand === "spotify-this-song" && searchItem === undefined) {
    noSong();
}
else if (userCommand === "spotify-this-song") {
    song();
}

// OMDB
if (userCommand === "movie-this" && searchItem === undefined) {
    //Mr. Nobody is defined as movie on URL
    var queryUrl = "http://www.omdbapi.com/?t=" + "Mr. Nobody" + keys.omdbKey;
    movie();
}
else if (userCommand === "movie-this") {
    //searchItem is defining name of the movie on URL
    var queryUrl = "http://www.omdbapi.com/?t=" + searchItem + keys.omdbKey;
    movie();
}

// DO WHAT IT SAYS
if (userCommand === "do-what-it-says") {
    randomFile();
}
