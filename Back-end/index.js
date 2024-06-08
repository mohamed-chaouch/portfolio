const express = require('express');
const path = require('path');

require("./config/connect");

const app = express();

app.use(express.json());

const cors = require('cors');
app.use(cors());

app.use("./uploads" , express.static(path.join(__dirname)));

app.listen(5000, ()=>{
    console.log("Server is running on port 5000");
});