const axios = require('axios');
const cors = require('cors');
const { response } = require('express');
const express = require('express');
const app = express();

const LIVEPEER_API_KEY = process.env.LIVEPEER_API_KEY;
if (!LIVEPEER_API_KEY) throw new Error('must set env variable LIVEPEER_API_KEY');
console.log('Using LIVEPEER_API_KEY = ' + LIVEPEER_API_KEY);

app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.post('/', async (req, res) => {
  console.log("Request recieved");
  const livepeerRes = await axios({
    headers: {
      'Authorization': `Bearer ${LIVEPEER_API_KEY}`,
      'Content-Type': "application/json"
    },
    method: 'post',
    url: 'https://livepeer.com/api/stream',
    data: {
      name: req.body.name,
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
    if (response.status > 299) {
      console.log('received status code from livepeer: ' + response.status);
    }
    console.log('response', response);
    return response;
  })
  .catch(function (error) {
    console.log('error calling livepeer', error);
    return error;
  });

  // res.writeHead(livepeerRes.status);
  res.json(livepeerRes.data);

});

app.listen(3004);