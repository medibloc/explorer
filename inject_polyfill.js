var fs = require('fs');

var token = "<div id=\"root\"></div>";
var injectScript = '<script type="text/javascript" src="/static/js/polyfill.js"></script>'
var indexHtml = fs.readFileSync('./server/build/index.html', 'utf8');
var newIndexHtml = indexHtml.split(token)[0] + token + injectScript + indexHtml.split(token)[1];
fs.writeFileSync('./server/build/index.html', newIndexHtml);
