const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://goFood:111Harshit@cluster0.v9fs4x4.mongodb.net/gofoodmern?retryWrites=true&w=majority'


const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database Connected");

        const fetched_data = await mongoose.connection.db.collection("food_items");
        const data = await fetched_data.find({}).toArray();

        const foodCategory = await mongoose.connection.db.collection("foodCategory");
        const catData = await foodCategory.find({}).toArray();
            global.food_items = {
            items: data,
            category: catData
        };
        global.foodCategory = catData; // this should be added for  different Cards
} catch (err) {
        console.log("Error:");
    }
};

module.exports = mongoDB;


