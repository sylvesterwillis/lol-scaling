// server.js
// where your node app starts

// init project
var fs = require('fs'),
    express = require('express'),
    Mustache = require('mustache'),
    app = express(),
    jsxtransform = require('express-jsxtransform'),
    Request = require("request");

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(jsxtransform());
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile('views/index.html', {root: __dirname });
});

app.get("/championList", function(req, res){
  var apiKey = process.env.RIOT_API_KEY;
  var riotUrl = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=" + apiKey;
  var riotVersionsUrl = "https://ddragon.leagueoflegends.com/api/versions.json";

  Request(riotUrl, function(error, response, body) {
      if(error) {
          res.send(error);
      }

      var parsedJSON = JSON.parse(body);

      var champs = parsedJSON.data;
      var latestVersion = parsedJSON.version;
      res.send({version: latestVersion, champs: champs});
  });
});

// listen for requests :)
listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});