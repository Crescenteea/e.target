const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.listen(3000, () => {
  console.log('JSON Server is running');
});

server.patch('/todos', (req, res) => {
  const { db } = router; // Assign the lowdb instance
  if (Array.isArray(req.body)) {
    console.log('toggle completed all', req.body);
    db.set('todos', req.body)
      .write();
  } else {
    console.log('toggle completed', req.body);
    db.get('todos')
      .find({ id: req.body.id })
      .set('completed', req.body.completed)
      .write();
  }
  res.status(200).send(db.get('todos'));
});

server.delete('/todos', (req, res) => {
  const { db } = router;
  if (Array.isArray(req.body)) {
    console.log('remove Completed', req.body);
    db.set('todos', req.body)
      .write();
  } else {
    console.log('remove', req.body);
    db.get('todos')
      .remove({ id: req.body.id })
      .write();
  }
  res.status(200).send(db.get('todos'));
});

server.use(router);
