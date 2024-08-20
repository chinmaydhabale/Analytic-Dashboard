const { MongoClient } = require('mongodb');


let client;

const connectDB = async () => {
    if (!client) {
        client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log('MongoDB connected...');
    }
    return client;
};

module.exports = connectDB;
