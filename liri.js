
require("dotenv").config();

var keys = require("./keys.js");
var twitter = require("twitter");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var lineaComando = process.argv;

var client = new twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

var input2 = process.argv[2];
var input3 = process.argv[3];

var getArtistNames = function (artist) {
  return artist.name;
};


switch (input2) {
  case "my-tweets":
    var params = { screen_name: 'nodejs', count: '20' };
    client.get('statuses/user_timeline', params, function (error, tweets) {
      if (!error) {
        for (var i = 0; i < 20; i++) {
          console.log(tweets[i].created_at);
          console.log(tweets[i].text);
        }
      }
    });
    break;

  case "movie-this":
    if (movie === undefined || movie === null) {
      movie = "Mr Body";
    }

    else {
      request("http://www.omdbapi.com/?t=" + trdarg + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

          console.log("\n------------------------------------------------------------\n\n");
          console.log("Title of the movie: " + JSON.parse(body).Title);
          console.log("Year: " + JSON.parse(body).Year);
          console.log("imbd Rating: " + JSON.parse(body).imdbRating);
          console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
          console.log("Country: " + JSON.parse(body).Country);
          console.log("Language: " + JSON.parse(body).Language);
          console.log("Plot: " + JSON.parse(body).Plot);
          console.log("Actors: " + JSON.parse(body).Actors);
          console.log("\n------------------------------------------------------------\n\n");
        }
      })};
      break;

  case "spotify-this-song":
    if (input3 === undefined || input3 === null) {
      input3 = "What's my age again";

      spotify.search({ type: "track", query: input3 }, function (err, data) {
        if (err) {
          console.log("Error occurred: " + err);
          return;
        }

        var songs = data.tracks.items;

        for (var i = 0; i < songs.length; i++) {
          console.log(i);
          console.log("artist(s): " + songs[i].artists.map(getArtistNames));
          console.log("song name: " + songs[i].name);
          console.log("preview song: " + songs[i].preview_url);
          console.log("album: " + songs[i].album.name);
          console.log("-----------------------------------");
        }
      });
      break;
    }
  }