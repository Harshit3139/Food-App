const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://goFood:111Harshit@cluster0.v9fs4x4.mongodb.net/gofoodmern?retryWrites=true&w=majority'
const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected");
        const fetched_data = mongoose.connection.db.collection("food-items");
        fetched_data.find({}).toArray(function(err,data){
            if(err) console.log(err);
            else console.log(data);
        })
    } catch (err) {
        console.error("Error:", err);
        
    }
};

module.exports = mongoDB;


