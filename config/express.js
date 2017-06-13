'use strict';

var config = require("./config"),
    http = require('http'),
    express = require('express'),
    path = require('path'),
    fs = require('fs'),
    cons = require('consolidate'),
    swig = require('swig'),
    ejs = require('ejs-locals');

module.exports = function(){
    var app = express();
    app.use(express.static(path.resolve(__dirname, 'www')));
    app.engine('.html',cons.swig);
    app.set('view engine', 'html');
    app.set('views',__dirname + '/../views');
    app.use(express.static(__dirname + '/../views/js'));
    app.use(express.static(__dirname + '/../views/css'));
    config.getGlobbedFiles(__dirname + '/../routes/**/*.js').forEach(function(routePath) {
        require(path.resolve(routePath))(app);
    });
    app.use(function(err, req, res, next) {
        if (!err) return next();
        console.error(err.stack);
        res.status(500).render('500', {
            error: err.stack
        });
    });
    app.use(function(req, res) {
        res.status(404).render('404', {
            url: req.originalUrl,
            error: 'Not Found'
        });
    });  
    return app;
}
