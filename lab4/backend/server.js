const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
const path = require('path');


// MongoDB stuff
// note that I have the frontend and backend in two different node projects. Why not just have it all in one and 
//  put frontend in the main part of it


// good docs - https://docs.mongodb.com/drivers/node/current/usage-examples/findOne/
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://admin:67Forbes@cluster0.x0eld.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.get('/mongo', async function (req, res) {
  await client.connect();

  const collection = client.db("inClass").collection("myCollection");

  let query = { name: "Boston" };
  let data = await collection.findOne(query);

  res.send(data);

  client.close();
});

// End of MongoDB stuff

app.use(express.static(path.join(__dirname, '../frontend/lab4/dist/lab4')));

console.log(__dirname);

app.listen(port, () => {
  console.log('Listening on *:3000');
});

app.get('/api', function (req, res) {
  res.json({ 'test': 'api' });
});

app.get('/profile/:username', (req, res1) => {
  let key = 'FF32D960F37A35810B17A9ADF34C074B';
  console.log("Looking up " + req.params.username);
  axios.get("http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=" + key + "&vanityurl=" + req.params.username)
  .then ((res2) => {
    let idData = res2.data.response;
    let toRespond = {};
    if (idData.success == 1) {
      toRespond.exists = 1;
      console.log("ID is " + idData.steamid);
      axios.get("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=" + key + "&steamids=" + idData.steamid)
      .then((res3) => {
        axios.get("http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=" + key + "&steamid=" + idData.steamid)
        .then((res4) => {
          res1.send({
            ...toRespond,
            ...res3.data.response.players[0],
            ...res4.data.response
          });
        })
        .catch((err) => {
          console.log("Error: " + err);
        });
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
    } else {
      toRespond.exists = 0;
      res1.send(toRespond);
      console.log("Could not find username " + req.params.username);
    }
  })
  .catch((err) => {
    console.log("Error: " + err);
  });
});

app.post("/profile", (req, res) => {
  console.log("Totally just created a profile");
});

app.put("/profile/:username", (req, res) => {
  console.log("Totally just changed profile " + req.params.username);
})

app.delete("/profile/:username", (req, res) => {
  console.log("Totally just deleted user " + req.params.username);
})
