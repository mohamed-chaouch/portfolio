const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/Portfolio').then((res)=>{
mongoose.connect("mongodb+srv://portfolio:portfolio@cluster0.oaggve9.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0").then((res)=>{
    console.log('Connected to MongoDB successfully');
}).catch((err)=>{
    console.log(err);
});

module.exports = mongoose;