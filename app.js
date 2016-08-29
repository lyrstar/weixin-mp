'use strict';
/**
 * Created by sunpengfei on 16/8/25.
 */
var express = require('express');
//var session = require('express-session');
//var path = require('path');
//var favicon = require('serve-favicon');
//var fs = require('fs');
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');

var routes = require('./route.js');

var app = express();


//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({
//    extended: false
//}));
//app.use(cookieParser());


app.use('/', routes);

var port = 2333;
var server = app.listen(port);

server.on('error', (e) => {
    console.error(e)
});
module.exports = app;

console.log('http://127.0.0.1:2333/wx/mp');