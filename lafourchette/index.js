module.exports = function (args) { /* ... */ }

var request = require("request");
var cheerio = require("cheerio");
var fs =require('fs');


//var cities [];

function MyRequest(lien){
    console.log("0");
request({
  uri: lien,
}, function(error,response, body) { 
  var $ = cheerio.load(body);
  $(".restaurantResult").each(function() {
    console.log("1");
    var link = $(this);
	var titre=$(this).find(".restaurantResult-name").text().trim();
      console.log("2");
    var href = link.attr("href");
  });  
}); 
};

//MyRequest('https://m.lafourchette.com/fr_FR/search?offer=1&sort=POPULARITY&r=50&ll=48.856614,2.3522219000000177&searchText=Paris,%20France&googlePlaceId=ChIJD7fiBh9u5kcRYJSMaMOCCwQ');
console.log("La fourchette module ici");

function SearchRestaurant(name) {
    var lien = "https://m.lafourchette.com/fr_FR/search?searchText=" + name;
    console.log(lien);
    request({
  uri: lien,
}, function(error,response, html) { 
        console.log("1");
        var $ = cheerio.load(html);
         $("restaurantResult-row").each(function() {
            var titre=$(this).find(".restaurantResult-name").text();
            console.log(titre);
            var myObj = {"name":titre};
            var myJSON = JSON.stringify(myObj);
            fs.appendFile("lafourchette.json", myJSON, function(err) {
            if(err) {
            return console.log(err);
        }
    });
  
  });  
}); 
};


SearchRestaurant("Le Chiberta");

var restaurants = [];
var obj;
fs.readFile('movies.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
});

