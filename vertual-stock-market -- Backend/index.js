const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const auth = require('./routes/auth');
const users = require('./routes/users');

console.log(process.env.mongoURI);

mongoose.connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to mongodb...'))
    .catch((err) => console.log('could not connected..', err));


app.use(cors());
app.use(express.json());
app.use('/login',auth);
app.use('/register',users);

app.get('/',(req,res)=>{
    res.send('hello world !');
});

const PORT = process.env.PORT || 5001 ;

app.listen(PORT, ()=>{
    console.log(`app is running on port ${PORT}..`);
});

// module.exports = app;