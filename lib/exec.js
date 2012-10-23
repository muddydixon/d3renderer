var args = phantom.args;
var page = require('webpage').create();

var filename = args[0];

page.clipRect = { width: args[2], height: args[3] };
page.content = args[1];
if(filename === "null"){
  var base64image = page.renderBase64('png');
  var fs = require('fs');
  fs.write('/dev/stdout', base64image, 'w');
  phantom.exit(0);
}else{
  page.render(filename);
  phantom.exit(0);
}
