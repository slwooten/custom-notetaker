const express = require('express'); // express is what we just installed // 
const path = require('path'); // path allows us to join paths // 
const fs = require('fs');

const app = express(); // execute express ///
const PORT = process.env.PORT || 3001; // set constant for port number // all caps means we should never change it // 

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express.static('public')); // middle ware - what happens inbetween our requests and our responses // serve a static directory called 'public' //

// reads db.json, returns all saved notes as JSON //
app.get('/api/notes', (req, res) => {
  
  fs.readFile('./db/db.json', 'utf-8', function(err, data) {
    console.log('data!!', JSON.parse(data))
    res.json(JSON.parse(data))
  })
});

app.post('api/notes', (req, res) => {

  fs.readFile('./db/db.json', 'utf-8', function(err, data) {
    res.json(JSON.parse(data))
  })
});


app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});




app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
