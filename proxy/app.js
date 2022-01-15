const axios = require('axios');
const cors = require('cors');
const express = require('express');
const app = express();

const LIVEPEER_API_KEY = process.env.LIVEPEER_API_KEY;
if (!LIVEPEER_API_KEY) throw new Error('must set env variable LIVEPEER_API_KEY');
console.log('Using LIVEPEER_API_KEY = ' + LIVEPEER_API_KEY);

app.use(cors({
    origin: '*'
}));

app.get('/', (req, res) =>{
  console.log("Request recieved")
  axios({
    headers: {
      'Authorization': `Bearer ${LIVEPEER_API_KEY}`,
      'Content-Type': "application/json"
    },
    method: 'post',
    url: 'https://livepeer.com/api/stream',
    data: {
      name: 'test_stream',
      profiles: [
        {
          "name": "720p",
          "bitrate": 2000000,
          "fps": 30,
          "width": 1280,
          "height": 720
        },
        {
          "name": "480p",
          "bitrate": 1000000,
          "fps": 30,
          "width": 854,
          "height": 480
        },
        {
          "name": "360p",
          "bitrate": 500000,
          "fps": 30,
          "width": 640,
          "height": 360
        }
      ]
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