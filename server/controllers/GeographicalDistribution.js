const connectDB = require('../config/db');

exports.getGeographicalDistribution = async (req, res) => {
    try {
        const client = await connectDB();
        const database = client.db('RQ_Analytics');
        const customers = database.collection('shopifyCustomers');

        // Aggregation to get geographical distribution of customers
        const result = await customers.aggregate([
            {
                // Add city field from default_address for grouping
                $addFields: {
                    city: { $ifNull: ["$default_address.city", "Unknown"] }
                }
            },
            {
                // Group by city and count the number of customers
                $group: {
                    _id: "$city",
                    customerCount: { $sum: 1 }
                }
            },
            {
                // Sort by city name
                $sort: { "_id": 1 }
            }
        ]).toArray();

        res.json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
