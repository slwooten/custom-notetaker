const express = require('express'); // express is what we just installed // 
const path = require('path'); // path allows us to join paths // 
const fs = require('fs');
const { randomUUID } = require('crypto');

const app = express(); // execute express ///
const PORT = process.env.PORT || 3001; // set constant for port number // all caps means we should never change it // 

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public')); // middle ware - what happens inbetween our requests and our responses // serve a static directory called 'public' //
app.get('/api/notes', function (req, res) {
  fs.readFile('./db/db.json', 'utf-8', function (err, data) {
    res.json(JSON.parse(data))
  })
})

app.post('/api/notes', function (req, res) {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: randomUUID()
    };

    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedNotes = JSON.parse(data);

        parsedNotes.push(newNote);

        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes, null, 2),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.log('Successfully updated notes')
        );
      }
    })
  }
})

app.get('/notes', function (req, res) {
  res.sendFile(path.join(__dirname, './public', 'notes.html'));
})

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './public', 'index.html'));
})




app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
