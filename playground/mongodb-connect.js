//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect("mongodb://localhost:27017/TodoApp", (error, db) => {
  if (error) {
    return console.log('Unable to connect to mongodb server', error);
  }
  console.log('Connected to Mongodb server');

  // db.collection('Todos').insertOne({
  //   text: "something to do",
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log("unable to insert todo", err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2))
  // })

  // db.collection("Users").insertOne({
  //   name: "Jake",
  //   age: 37,
  //   location: "Austin, TX"
  // }, (err, result) => {
  //   if (err) {
  //     return console.log("unable to insert user", err);
  //   }
  //   console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
  // })
  db.close();
})
