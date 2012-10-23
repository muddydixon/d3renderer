# d3renderer

This module enables us to create server-side d3 svg image.
It is very useful when your boss directs you to create visualization for IE5 users.

This module cteates both svg base64image and png image file.

## Requirement

This module depends on [phantomjs](http://phantomjs.org/).

## Install

```
$ git clone git@github.com:muddydixon/d3renderer.git
$ cd d3renderer
$ npm install && npm test
```

## Usage
```
require('d3renderer');
var svg = d3.select('body').append('svg')
  .attr('width', 400)
  .attr('height', 300); // you can use "body"
svg.selectAll('circle').data([1, 3, 5, 7]).enter()
  .append('circle')
  .attr('cx', function(d){  return 10 * d; })
  .attr('cy', function(d){  return 10 * d; })
  .attr('r', function(d){  return 10 * d; })
;
d3.render(function(err, base64img){
  // send to client base64image
});
```

## License
see LICENSE


