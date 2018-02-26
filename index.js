var express = require('express');
var app = express();
var route = express.Router();
var bodyParser = require('body-parser');

app.use(function (req, res, next) {
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

var fs = require('fs');
var S3FS = require('s3fs');
var s3fsImpl = new S3FS('enrichment-photo-bucket', {
  accessKeyId: 'AKIAJUVTJ4HZV5JLD5JQ',
  secretAccessKey: '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'
});


// var multiparty = require ('connect-multiparty'),
//     multipartyMiddleware = multiparty();

route.post('/upload', function (req, res) {
  {
    res.header('Access-Control-Allow-Origin', '*');
    console.log("received request", req.body);


    s3fsImpl.writeFile('filename', JSON.stringify(req.body)).then(function () {
      console.log('It\'s saved!');
    }, function (error) {
      console.log(error);
      throw error;
    });


  }
});


// route.get('/GetListOfFiles', function(req, res){
//
//   s3fsImpl.listContents('/', '/').then(function(data) {
//
//     for(let file of data){
//       console.log(file);
//       console.log(typeof(file));
//
//     }
//     console.log(data);
//     // Data.Contents contains details such as the `ETag` about the object. See [AWS SDK](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#headObject-property) for details.
//   }, function(error) {
//     console.log(error);
//   });
//
//
//
// })

route.get('/GetAllFiles', function (req, res) {

  var fileNameList = [];
  var fileArray = [];


  const defaults = {
    flags: 'r',
    encoding: null,
    fd: null,
    mode: 0o666,
    autoClose: true,
    highWaterMark: 64 * 1024
  };


//async function
  function fillArray() {

    s3fsImpl.readdirp('/').then(function (files) {

      for (var file of files) {
        fileNameList.push(file);
      }

      // console.log("filenamelist is:", fileNameList);

      fileNameList.forEach(function (name) {


        var file = s3fsImpl.createReadStream(name, defaults);


        var fileObj = '';
        file.on('data', function (chunk) {
          fileObj += chunk;

        })
          .on('end', function () {

            fileArray.push(fileObj);

          });


      })

      console.log(fileArray);

      console.log("call1");


      // Files contains a list of all of the files similar to [`fs.readdir(path, callback)`](http://nodejs.org/api/fs.html#fs_fs_readdir_path_callback) but with recursive contents
    }, function (error) {
      console.log(error);
      // Something went wrong
    });
  }


  fillArray();

  console.log("call2");

  setTimeout(function () {
    res.send(fileArray)
  }, 10000);

  // function sendToClient(){res.send(fileArray);
  //  console.log("callback is called")}
  //
  // fillArray(sendToClient);


});


// telling express to use routing
app.use("/", route);


// start your web server to listen to incoming request
app.listen(app.get('port'), () => {
  console.log("Web server running on .... port " + app.get('port'));
});
