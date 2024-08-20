const connectDB = require('../config/db');

exports.getSalesGrowthRate = async (req, res) => {
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
            },
            {
                // Calculate growth rates
                $project: {
                    monthly: {
                        $map: {
                            input: { $slice: ["$monthly", 1, { $size: "$monthly" }] },
                            as: "current",
                            in: {
                                $let: {
                                    vars: {
                                        prev: { $arrayElemAt: ["$monthly", { $subtract: [{ $indexOfArray: ["$monthly", "$$current"] }, 1] }] }
                                    },
                                    in: {
                                        year: "$$current._id.year",
                                        month: "$$current._id.month",
                                        growthRate: {
                                            $cond: [
                                                { $ne: ["$$prev.totalSales", 0] },
                                                { $multiply: [{ $divide: [{ $subtract: ["$$current.totalSales", "$$prev.totalSales"] }, "$$prev.totalSales"] }, 100] },
                                                0
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    },
                    quarterly: {
                        $map: {
                            input: { $slice: ["$quarterly", 1, { $size: "$quarterly" }] },
                            as: "current",
                            in: {
                                $let: {
                                    vars: {
                                        prev: { $arrayElemAt: ["$quarterly", { $subtract: [{ $indexOfArray: ["$quarterly", "$$current"] }, 1] }] }
                                    },
                                    in: {
                                        year: "$$current._id.year",
                                        quarter: "$$current._id.quarter",
                                        growthRate: {
                                            $cond: [
                                                { $ne: ["$$prev.totalSales", 0] },
                                                { $multiply: [{ $divide: [{ $subtract: ["$$current.totalSales", "$$prev.totalSales"] }, "$$prev.totalSales"] }, 100] },
                                                0
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    },
                    yearly: {
                        $map: {
                            input: { $slice: ["$yearly", 1, { $size: "$yearly" }] },
                            as: "current",
                            in: {
                                $let: {
                                    vars: {
                                        prev: { $arrayElemAt: ["$yearly", { $subtract: [{ $indexOfArray: ["$yearly", "$$current"] }, 1] }] }
                                    },
                                    in: {
                                        year: "$$current._id.year",
                                        growthRate: {
                                            $cond: [
                                                { $ne: ["$$prev.totalSales", 0] },
                                                { $multiply: [{ $divide: [{ $subtract: ["$$current.totalSales", "$$prev.totalSales"] }, "$$prev.totalSales"] }, 100] },
                                                0
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        ]).toArray();

        res.json(result[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
