const axios = require('axios');
const cors = require('cors');
const express = require('express');
const app = express();

const LIVEPEER_API_KEY = ""

app.use(cors({
    origin: '*'
}));

app.get('/', (req, res) =>{
  console.log("Request recieved")
  console.log("Here")
  axios({
    headers: {
      'Authorization': `Bearer ${LIVEPEER_API_KEY}`,
      'Content-Type': "application/json"
    },
    method: 'post',
    url: 'https://livepeer.com/api/stream',
    data: {
      name: 'test_stream',
    }
  })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error.toJSON());
    })

  res.writeHead(200);
  res.end('Hello, World!');
});

app.listen(3004);