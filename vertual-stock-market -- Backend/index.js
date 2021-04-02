const express = require('express');
const app = express();

require('dotenv').config();

app.get('/',(req,res)=>{
    res.send('hello world !');
});

const PORT = process.env.PORT || 5001 ;

app.listen(PORT, ()=>{
    console.log(`app is running on port ${PORT}..`);
});

// module.exports = app;