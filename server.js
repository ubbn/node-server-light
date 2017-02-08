var http = require('http');
var formidable = require('formidable');
var util = require('util');
var uuid = require('node-uuid');

var server = http.createServer(function (request, response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (request.method.toLocaleLowerCase() == 'post') {
    processForm(request, response);
    return;
  }

  if (request.method.toLocaleLowerCase() == 'get') {
    var data = {
      data : {
        languages: [
          'English',
          'German',
          'Spanish',
          'Swedish'
        ]
      }};
    let responseData = JSON.stringify(data);
    response.end(responseData);
    console.log("get: ", responseData);
    return;
  }

  response.end();
});

function processForm(request, response) {
  var form = new formidable.IncomingForm();
  
  // parses incoming form
  form.parse(request, function (error, fields) {
    fields.id = uuid.v4();

    // no validation is done, writing successful message
    response.writeHead(200, {
      'content-type': 'text/plain'
    });

    response.end(JSON.stringify({
      fields: fields
    }));

    console.log('posted fields:\n');
    console.log(util.inspect({
      fields: fields
    }));
  });
}

var port = 4000;
server.listen(port);
console.log("listening on port: " + port);