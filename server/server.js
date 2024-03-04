var jsonServer = require('json-server');
var server = jsonServer.create();
var router = jsonServer.router('server/db.json');
var middlewares = jsonServer.defaults();
var db = require('./db.json');
var fs = require('fs');
server.use(middlewares);
server.use(jsonServer.bodyParser);
server.put('/user/:id', function (req, res) {

  var userId = req.params.id;
  var newPassword = req.body.password;
  var name = req.body.name;

  var userIndex = db.user.findIndex(function (user) {
    return user.id === parseInt(userId);
  });
  if (userIndex !== -1) {
    db.user[userIndex].password = newPassword;
    db.user[userIndex].name = name;

    var updatedUser = db.user[userIndex];

    fs.writeFileSync('./server/db.json', JSON.stringify(db, null, 2));
    res.status(200).json(updatedUser);
  } else {
    res.status(404).json({
      error: 'User not found'
    });
  }
});
server.post('/login', function (req, res, next) {
  // Your existing login endpoint logic
});
server.post('/register', function (req, res) {
  // Your existing register endpoint logic
});
server.use('/user', function (req, res, next) {
  // Your existing authorization middleware
});
// Use JSON Server router for other endpoints
server.use(router);
// Start the server
server.listen(3000, function () {
  console.log('JSON Server is running');
});
