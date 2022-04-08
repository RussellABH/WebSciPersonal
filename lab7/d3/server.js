const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');

/* This is where the Angular files live after they are built.  */
app.use(express.static(path.join(__dirname, './d3/dist/d3')));

const uri = "mongodb+srv://admin:67Forbes@cluster0.x0eld.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// Get all the games from my DB
app.get('/games/', async function (req, res) {
  await client.connect();
  const collection = client.db("SteamProfile").collection("GameData");

  console.log("Getting all games data");

  let data = await collection.find().toArray();

  res.send(data);

  client.close();
});

app.listen(port, () => {
  console.log('Listening on *:3000');
});