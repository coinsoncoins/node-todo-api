const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

let id = "6a1674783f48626ba1934a9711";
User.findById(id).then((user) => {
  if(!user) {
    return console.log("no user found");
  }
  console.log('User ', user)
}).catch((e) => console.log(e))

// let id = "6a1db2fc3704aeb0b629706211"
//
// if(!ObjectID.isValid(id)) {
//   console.log("ID is not valid")
// }
//
// // Todo.find({
// //   _id: id
// // }).then((todos) => {
// //   console.log('Todos ', todos)
// // })
// //
// // Todo.findOne({
// //   _id: id
// // }).then((todo) => {
// //   console.log('Todo findOne ', todo)
// // })
//
// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log("no todo");
//   }
//   console.log('Todo findById ', todo)
// }).catch((e) => console.log(e))
