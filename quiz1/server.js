const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');


app.use(express.static(__dirname));
console.log(__dirname);

app.listen(port, () => {
  console.log('Listening on *:3000');
});

let key = '4e76e1870e14a23b53389ef96b8c4c81';

app.post('/temperature/:zip', (req, res1) => {
  let url = "http://api.openweathermap.org/data/2.5/weather?zip=" + req.params.zip + ",us&appid=" + key;

  console.log("Looking up " + req.params.zip);

  axios.get(url)
  .then ((res2) => {
    res1.send(res2.data);
  })
  .catch((err) => {
    console.log("Error: " + err);
  });
});

app.get('/wind', (req, res1) => {
  let url = "http://api.openweathermap.org/data/2.5/weather?zip=12180,us&appid=" + key;

  console.log("Looking up wind for Troy");

  axios.get(url)
    .then((res2) => {
      res1.send(res2.data);
    })
    .catch((err) => {
      console.log("Error: " + err);
    });
});