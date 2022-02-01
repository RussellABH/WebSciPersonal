const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


app.use(express.static(__dirname));
console.log(__dirname);

app.listen(port, () => {
  console.log('Listening on *:3000');
});



// When the webpage loads
// app.get('/', (req, res) => {
//   console.log("test");
//   console.log(path.join(__dirname, '/index.html'));
//   res.sendFile(path.join(__dirname, '/index.html'));
// });
// Also app.post etc

// app.get('/itws/4500', (req, res) => {
//   console.log(req);
//   res.json({
//     "course": "Web Science",
//     "number": "ITWS 4500",
//     "Description": "A course about web science"
//   })
// });
