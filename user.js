// Fake user database

var users = [
  { name: 'TJ', email: 'tj@vision-media.ca' },
  { name: 'Tobi', email: 'tobi@vision-media.ca' },
  { name: 'Ramzan', email: 'kadyrov_95@instagram.com'},
  { name: 'Zhenya', email: 'eugenhoza@github.com'},
  { name: 'palach', email: 'charliemanson@pelicansbay.us'}
];

exports.list = function(req, res){
  res.render('users', { title: 'Users', users: users });
};

exports.load = function(req, res, next){
	// in your request handler
if(r.url.match(/app\.cache$/)){
    s.writeHead(200, {'Content-Type': 'text/cache-manifest'});
    return s.end(cf);
}
  var id = req.params.id;
  req.user = users[id];
  if (req.user) {
    next();
  } else {
    var err = new Error('cannot find user ' + id);
    err.status = 404;
    next(err);
  }
};

exports.view = function(req, res){
  res.render('users/view', {
    title: 'Viewing user ' + req.user.name,
    user: req.user
  });
};

exports.edit = function(req, res){
  res.render('users/edit', {
    title: 'Editing user ' + req.user.name,
    user: req.user
  });
};

/*exports.delete = function(req, res){
  i = users.indexOf(req.user.name);
  users.splice(i, i+1);
  res.render('users',{ title: 'Users', users: users });
}
   */
exports.update = function(req, res){
  // Normally you would handle all kinds of
  // validation and save back to the db
  var user = req.body.user;
  req.user.name = user.name;
  req.user.email = user.email;
  res.redirect('back');
};
