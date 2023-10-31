const express = require('express')
const app = express()
const urlprefix = '/api'
const mongoose = require('mongoose')
const fs = require('fs');
const cert = fs.readFileSync('keys/certificate.pem');
const options = {
    server: { sslCA: cert}};
const connstring = 'mongodb+srv://dbKwakho:ekcePcw4r88qLMVz@cluster0.aowc4ym.mongodb.net/issueDatabase?retryWrites=true&w=majority';

const issueRoutes = require("./routes/issue");
const userRoutes = require("./routes/user");

const cors = require('cors')

mongoose.connect(connstring)
.then(()=>
{
    console.log('Connected :-)')
})
.catch(()=>
{
    console.log('Not connected :-(')
},options);

app.use(express.json())

app.use((reg,res,next)=>
{
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
 res.setHeader('Access-Control-Allow-Methods', '*');
 next();
});

app.get(urlprefix+'/', (req, res) => {
    res.send('Hello World')
})

app.use(urlprefix+'/issues',issueRoutes)
app.use(urlprefix+'/users',userRoutes)

const corsOpt = {
    origin:'*',
    optionsSuccessStatus:301
}

app.use(cors(corsOpt))

module.exports = app;
