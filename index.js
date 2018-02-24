var express = require('express');
var app = express();
var route = express.Router();
var bodyParser = require('body-parser');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type, Accept");
  next();
});



app.use(bodyParser.urlencoded({
  limit: '5mb',
  parameterLimit: 100000,
  extended: false
}));

app.use(bodyParser.json({
  limit: '5mb'
}));


app.set('port', process.env.PORT || 8888);

var fs = require ('fs');
var S3FS = require('s3fs');
var s3fsImpl = new S3FS('enrichment-photo-bucket',{
  accessKeyId: ' UR OWN API HERE',
  secretAccessKey: ' UR OWN API HERE'
} );



// var multiparty = require ('connect-multiparty'),
//     multipartyMiddleware = multiparty();

route.post('/test', function (req, res) {
  {
    res.header('Access-Control-Allow-Origin','*');
    console.log("received request", req.body);


    s3fsImpl.writeFile('filename', JSON.stringify(req.body)).then(function () {
      console.log('It\'s saved!');
    }, function (reason) {
      console.log(reason);
      throw reason;
    });


  }
} );



// registering the Member CRUD API library created

// route.get('/test', WriteFile );
// route.post('/test', function (req, res) {
//   {
//     console.log("received request");
//
//     var file = req.files.file;
//     console.log(file);
//     s3fsImpl.writeFile(file, 'MY SELFIE').then(function () {
//       console.log('It\'s saved!');
//     }, function (reason) {
//       console.log(reason);
//       throw reason;
//     });
//   }
// } );

// telling express to use routing
app.use ("/", route);



// start your web server to listen to incoming request
app.listen(app.get('port'), () => {
  console.log("Web server running on .... port " + app.get('port'));
});
