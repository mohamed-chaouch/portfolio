const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/Portfolio').then((res)=>{
mongoose.connect(process.env.MongoDB_URL).then((res)=>{
    console.log('Connected to MongoDB successfully');
}).catch((err)=>{
    console.log(err);
});

module.exports = mongoose;