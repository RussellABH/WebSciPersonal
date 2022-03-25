const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');


app.use(express.json());

// MongoDB connection

const uri = "mongodb+srv://admin:67Forbes@cluster0.x0eld.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// GET
app.get('/db/:docNum', async function (req, res) {
  await client.connect();
  const collection = client.db("SteamProfile").collection("Profiles");

  let docNum = Number(req.params.docNum);
  console.log("Checking key " + docNum);

  let query = { key: docNum};
  let data = await collection.findOne(query);

  res.send(data);

  client.close();
});

app.get('/db', async function (req, res) {
  await client.connect();
  const collection = client.db("SteamProfile").collection("Profiles");

  let query = { exists: 1};
  let data = await collection.find(query);

  let toReturn = [];
  await data.forEach((profile) => {
    toReturn = toReturn.concat(profile);
  });

  res.send(toReturn);

  client.close();
});

// POST
app.post('/db/:docNum', (req, res) => {
  res.status(405);
  res.send("Must POST on /db, cannot POST on a specific document.")
});

app.post('/db', async function (req, res) {
  await client.connect();
  const collection = client.db("SteamProfile").collection("Profiles");

  let numDocs = await collection.countDocuments();

  const result = await collection.insertOne({...req.body, ...{key: numDocs + 1}});
  console.log(`A document was inserted with the _id: ${result.insertedId} and key: ${numDocs + 1}`);

  res.status(200);
  res.send();
  client.close();
});

// PUT
app.put('/db/:docNum', async function (req, res) {
  await client.connect();
  const collection = client.db("SteamProfile").collection("Profiles");

  let docNum = Number(req.params.docNum);
  console.log("Modifying document " + docNum);

  let query = { key: docNum};

  if (await collection.findOne(query) == null) {
    console.log("Could not find that document.");
    res.status(404);
    res.send("Document not found");
  }

  const updateDoc = {
    $set: req.body,
  };

  await collection.updateOne(query, updateDoc);

  console.log("Done");

  res.status(200);
  res.send();

  client.close();
});

app.put('/db', async function (req, res) {
  await client.connect();
  const collection = client.db("SteamProfile").collection("Profiles");

  console.log("Modifying all documents");

  let query = { exists: 1};

  const updateDoc = {
    $set: req.body,
  };

  const result = await collection.updateMany(query, updateDoc);
  console.log(`Updated ${result.modifiedCount} documents`);

  res.status(200);
  res.send();

  client.close();
});


// DELETE
app.delete('/db/:docNum', async function (req, res) {
  await client.connect();
  const collection = client.db("SteamProfile").collection("Profiles");

  let docNum = Number(req.params.docNum);
  console.log("Deleting key " + docNum);

  let query = { key: docNum};
  const result = await collection.deleteOne(query);

  if (result.deletedCount === 1) {
    console.log("Successfully deleted one document.");
  } else {
    console.log("No documents matched the query. Deleted 0 documents.");
  }

  res.status(200);
  res.send();

  client.close();
});

app.delete('/db', async function (req, res) {
  await client.connect();
  const collection = client.db("SteamProfile").collection("Profiles");

  console.log("DELETING ALL DOCUMENTS");

  const result = await collection.deleteMany();

  console.log("Deleted " + result.deletedCount + " documents");

  res.status(200);
  res.send();

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
