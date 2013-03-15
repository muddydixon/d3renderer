require('../index.js');
var should = require('should')
  , fs = require('fs')
;

var width  = 400 // width of image
  , height = 400 // height of image
;

var rings     = []
  , ringNum   = 100 // 
  , ringSize  = 40  //
;
for(var i = 0; i < ringNum; i++){
    rings.push({
      x: 0|Math.random() * width
      , y: 0|Math.random() * height
      , r: 0|Math.random() * ringSize
      , opacity: Math.random()
    });
}
var colors = d3.scale.category10();


describe('d3rendere', function(){
  it('should have default canvas', function(){
    var body = d3.select('body');
    body[0][0]['_tagName'].should.be.equal('body');
  });
  it('should create svg', function(){
    var svg = d3.select('body').append('svg');
    svg[0][0]['_tagName'].should.be.equal('svg');
  });
  describe('create image', function(){
    var svg = null;
    before(function(){
      var svg = d3.select('svg').attr('width', width).attr('height', 400).style('background', '#FFF');
      svg.selectAll('circle').data(rings).enter()
        .append('circle')
        .attr('cx', function(d){ return d.x; })
        .attr('cy', function(d){ return d.y; })
        .attr('r', function(d){ return d.r; })
        .attr('fill', function(d, idx){ return colors(idx); })
        .attr('opacity', function(d){ return d.opacity; })
      ;
    });
    after(function(){
      fs.unlinkSync('./sample.png');
    });
    it('should create svg base64', function(next){
      d3.render(function(err, base64img){
        should.not.exist(err);
        base64img.length.should.be.ok;
        next();
      });
    });
    it('should create svg to image', function(next){
      d3.render("sample.png", function(err){
        should.not.exist(err);
        fs.existsSync('./sample.png').should.be.ok;
        next();
      });
    });
  });
});

