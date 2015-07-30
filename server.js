var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var path       = require("path");
var request    = require("request");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//setup static directories
app.use("/vendor", express.static(__dirname + '/vendor'));
app.use("/static", express.static(__dirname + '/static'));

var port = process.env.PORT || 8080;        // set our port
var router = express.Router();              // get an instance of the express Router

router.get('/', function(req, res) {
    res.sendfile(path.join(__dirname+'/index.html'));
});

var championRequest = express.Router();

championRequest.route('/championlist')
.get(function(req, res) {
    var apiKey = process.env.RIOT_API_KEY;
    var riotUrl = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=" + apiKey;
    var riotVersionsUrl = "http://ddragon.leagueoflegends.com/api/versions.json";

    request(riotUrl, function(error, response, body) {
        if(error) {
            res.send(error);
        }

        var champs = JSON.parse(body).data;

        request(riotVersionsUrl, function(error, response, body) {
            if(error) {
                res.send(error);
            }

            var latestVersion = JSON.parse(body)[0];

            res.send({version: latestVersion, champs: champs});
        });

    });
});

// REGISTER OUR ROUTES -------------------------------
app.use('', router);
app.use('/', championRequest);

app.listen(port);
console.log('Magic happens on port ' + port);
