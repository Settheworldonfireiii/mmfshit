/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');
var app = express();
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var site = require('./site');
var post = require('./post');
var user = require('./user');
var c = require('appcache-node');
var cf = c.newCache();


module.exports = app;

// Config

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* istanbul ignore next */
if (!module.parent) {
  app.use(logger('dev'));
}

app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

// General

app.get('/', site.index);


app.all('/app.cache', function(req, res){
    res.writeHead(200, {'Content-Type': 'text/cache-manifest'});
    res.end(cf);
})

// in your request handler
if(r.url.match(/app\.cache$/)){
    s.writeHead(200, {'Content-Type': 'text/cache-manifest'});
    return s.end(cf);
}
// User

app.get('/users', user.list);
app.all('/user/:id/:op?', user.load);
app.get('/user/:id', user.view);
app.get('/user/:id/view', user.view);
app.get('/user/:id/edit', user.edit);
app.put('/user/:id/edit', user.update);
app.get('/user/:id/delete', user.delete);

// Posts

app.get('/posts', post.list);

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
