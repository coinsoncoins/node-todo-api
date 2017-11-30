const {SHA256} = require('crypto-js')
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '123abc!';

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash)
  })
})

let hashedPassword = "$2a$10$EsIb1V.rGAT5z2wxMnNyPeCjj6E3lLzp7RA.s1LQ.TkUgNn/HHq3S"

bcrypt.compare(password, hashedPassword, (err, result) => {
  console.log(result);
})

// let message = "i am user number 3"
// let hash = SHA256(message).toString();
//
// console.log(`message: ${message}`)
// console.log(`hash: ${hash}`)

// let data = {
//   id: 10
// }
//
// let token = jwt.sign(data, '123abc');
// console.log(`token: ${token}`)
//
//
// let decoded = jwt.verify(token, '123abc');
// console.log(`decoded: `, decoded)
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + "some_secret").toString()
// }
