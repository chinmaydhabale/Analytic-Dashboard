const connectDB = require('../config/db');

exports.getTotalSalesOverTime = async (req, res) => {
    try {
        const client = await connectDB();
        const database = client.db('RQ_Analytics');
        const orders = database.collection('shopifyOrders');

        // Aggregating sales data by different time intervals
        const result = await orders.aggregate([
            {
                // Convert the created_at field to a date object
                $addFields: {
                    created_at_date: { $toDate: "$created_at" }
                }
            },
            {
                $facet: {
                    daily: [
                        {
                            $group: {
                                _id: {
                                    year: { $year: "$created_at_date" },
                                    month: { $month: "$created_at_date" },
                                    day: { $dayOfMonth: "$created_at_date" }
                                },
                                totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
                            }
                        },
                        { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
                    ],
                    monthly: [
                        {
                            $group: {
                                _id: {
                                    year: { $year: "$created_at_date" },
                                    month: { $month: "$created_at_date" }
                                },
                                totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
                            }
                        },
                        { $sort: { "_id.year": 1, "_id.month": 1 } }
                    ],
                    quarterly: [
                        {
                            $group: {
                                _id: {
                                    year: { $year: "$created_at_date" },
                                    quarter: {
                                        $ceil: {
                                            $divide: [{ $month: "$created_at_date" }, 3]
                                        }
                                    }
                                },
                                totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
                            }
                        },
                        { $sort: { "_id.year": 1, "_id.quarter": 1 } }
                    ],
                    yearly: [
                        {
                            $group: {
                                _id: { year: { $year: "$created_at_date" } },
                                totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
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
