let express = require('express');
let bodyParser = require('body-parser');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');
const {ObjectID} = require('mongodb');

const port = process.env.PORT || 3000;
let app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  })
  console.log(req.body);
})

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
  console.log(req.body);
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send()
    console.log('ID was invalid');
    return;
  }
  Todo.findById(id).then((todo) => {
    if(!todo) {
      res.status(404).send();
      console.log('ID not found');
    } else {
      res.send({todo});
    }
  }, (e) => {
    res.status(400).send()
  })
  console.log(req.body);
})

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send()
    console.log('ID was invalid');
    return;
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo) {
      res.status(404).send();
      console.log('ID not found');
    } else {
      res.send({todo});
    }
  }, (e) => {
    res.status(400).send()
  })
  console.log(req.body);
})

app.listen(port, () => {
  console.log(`started on port ${port}`);
})

module.exports = {app};
