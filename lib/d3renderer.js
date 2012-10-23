var d3 = require('d3');

d3.render = function(filename, callback){
  if(typeof filename === 'function'){
    callback = filename;
    filename = null;
  }
  var svg = d3.select('svg');
  var width = svg.attr('width') || 300
  , height = svg.attr('height') || 200;
  var phtm = require('child_process')
    .spawn('phantomjs', [__dirname + '/exec.js', filename, global.document.innerHTML, width, height]);
  var buf = '',  err = '';
  phtm.stdout.setEncoding('ascii');
  phtm.stdout.on('data', function(data){
    buf += data;
  });
  phtm.stdout.on('data', function(data){
    err += data;
  });
  phtm.on('exit', function(code){
    if(code !== 0)
      return callback(err);
    return callback(null, buf);
  });
};

module.exports = d3;