var request = require("request");
var cheerio = require("cheerio");
var fs =require('fs');


/*
function GetLink(lien,etoile){   
request({
  uri: lien,
}, function(error,response, body) {    
  var $ = cheerio.load(body);
  $(".poi-card-link").each(function() {
    var link = $(this);
    var href = link.attr("href");
      console.log(href);
    var url = "https://restaurant.michelin.fr"+href; 
    GetInfo(url,etoile);
  });  
}); 
};

function GetInfo(lien,etoile){   
request({
  uri: lien,
}, function(error,response, body) {    
  var $ = cheerio.load(body);
  $(".panel-panel ").each(function() {
    var link = $(this);
	var titre=$(this).find(".poi_intro-display-title").text().trim();
      console.log(lien);
    console.log(titre);
  
  });  
}); 
};
*/

function MyRequest(lien,etoile){   
request({
  uri: lien,
}, function(error,response, body) {    
  var $ = cheerio.load(body);
  $(".poi-card-link").each(function() {
      
    var link = $(this);
	var titre=$(this).find(".poi_card-display-title").text().trim();
    var href = link.attr("href");
    var myObj = {"name":titre,"etoile":etoile,"url":"https://restaurant.michelin.fr"+href};
    var myJSON = JSON.stringify(myObj);
      fs.appendFile("michelin.json", myJSON, function(err) {
        if(err) {
            return console.log(err);
        }
    });
  
  });  
}); 
};



/*parcourir */

function Read (){
fs.open('michelin.json', 'r', (err, fd) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.error('michelin does not exist');
      return;
    }

    throw err;
  }
    
var contents = fs.readFileSync('michelin.json', 'utf8');
console.log(contents[10]);
});
}

function GetResto (lien, etoile,page)
{
    var i=1 ; 
    while (i<page)
        {
        var nv_lien =lien + "/page-"+i;
        console.log(nv_lien);
        MyRequest(nv_lien,etoile);
        i=i+1
        }  
}

function Resto_to_Json()
{
    
    GetResto("https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin",1,15);
    GetResto("https://restaurant.michelin.fr/restaurants/france/restaurants-2-etoile-michelin",2,15);
    GetResto("https://restaurant.michelin.fr/restaurants/france/restaurants-3-etoile-michelin",3,3);
};


Resto_to_Json();