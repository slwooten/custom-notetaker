const express = require('express'); // express is what we just installed // 
const path = require('path'); // path allows us to join paths // 
const fs = require('fs');

const app = express(); // execute express ///
const PORT = process.env.PORT || 3001; // set constant for port number // all caps means we should never change it // 

app.use(express.static('public')); // middle ware - what happens inbetween our requests and our responses // serve a static directory called 'public' //
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// reads db.json, returns all saved notes as JSON //
app.get('/api/notes', (req, res) => {
  fs.readFile('/db/db.json', 'utf-8', (err, data) => {
    res.json(JSON.parse(data))
  })
});

app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
    };

    const noteString = JSON.stringify(newNote, null, 2);

    fs.appendFileSync('db/db.json', noteString);
    
    const response = {
      body: newNote,
    };

    res.json(response);
  }
  
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
