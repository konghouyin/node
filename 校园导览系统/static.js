var express = require('express');
var estatic = require('express-static');

var server = express();

server.use(estatic("./www"))
server.listen(8080);