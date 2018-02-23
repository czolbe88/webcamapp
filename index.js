var express = require('express');
var app = express();
var route = express.Router();
app.set('port', process.env.PORT || 8888);

var fs = require ('fs');
var S3FS = require('s3fs');
var s3fsImpl = new S3FS('enrichment-photo-bucket',{

} );


// var multiparty = require ('connect-multiparty'),
//     multipartyMiddleware = multiparty();





// registering the Member CRUD API library created

// route.get('/test', WriteFile );
route.post('/test', function (req, resp) {
  {
    console.log("received request");

    var file = req.files.file;
    console.log(file);
    s3fsImpl.writeFile(file, 'MY SELFIE').then(function () {
      console.log('It\'s saved!');
    }, function (reason) {
      throw reason;
    });
  }
} );

// telling express to use routing
app.use ("/", route);

// start your web server to listen to incoming request
app.listen(app.get('port'), () => {
  console.log("Web server running on .... port " + app.get('port'));
});
