require('./config/config');

const _ = require('lodash');
let express = require('express');
let bodyParser = require('body-parser');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');
const {ObjectID} = require('mongodb');

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

app.patch('/todos/:id', (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
})


app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  let user = new User(body);
  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
  console.log(req.body)
})



app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
})

app.post('/users/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password'])
  console.log(body)
  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    })
  }).catch((e) => {
    res.status(400).send();
  })
})

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  })
})

app.listen(process.env.PORT, () => {
  console.log(`started on port ${process.env.PORT}`);
})

module.exports = {app};
