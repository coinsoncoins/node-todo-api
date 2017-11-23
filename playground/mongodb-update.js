//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect("mongodb://localhost:27017/TodoApp", (error, db) => {
  if (error) {
    return console.log('Unable to connect to mongodb server', error);
  }
  console.log('Connected to Mongodb server');



  // db.collection("Todos").findOneAndUpdate({
  //   _id: new ObjectID("5a1641a442d6aec8ac418eb8")
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result)
  // })

  db.collection("Users").findOneAndUpdate({
    name: "Jen"
  }, {
    $set: {name: "Betty"},
    $inc: { age: 1 }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result)
  })


  //db.close();
})
