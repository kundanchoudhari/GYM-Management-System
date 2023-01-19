const express = require("express");
const app = express();
const path = require("path");
const fs = require('fs')
const port = 80;

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); //Set the template engine as pug
app.set('views', path.join(__dirname), 'views') // Set the views directory

// ENDPOINT
app.get('/', (req, res) => {
    const con = "This is the best content on interest so far so use it wisely."
    const params = { 'title': 'GYM Registration FORM', 'content': con }
    res.status(200).render('./views/index.pug', params);
})
app.post('/', (req, res) => {
    // console.log(req.body)
    name = req.body.name
    age = req.body.age
    gender = req.body.gender
    address = req.body.address
    more = req.body.more
    let outputToWrite = `The name of the client is ${name},${age} years old, ${gender}, residing at ${address}. More about him/her: ${more}`
    fs.writeFileSync('output.txt', outputToWrite)
    const params = { 'Message': 'Your form has been submitted successfully' }
    res.status(200).render('./views/index.pug', params);
})

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}.`)
})