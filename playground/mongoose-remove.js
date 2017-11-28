const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result)
// })

Todo.findByIdAndRemove('5a1de6f742d6aec8ac421d1e').then((todo) => {
  console.log(todo)
})
