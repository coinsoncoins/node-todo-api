//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect("mongodb://localhost:27017/TodoApp", (error, db) => {
  if (error) {
    return console.log('Unable to connect to mongodb server', error);
  }
  console.log('Connected to Mongodb server');

  // deleteMany
  // db.collection("Users").deleteMany({name: "Jake"}).then((result) => {
  //   console.log(result)
  // })

  db.collection("Users").findOneAndDelete({
    _id: new ObjectID("5a15cfbae00c9d9d8c6dab04")
  }).then((result) => {
    console.log(result)
  })

  // deleteOne

  // findOneAndDelete

  //db.close();
})
