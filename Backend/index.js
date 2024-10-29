const express = require('express');
const path = require('path');
const contactRoutes = require("./routes/contactRoutes");
const projectRoutes = require("./routes/projectRoutes");

require("./config/connect");

const app = express();

app.use(express.json());

const cors = require('cors');
app.use(cors());

app.use(contactRoutes);
app.use(projectRoutes);

app.use("/" , express.static(path.join(__dirname, "./uploads")));

app.listen(5000, ()=>{
    console.log("Server is running on port 5000");
});