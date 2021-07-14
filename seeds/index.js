const cities = require('./cities');
const mongoose = require('mongoose');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error"));
db.once("open",()=>{
    console.log("Database Connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async()=>{
    await Campground.deleteMany({});
    for (let i=0;i<50;i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20)+10;
        const camp = new Campground({
            author: '60ba3c34637a580104ab19c7',
            location:`${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed architecto laborum quas voluptatem voluptates quo itaque consequuntur velit totam corporis provident, neque cum sapiente minus, tempore perferendis repellat accusamus? Aut',
            price             
        })
        await camp.save();
    }
}


seedDB().then(()=>{
    mongoose.connection.close()
})