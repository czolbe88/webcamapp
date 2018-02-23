var express = require('express');
var app = express();
var route = express.Router();
app.set('port', process.env.PORT || 8888);

var fs = require ('fs');
var S3FS = require('s3fs');
var s3fsImpl = new S3FS('enrichment-photo-bucket',{
  accessKeyId: 'AKIAJUVTJ4HZV5JLD5JQ',
  secretAccessKey: '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'
} );


// var multiparty = require ('connect-multiparty'),
//     multipartyMiddleware = multiparty();


function WriteFile() {
  {
    s3fsImpl.writeFile('message.txt', 'Hello Node').then(function () {
      console.log('It\'s saved!');
    }, function (reason) {
      throw reason;
    });
  }
}


// registering the Member CRUD API library created

route.get('/test', WriteFile );
route.post('/test', WriteFile );

// telling express to use routing
app.use ("/", route);

// start your web server to listen to incoming request
app.listen(app.get('port'), () => {
  console.log("Web server running on .... port " + app.get('port'));
});
