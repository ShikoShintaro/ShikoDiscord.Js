const express = require("express");
const app = express();
const port = 3000;


app.get('/', (req,res) => {
    res.send("IM ALIVE")
})

app.listen(port, () => {
    console.log('Now Live')
})