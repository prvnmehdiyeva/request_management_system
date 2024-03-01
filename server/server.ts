const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();
const db = require('./db.json');
const fs = require('fs');

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.put('/user/:id', (req: { params: { id: any; }; body: { password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) => {
  const userId = req.params.id;
  const newPassword = req.body.password;

  const userIndex = db.user.findIndex((user: { id: number; }) => user.id === parseInt(userId));
  if (userIndex !== -1) {
    db.user[userIndex].password = newPassword;

    const updatedUser = db.user[userIndex];

    fs.writeFileSync('./server/db.json', JSON.stringify(db, null, 2));

    res.status(200).json(updatedUser);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});



server.post('/login', (req: any, res: any, next: any) => {
  // Your existing login endpoint logic
});

server.post('/register', (req: any, res: any) => {
  // Your existing register endpoint logic
});

server.use('/user', (req: any, res: any, next: any) => {
  // Your existing authorization middleware
});

// Use JSON Server router for other endpoints
server.use(router);

// Start the server
server.listen(3000, () => {
  console.log('JSON Server is running');
});
