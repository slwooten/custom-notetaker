const express = require('express'); // express is what we just installed // 
const path = require('path'); // path allows us to join paths // 

const app = express(); // execute express ///
const PORT = process.env.PORT || 3001; // set constant for port number // all caps means we should never change it // 

app.use(express.static('public')); // middle ware - what happens inbetween our requests and our responses // serve a static directory called 'public' //
app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`) // makes the apps work // listens for any requests at the following path
);
