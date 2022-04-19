const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../quiz2/dist/quiz2')));
console.log(__dirname);

// MongoDB connection
const uri = "mongodb+srv://admin:67Forbes@cluster0.x0eld.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// GET
app.get('/mongo', async function (req, res) {
  await client.connect();
  const collection = client.db("TopGames").collection("MyGames");

  let data = collection.find();

  let toReturn = [];
  await data.forEach((profile) => {
    toReturn = toReturn.concat(profile);
  });

  res.status(200);
  res.send(toReturn);
  console.log("Provided all data");

  client.close();
});



app.get('/mongo/:docNum', async function (req, res) {
  await client.connect();
  const collection = client.db("TopGames").collection("MyGames");

  let docNum = Number(req.params.docNum);
  console.log("Checking key " + docNum);

  let query = { id: docNum };
  let data = await collection.findOne(query);

  res.status(200);
  res.send(data);

  client.close();
});

// POST

// Used in post(/mongo)
async function postToMongo(data) {
  await client.connect();
  const collection = client.db("TopGames").collection("MyGames");

  let numDocs = await collection.countDocuments();

  const result = await collection.insertOne({ ...data, ...{ id: numDocs + 1 } });
  console.log(`A document was inserted with the _id: ${result.insertedId} and id: ${numDocs + 1}`);

  client.close();
}

app.post('/mongo', async function (req, res1) {
  let key = 'FF32D960F37A35810B17A9ADF34C074B';
  let profile = "O2Cubed";
  console.log("Looking up " + profile);
  axios.get("http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=" + key + "&vanityurl=" + profile)
    .then((res2) => {
      let idData = res2.data.response;
      if (idData.success == 1) {
        console.log("ID is " + idData.steamid);
        axios.get("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=" + key + "&steamids=" + idData.steamid)
          .then((res3) => {
            axios.get("http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=" + key + "&steamid=" + idData.steamid + "&include_appinfo=1")
              .then((res4) => {
                postToMongo({
                  profile: profile,
                  ...res4.data.response
                });
                res1.status(200);
                res1.send();
              })
              .catch((err) => {
                console.log("Error: " + err);
              });
          })
          .catch((err) => {
            console.log("Error: " + err);
          });
      }
    })
    .catch((err) => {
      console.log("Error: " + err);
    });
});


app.post('/mongo/:docNum', (req, res) => {
  res.status(405);
  res.send("<h1>ERROR 405: NOT ALLOWED</h1> <br> Must POST on /mongo, cannot POST on a specific document.")
});


// PUT 

// --------- WILL STOP THE GRAPHS FROM WORKING ----------
app.put('/mongo', async function (req, res) {
  await client.connect();
  const collection = client.db("TopGames").collection("MyGames");

  console.log("Modifying all documents");

  let query = {};

  const updateDoc = {
    $set: {update: "This document was updated"},
  };

  const result = await collection.updateMany(query, updateDoc);
  console.log(`Updated ${result.modifiedCount} documents`);

  res.status(200);
  res.send();

  client.close();
});

app.put('/mongo/:docNum', async function (req, res) {
  await client.connect();
  const collection = client.db("TopGames").collection("MyGames");

  let docNum = Number(req.params.docNum);
  console.log("Modifying document " + docNum);

  let query = { id: docNum };

  if (await collection.findOne(query) == null) {
    console.log("Could not find that document.");
    res.status(404);
    res.send("<h1>ERROR 404: NOT FOUND</h1> <br> Could not find the requested document.");
  }

  const updateDoc = {
    $set: { update: "This document was updated" },
  };

  await collection.updateOne(query, updateDoc);

  console.log("Done");

  res.status(200);
  res.send();

  client.close();
});


// DELETE
app.delete('/mongo/:docNum', async function (req, res) {
  await client.connect();
  const collection = client.db("TopGames").collection("MyGames");

  let docNum = Number(req.params.docNum);
  console.log("Deleting id " + docNum);

  let query = { id: docNum };
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

app.delete('/mongo', async function (req, res) {
  await client.connect();
  const collection = client.db("TopGames").collection("MyGames");

  console.log("DELETING ALL DOCUMENTS");

  const result = await collection.deleteMany();

  console.log("Deleted " + result.deletedCount + " documents");

  res.status(200);
  res.send();

  client.close();
});

app.listen(port, () => {
  console.log('Listening on *:3000');
});