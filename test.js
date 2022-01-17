const axios = require('axios')
//test login
axios.post('http://localhost:3000/login',{password:'55255525',email:'turaaa@gmail.com'}).then(d=>{
    console.log(d);
})

// test login with dont't have email
// axios.post('http://localhost:9000/login',{password:'55255525',email:'turaaa@gmail.com'}).then(d=>{
    // console.log(d);
// })
// const headers = { headers: {"Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6IjU1MjU1NTI1IiwiZW1haWwiOiJ0dXJhYWFAZ21haWwuY29tIiwiaWF0IjoxNjQyMjM1NDY3LCJleHAiOjE2NDIyMzcyNjd9.eD8yh7F4X6LxHBkxoxxx4xZCspvVkE5HXS6UxJqmyMk`} }
// // // //check how working auth
// axios.get('http://localhost:3000/users',headers).then(d=>{
//     console.log(d);
// })

// axios.get('http://localhost:9000/users').then(d=>{
//     console.log(d);
// })
// exp: Math.floor(Date.now() / 1000) + (60 * 60),
// console.log(Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30));
