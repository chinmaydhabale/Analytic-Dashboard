const connectDB = require('../config/db');

exports.getRepeatCustomers = async (req, res) => {
    try {
        const client = await connectDB();
        const database = client.db('RQ_Analytics');
        const orders = database.collection('shopifyOrders');

        // Aggregation to find repeat customers
        const result = await orders.aggregate([
            {
                // Convert created_at to a date object
                $addFields: {
                    created_at_date: { $toDate: "$created_at" }
                }
            },
            {
                // Group by customer ID to count total orders
                $group: {
                    _id: "$customer.id",
                    totalOrders: { $sum: 1 },
                    created_at_date: { $first: "$created_at_date" } // Include created_at_date to use for date extraction
                }
            },
            {
                // Filter to include only repeat customers
                $match: {
                    totalOrders: { $gt: 1 }
                }
            },
            {
                // Add year, month, day, and quarter fields from created_at_date
                $addFields: {
                    year: { $year: "$created_at_date" },
                    month: { $month: "$created_at_date" },
                    day: { $dayOfMonth: "$created_at_date" },
                    quarter: { $ceil: { $divide: [{ $month: "$created_at_date" }, 3] } }
                }
            },
            {
                // Facet to group by different time intervals
                $facet: {
                    daily: [
                        {
                            $group: {
                                _id: {
                                    year: "$year",
                                    month: "$month",
                                    day: "$day"
                                },
                                repeatCustomers: { $sum: 1 }
                            }
                        },
                        { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
                    ],
                    monthly: [
                        {
                            $group: {
                                _id: {
                                    year: "$year",
                                    month: "$month"
                                },
                                repeatCustomers: { $sum: 1 }
                            }
                        },
                        { $sort: { "_id.year": 1, "_id.month": 1 } }
                    ],
                    quarterly: [
                        {
                            $group: {
                                _id: {
                                    year: "$year",
                                    quarter: "$quarter"
                                },
                                repeatCustomers: { $sum: 1 }
                            }
                        },
                        { $sort: { "_id.year": 1, "_id.quarter": 1 } }
                    ],
                    yearly: [
                        {
                            $group: {
                                _id: { year: "$year" },
                                repeatCustomers: { $sum: 1 }
                            }
                        },
                        { $sort: { "_id.year": 1 } }
                    ]
                }
            }
        ]).toArray();

        res.json(result[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
