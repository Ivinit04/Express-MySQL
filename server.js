const express = require('express');
const port = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api" , require('./routes'));

app.get("/" , (req, res)=>{
    res.json("welcome to express");
})

app.listen(port , ()=>{
    console.log(`server is running on ${port}`);
})