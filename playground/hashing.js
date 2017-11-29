const {SHA256} = require('crypto-js')
const jwt = require ('jsonwebtoken');



// let message = "i am user number 3"
// let hash = SHA256(message).toString();
//
// console.log(`message: ${message}`)
// console.log(`hash: ${hash}`)

let data = {
  id: 10
}

let token = jwt.sign(data, '123abc');
console.log(`token: ${token}`)


let decoded = jwt.verify(token, '123abc');
console.log(`decoded: `, decoded)
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + "some_secret").toString()
// }
