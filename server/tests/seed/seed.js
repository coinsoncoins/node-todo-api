const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');

const user1Id = new ObjectID();
const user2Id = new ObjectID();
const users = [{
  _id: user1Id,
  email: "jake@example.com",
  password: "password1",
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: user1Id, access: 'auth'}, 'abc123').toString()
  }],
}, {
  _id: user2Id,
  email: "jake2@example.com",
  password: "password2",
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: user2Id, access: 'auth'}, 'abc123').toString()
  }]
}]

const todos = [{
  _id: new ObjectID(),
  text: "first test todo",
  _creator: user1Id,
}, {
  _id: new ObjectID(),
  text: "second test todo",
  completed: true,
  completedAt: 333,
  _creator: user2Id
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
}

const populateUsers = (done) => {
  User.remove({}).then(() => {
    let user1 = new User(users[0]).save();
    let user2 = new User(users[1]).save();
    return Promise.all([user1, user2]);
  }).then(() => done());
}

module.exports = {todos, populateTodos, populateUsers, users};
