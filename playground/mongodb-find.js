//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect("mongodb://localhost:27017/TodoApp", (error, db) => {
  if (error) {
    return console.log('Unable to connect to mongodb server', error);
  }
  console.log('Connected to Mongodb server');

  let documents = db.collection("Users").find({
    name: "Jen"
  }).toArray().then((documents) => {
    console.log("Todos")
    console.log(documents)
  }, (err) => {
    console.log("unable to fetch todos ", err)
  })

  // let documents = db.collection("Todos").find().count().then((count) => {
  //   console.log(`todos count: ${count}`)
  // }, (err) => {
  //   console.log("unable to fetch todos ", err)
  // })


  //db.close();
})
